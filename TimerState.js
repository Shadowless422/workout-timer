class TimerState {
    constructor(timeLeft = 60,
                round = 1,
                cycle = 1,
                phase = 'Prepare',
                running = false){
        this.timeLeft = timeLeft;
        this.round = round;
        this.cycle = cycle;
        this.phase = phase;
        this.isRunning = running;
    }

    reset(timerSettings) {
        this.timeLeft = timerSettings.prepareTime;
        this.round = 1;
        this.cycle = 1;
        this.phase = 'Prepare';
        this.isRunning = false;
    }
}

module.exports = TimerState;