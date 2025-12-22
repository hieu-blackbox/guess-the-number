class GuessTheNumberGame {
    constructor() {
        this.minNum = 1;
        this.maxNum = 100;
        this.numberToGuess = null;
        this.tries = 0;
        this.guessHistory = [];
        this.gameOver = false;

        this.initializeElements();
        this.attachEventListeners();
        this.startNewGame();
    }

    initializeElements() {
        this.guessInput = document.getElementById('guessInput');
        this.guessButton = document.getElementById('guessButton');
        this.resetButton = document.getElementById('resetButton');
        this.feedback = document.getElementById('feedback');
        this.triesDisplay = document.getElementById('tries');
        this.rangeDisplay = document.getElementById('range');
        this.historyList = document.getElementById('historyList');
    }

    attachEventListeners() {
        this.guessButton.addEventListener('click', () => this.makeGuess());
        this.resetButton.addEventListener('click', () => this.startNewGame());
        
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess();
            }
        });

        this.guessInput.addEventListener('input', () => {
            const value = parseInt(this.guessInput.value);
            if (value < this.minNum) {
                this.guessInput.value = this.minNum;
            } else if (value > this.maxNum) {
                this.guessInput.value = this.maxNum;
            }
        });
    }

    startNewGame() {
        this.numberToGuess = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
        this.tries = 0;
        this.guessHistory = [];
        this.gameOver = false;

        this.updateDisplay();
        this.showFeedback('Make your first guess!', 'neutral');
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.guessButton.disabled = false;
        this.guessInput.focus();
        this.updateHistory();
    }

    makeGuess() {
        if (this.gameOver) {
            return;
        }

        const guess = parseInt(this.guessInput.value);

        if (isNaN(guess)) {
            this.showFeedback('Please enter a valid number!', 'neutral');
            return;
        }

        if (guess < this.minNum || guess > this.maxNum) {
            this.showFeedback(`Please enter a number between ${this.minNum} and ${this.maxNum}!`, 'neutral');
            return;
        }

        this.tries++;
        this.updateDisplay();

        if (guess < this.numberToGuess) {
            this.guessHistory.push({ value: guess, result: 'low' });
            this.showFeedback('Too low! Try a higher number.', 'too-low');
            this.updateHistory();
        } else if (guess > this.numberToGuess) {
            this.guessHistory.push({ value: guess, result: 'high' });
            this.showFeedback('Too high! Try a lower number.', 'too-high');
            this.updateHistory();
        } else {
            this.guessHistory.push({ value: guess, result: 'correct' });
            this.showFeedback(
                `🎉 Congratulations! You've guessed the number ${this.numberToGuess} in ${this.tries} ${this.tries === 1 ? 'try' : 'tries'}!`,
                'success'
            );
            this.updateHistory();
            this.endGame();
        }

        this.guessInput.value = '';
        this.guessInput.focus();
    }

    showFeedback(message, type) {
        this.feedback.className = 'feedback ' + type;
        this.feedback.innerHTML = `<p>${message}</p>`;
    }

    updateDisplay() {
        this.triesDisplay.textContent = this.tries;
        this.rangeDisplay.textContent = `${this.minNum}-${this.maxNum}`;
    }

    updateHistory() {
        if (this.guessHistory.length === 0) {
            this.historyList.innerHTML = '<p class="empty-state">No guesses yet</p>';
            return;
        }

        this.historyList.innerHTML = this.guessHistory
            .map(guess => {
                const resultClass = guess.result;
                const arrow = guess.result === 'low' ? '↑' : guess.result === 'high' ? '↓' : '✓';
                return `<span class="guess-badge ${resultClass}">${guess.value} ${arrow}</span>`;
            })
            .join('');
    }

    endGame() {
        this.gameOver = true;
        this.guessInput.disabled = true;
        this.guessButton.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});
