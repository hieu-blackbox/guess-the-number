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
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.guessButton.disabled = false;
        this.guessInput.focus();

        this.showFeedback('Make your first guess!', 'neutral');
        this.updateHistory();
    }

    makeGuess() {
        if (this.gameWon) {
            return;
        }

        const guess = parseInt(this.guessInput.value);

        if (!this.validateGuess(guess)) {
            return;
        }

        this.tries++;
        this.guessHistory.push(guess);

        if (guess < this.numberToGuess) {
            this.showFeedback(`Too low! Try a higher number.`, 'too-low');
            this.addHistoryItem(guess, 'low');
        } else if (guess > this.numberToGuess) {
            this.showFeedback(`Too high! Try a lower number.`, 'too-high');
            this.addHistoryItem(guess, 'high');
        } else {
            this.gameWon = true;
            const message = this.tries === 1 
                ? `🎉 Incredible! You guessed it on the first try!`
                : `🎉 Congratulations! You found the number ${this.numberToGuess} in ${this.tries} ${this.tries === 1 ? 'try' : 'tries'}!`;
            this.showFeedback(message, 'success');
            this.addHistoryItem(guess, 'correct');
            this.guessInput.disabled = true;
            this.guessButton.disabled = true;
        }

        this.updateDisplay();
        this.guessInput.value = '';
        this.guessInput.focus();
    }

    validateGuess(guess) {
        if (isNaN(guess)) {
            this.showFeedback('Please enter a valid number!', 'too-high');
            return false;
        }

        if (guess < this.minNum || guess > this.maxNum) {
            this.showFeedback(`Please enter a number between ${this.minNum} and ${this.maxNum}!`, 'too-high');
            return false;
        }

        if (this.guessHistory.includes(guess)) {
            this.showFeedback(`You already guessed ${guess}! Try a different number.`, 'too-high');
            return false;
        }

        return true;
    }

    showFeedback(message, type) {
        this.feedback.className = `feedback ${type}`;
        this.feedback.innerHTML = `<p>${message}</p>`;
    }

    updateDisplay() {
        this.triesDisplay.textContent = this.tries;
        this.rangeDisplay.textContent = `${this.minNum}-${this.maxNum}`;
    }

    addHistoryItem(guess, type) {
        const item = document.createElement('div');
        item.className = `history-item ${type}`;
        item.textContent = guess;
        
        if (this.historyList.querySelector('.empty-state')) {
            this.historyList.innerHTML = '';
        }
        
        this.historyList.appendChild(item);
    }

    updateHistory() {
        if (this.guessHistory.length === 0) {
            this.historyList.innerHTML = '<p class="empty-state">No guesses yet</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});
