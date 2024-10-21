const express = require('express');
const socketio = require('socket.io');
const { readFile } = require('fs').promises;
const TimerSettings = require('./TimerSettings');
const TimerState = require('./TimerState');

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(
    `Timer page available on http://localhost:${port}/\nSettings page available on http://localhost:${port}/settings`));
const io = socketio(server);

let timerSettings = new TimerSettings();
let timerState = new TimerState();
timerState.timeLeft = timerSettings.prepareTime;

// Send the timer page
app.get('/', async (req, res) => {
    res.send(await readFile('./timer.html', 'utf8'));
});

// Send the settings page
app.get('/settings', async (req, res) => {
    res.send(await readFile('./settings.html', 'utf8'));
});

function updateTimer() {
    if (!timerState.isRunning)
        return;
    if (timerState.timeLeft > 0) {
        timerState.timeLeft--;
        return;
    }

    // The time left is 0
    const isLastRound = timerState.round === timerSettings.rounds;
    const isLastCycle = timerState.cycle === timerSettings.cycles;

    switch (timerState.phase) {
        case 'Prepare':
            timerState.phase = 'Work';
            timerState.timeLeft = timerSettings.workoutTime;
            timerState.round++;
            timerState.cycle++;
            break;
        case 'Rest':
            if (isLastRound && isLastCycle) {
                timerState.reset(timerSettings);
                break;
            }
            if (isLastRound) {
                timerState.phase = 'Rest Between Cycles';
                timerState.timeLeft = timerSettings.restBetweenCycles;
                timerState.round = 1;
                timerState.cycle++;
            } else { //isLastCycle either true or not, doesn't matter
                timerState.phase = 'Work';
                timerState.timeLeft = timerSettings.workoutTime;
                timerState.round++;
            }
            break;
        case 'Rest Between Cycles':
            timerState.phase = 'Work';
            timerState.timeLeft = timerSettings.prepareTime;
            break;
        default:
            timerState.phase = 'Rest';
            timerState.timeLeft = timerSettings.restTime;
            break;
    }
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
    socket.emit('settings-update', timerSettings);

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
        if (!timerSettings.validate(settings))
            return;

        timerSettings.update(settings);
        timerState.reset(timerSettings);

        io.emit('settings-update', timerSettings);
        io.emit('timer-update', timerState, timerSettings);  // Broadcast the updated state
    })

});