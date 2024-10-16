class TimerState {
    constructor(timeLeft = 60,
                round = 1,
                cycle = 1,
                phase = 'Work',
                running = false){
        this.timeLeft = timeLeft;
        this.round = round;
        this.cycle = cycle;
        this.phase = phase;
        this.isRunning = running;
    }

    reset(timerSettings) {
        this.timeLeft = timerSettings.workoutTime;
        this.round = 1;
        this.cycle = 1;
        this.phase = 'work';
        this.isRunning = false;
    }
}

module.exports = TimerState;