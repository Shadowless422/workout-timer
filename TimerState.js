class TimerState {
    constructor(timeLeft = 60,
                round = 0,
                cycle = 0,
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
        this.round = 0;
        this.cycle = 0;
        this.phase = 'Prepare';
        this.isRunning = false;
    }
}

module.exports = TimerState;