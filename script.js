class GuessTheNumberGame {
    constructor() {
        this.minNum = 1;
        this.maxNum = 100;
        this.numberToGuess = null;
        this.attempts = 0;
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
        this.resetBtn = document.getElementById('reset-btn');
        this.feedback = document.getElementById('feedback');
        this.attemptsDisplay = document.getElementById('attempts');
        this.bestScoreDisplay = document.getElementById('best-score');
        this.guessHistoryDisplay = document.getElementById('guess-history');
        this.minRangeDisplay = document.getElementById('min-range');
        this.maxRangeDisplay = document.getElementById('max-range');
        this.settingsToggle = document.getElementById('settings-toggle');
        this.settingsPanel = document.getElementById('settings-panel');
        this.minInput = document.getElementById('min-input');
        this.maxInput = document.getElementById('max-input');
        this.applySettingsBtn = document.getElementById('apply-settings');
    }
    
    attachEventListeners() {
        this.submitBtn.addEventListener('click', () => this.handleGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGuess();
        });
        this.resetBtn.addEventListener('click', () => this.startNewGame());
        this.settingsToggle.addEventListener('click', () => this.toggleSettings());
        this.applySettingsBtn.addEventListener('click', () => this.applySettings());
        
        // Close settings when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.settingsPanel.contains(e.target) && e.target !== this.settingsToggle) {
                this.settingsPanel.classList.add('hidden');
            }
        });
    }
    
    startNewGame() {
        this.numberToGuess = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
        this.attempts = 0;
        this.guessHistory = [];
        this.updateDisplay();
        this.clearFeedback();
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.submitBtn.disabled = false;
        this.guessInput.focus();
        console.log('New game started. Number to guess:', this.numberToGuess); // For debugging
    }
    
    handleGuess() {
        const guess = parseInt(this.guessInput.value);
        
        // Validation
        if (isNaN(guess)) {
            this.showFeedback('Please enter a valid number!', 'error');
            return;
        }
        
        if (guess < this.minNum || guess > this.maxNum) {
            this.showFeedback(`Please enter a number between ${this.minNum} and ${this.maxNum}!`, 'error');
            return;
        }
        
        this.attempts++;
        this.guessHistory.push(guess);
        
        if (guess < this.numberToGuess) {
            this.showFeedback('📈 Too low! Try a higher number.', 'info');
            this.addGuessChip(guess, 'low');
        } else if (guess > this.numberToGuess) {
            this.showFeedback('📉 Too high! Try a lower number.', 'info');
            this.addGuessChip(guess, 'high');
        } else {
            this.handleWin();
        }
        
        this.updateDisplay();
        this.guessInput.value = '';
        this.guessInput.focus();
    }
    
    handleWin() {
        this.showFeedback(`🎉 Congratulations! You've guessed the number ${this.numberToGuess} in ${this.attempts} ${this.attempts === 1 ? 'try' : 'tries'}!`, 'success');
        this.guessInput.disabled = true;
        this.submitBtn.disabled = true;
        
        // Update best score
        if (!this.bestScore || this.attempts < this.bestScore) {
            this.bestScore = this.attempts;
            localStorage.setItem('bestScore', this.bestScore);
            this.updateBestScore();
        }
    }
    
    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${type}`;
    }
    
    clearFeedback() {
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
    }
    
    addGuessChip(guess, type) {
        const chip = document.createElement('div');
        chip.className = `guess-chip ${type}`;
        chip.textContent = guess;
        this.guessHistoryDisplay.appendChild(chip);
    }
    
    updateDisplay() {
        this.attemptsDisplay.textContent = this.attempts;
        this.minRangeDisplay.textContent = this.minNum;
        this.maxRangeDisplay.textContent = this.maxNum;
        this.guessInput.min = this.minNum;
        this.guessInput.max = this.maxNum;
        
        if (this.attempts === 0) {
            this.guessHistoryDisplay.innerHTML = '';
        }
    }
    
    updateBestScore() {
        this.bestScoreDisplay.textContent = this.bestScore || '-';
    }
    
    toggleSettings() {
        this.settingsPanel.classList.toggle('hidden');
    }
    
    applySettings() {
        const newMin = parseInt(this.minInput.value);
        const newMax = parseInt(this.maxInput.value);
        
        if (isNaN(newMin) || isNaN(newMax)) {
            alert('Please enter valid numbers!');
            return;
        }
        
        if (newMin >= newMax) {
            alert('Minimum number must be less than maximum number!');
            return;
        }
        
        this.minNum = newMin;
        this.maxNum = newMax;
        this.settingsPanel.classList.add('hidden');
        this.startNewGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});