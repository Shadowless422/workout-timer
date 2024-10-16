const express = require('express');
const socketio = require('socket.io');
const { readFile } = require('fs').promises;
const TimerSettings = require('./TimerSettings');
const TimerState = require('./TimerState');

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(
    `Timer page available on http://localhost:${port}/timer\nSettings page available on http://localhost:${port}/settings`));
const io = socketio(server);

let timerState = new TimerState();

// Create a new instance of TimerSetting
let timerSettings = new TimerSettings();

// Send the timer page
app.get('/timer', async (req, res) => {
    res.send(await readFile('./timer.html', 'utf8'));
});

// Send the settings page
app.get('/settings', async (req, res) => {
    res.send(await readFile('./settings.html', 'utf8'));
});

// Timer update function
// To add: go from working to rest, update rounds and cycles
function updateTimer() {
    /*
    * Timer logic:
    * - when start from beginning: status running, phase working, timeleft = workout time
    * - when running:   if phase work, 0 < timeleft < workoutTime, if phase rest 0 < timeleft < restTime
    *                   if timeLeft > 0: timeLeft--
    *                   else: phase swap -> if from rest to work check rounds and cycles -> timeLeft = new phase time
    * - when paused:    nothing changes
    * - when stopped:   status stopped, phase working, timeleft = workout time (decide if reset has to be done here)
    *
    * // Old code
    if (timerState.status === 'running') {
        timerState.timeLeft--;

        if (timerState.timeLeft <= 0) {
            timerState.status = 'stopped';  // Reset logic
        }

        io.emit('timer-update', timerState, timerSettings);  // Broadcast the updated state
    }
    */
    if (!timerState.isRunning)
        return;

    if (timerState.timeLeft > 0) {
        timerState.timeLeft--;
        return;
    }

    // The time left is 0
    const isLastRound = timerState.round === timerSettings.rounds;
    const isLastCycle = timerState.cycle === timerSettings.cycles;

    if (timerState.phase === 'Rest') {
        if (isLastRound && isLastCycle) {
            // TODO: add some feedback sound here
            timerState.reset(timerSettings);
            return;
        }

        if (isLastRound) {
            timerState.cycle++;
            timerState.round = 1;
        } else {
            timerState.round++;
        }

        timerState.phase = 'Work';
        timerState.timeLeft = timerSettings.workoutTime;
        return;
    }

    // TODO: add some feedback sound here
    timerState.phase = 'Rest';
    timerState.timeLeft = timerSettings.restTime; // Assuming restTime is the correct value here
}

// Update the timer every second
setInterval(() => {
    updateTimer();
    io.emit('timer-update', timerState, timerSettings);
}, 1000);

// Handle socket connections
io.on('connection', (socket) => {
    // Send the current state to new clients
    socket.emit('timer-update', timerState, timerSettings);

    // Handle timer commands
    socket.on('timer-command', (command) => {
        if (command === 'start') {
            timerState.isRunning = true;
        } else if (command === 'pause') {
            timerState.isRunning = false;
        } else if (command === 'stop') {
            timerState.isRunning = false;

            // Reset the Workout from the beginning
            timerState.reset(timerSettings);
        }

        io.emit('timer-update', timerState, timerSettings);  // Broadcast the updated state
    });

    // Handle timer settings update
    socket.on('new-settings', (settings) => {
        timerSettings.update(settings);
        timerState.reset(timerSettings);

        io.emit('settings-update', timerSettings);
        io.emit('timer-update', timerState, timerSettings);  // Broadcast the updated state
    })

});