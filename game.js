class GuessTheNumberGame {
    constructor() {
        this.minNum = 1;
        this.maxNum = 100;
        this.numberToGuess = null;
        this.tries = 0;
        this.guessHistory = [];
        this.gameWon = false;

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
            if (this.gameWon) {
                this.startNewGame();
            }
        });
    }

    startNewGame() {
        this.numberToGuess = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
        this.tries = 0;
        this.guessHistory = [];
        this.gameWon = false;

        this.updateDisplay();
        this.showFeedback('Make your first guess!', 'neutral');
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.guessButton.disabled = false;
        this.guessInput.focus();
        this.updateHistory();
    }

    makeGuess() {
        if (this.gameWon) {
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

        let feedbackType = '';
        if (guess < this.numberToGuess) {
            this.showFeedback('📉 Too low! Try a higher number.', 'too-low');
            feedbackType = 'low';
        } else if (guess > this.numberToGuess) {
            this.showFeedback('📈 Too high! Try a lower number.', 'too-high');
            feedbackType = 'high';
        } else {
            this.gameWon = true;
            const message = this.tries === 1 
                ? `🎉 Incredible! You guessed it on the first try!`
                : `🎉 Congratulations! You found the number ${this.numberToGuess} in ${this.tries} ${this.tries === 1 ? 'try' : 'tries'}!`;
            this.showFeedback(message, 'success');
            feedbackType = 'correct';
            this.guessInput.disabled = true;
            this.guessButton.disabled = true;
        }

        this.guessHistory.push({ guess, type: feedbackType });
        this.updateHistory();
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
            .map(item => `<span class="history-item ${item.type}">${item.guess}</span>`)
            .join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});
