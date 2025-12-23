class GuessTheNumberGame {
    constructor() {
        this.minNum = 1;
        this.maxNum = 100;
        this.numberToGuess = null;
        this.tries = 0;
        this.guessHistory = [];
        this.bestScore = localStorage.getItem('bestScore') || null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.startNewGame();
        this.updateBestScore();
    }

    initializeElements() {
        this.guessInput = document.getElementById('guess-input');
        this.submitBtn = document.getElementById('submit-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.feedback = document.getElementById('feedback');
        this.triesDisplay = document.getElementById('tries');
        this.bestScoreDisplay = document.getElementById('best-score');
        this.minRangeDisplay = document.getElementById('min-range');
        this.maxRangeDisplay = document.getElementById('max-range');
        this.guessHistoryDisplay = document.getElementById('guess-history');
        this.difficultySelect = document.getElementById('difficulty');
    }

    attachEventListeners() {
        this.submitBtn.addEventListener('click', () => this.handleGuess());
        this.restartBtn.addEventListener('click', () => this.startNewGame());
        this.difficultySelect.addEventListener('change', () => this.changeDifficulty());
        
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGuess();
            }
        });

        // Prevent invalid input
        this.guessInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value < this.minNum) {
                e.target.value = this.minNum;
            } else if (value > this.maxNum) {
                e.target.value = this.maxNum;
            }
        });
    }

    changeDifficulty() {
        const difficulty = this.difficultySelect.value;
        
        switch(difficulty) {
            case 'easy':
                this.minNum = 1;
                this.maxNum = 50;
                break;
            case 'medium':
                this.minNum = 1;
                this.maxNum = 100;
                break;
            case 'hard':
                this.minNum = 1;
                this.maxNum = 500;
                break;
            case 'expert':
                this.minNum = 1;
                this.maxNum = 1000;
                break;
        }

        this.guessInput.min = this.minNum;
        this.guessInput.max = this.maxNum;
        this.startNewGame();
    }

    startNewGame() {
        this.numberToGuess = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
        this.tries = 0;
        this.guessHistory = [];
        
        this.updateDisplay();
        this.showFeedback('Make your first guess!', 'neutral');
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.submitBtn.disabled = false;
        this.guessInput.focus();
        
        this.minRangeDisplay.textContent = this.minNum;
        this.maxRangeDisplay.textContent = this.maxNum;
        this.guessHistoryDisplay.innerHTML = '';
    }

    handleGuess() {
        const guess = parseInt(this.guessInput.value);

        // Validate input
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
            this.showFeedback('📉 Too low! Try a higher number.', 'too-low');
            this.addToHistory(guess, 'low');
        } else if (guess > this.numberToGuess) {
            this.showFeedback('📈 Too high! Try a lower number.', 'too-high');
            this.addToHistory(guess, 'high');
        } else {
            this.handleWin();
        }

        this.guessInput.value = '';
        this.guessInput.focus();
    }

    handleWin() {
        this.showFeedback(`🎉 Congratulations! You've guessed the number ${this.numberToGuess} in ${this.tries} tries!`, 'success');
        this.addToHistory(this.numberToGuess, 'correct');
        this.guessInput.disabled = true;
        this.submitBtn.disabled = true;

        // Update best score
        if (this.bestScore === null || this.tries < this.bestScore) {
            this.bestScore = this.tries;
            localStorage.setItem('bestScore', this.bestScore);
            this.updateBestScore();
            
            // Add celebration effect
            setTimeout(() => {
                this.showFeedback(`🏆 New Best Score: ${this.tries} tries!`, 'success');
            }, 1500);
        }
    }

    addToHistory(guess, type) {
        this.guessHistory.push({ guess, type });
        
        const guessItem = document.createElement('div');
        guessItem.className = `guess-item ${type}`;
        guessItem.textContent = guess;
        
        this.guessHistoryDisplay.appendChild(guessItem);
    }

    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${type}`;
    }

    updateDisplay() {
        this.triesDisplay.textContent = this.tries;
    }

    updateBestScore() {
        this.bestScoreDisplay.textContent = this.bestScore || '-';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});
