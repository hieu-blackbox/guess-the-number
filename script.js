class GuessTheNumberGame {
    constructor() {
        this.minNum = 1;
        this.maxNum = 100;
        this.numberToGuess = null;
        this.tries = 0;
        this.bestScore = localStorage.getItem('bestScore') || null;
        
        this.initElements();
        this.initGame();
        this.attachEventListeners();
        this.updateBestScore();
    }
    
    initElements() {
        this.guessInput = document.getElementById('guess-input');
        this.submitBtn = document.getElementById('submit-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.messageDiv = document.getElementById('message');
        this.triesCount = document.getElementById('tries-count');
        this.bestScoreSpan = document.getElementById('best-score');
        this.minRangeSpan = document.getElementById('min-range');
        this.maxRangeSpan = document.getElementById('max-range');
        this.minInput = document.getElementById('min-input');
        this.maxInput = document.getElementById('max-input');
        this.applyRangeBtn = document.getElementById('apply-range-btn');
    }
    
    initGame() {
        this.numberToGuess = this.generateRandomNumber(this.minNum, this.maxNum);
        this.tries = 0;
        this.updateTriesDisplay();
        this.clearMessage();
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.submitBtn.disabled = false;
        this.guessInput.focus();
        this.guessInput.min = this.minNum;
        this.guessInput.max = this.maxNum;
    }
    
    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    attachEventListeners() {
        this.submitBtn.addEventListener('click', () => this.handleGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGuess();
            }
        });
        this.resetBtn.addEventListener('click', () => this.initGame());
        this.applyRangeBtn.addEventListener('click', () => this.applyRange());
    }
    
    handleGuess() {
        const guess = parseInt(this.guessInput.value);
        
        if (isNaN(guess)) {
            this.showMessage('Please enter a valid number!', 'error');
            return;
        }
        
        if (guess < this.minNum || guess > this.maxNum) {
            this.showMessage(`Please enter a number between ${this.minNum} and ${this.maxNum}!`, 'error');
            return;
        }
        
        this.tries++;
        this.updateTriesDisplay();
        
        if (guess < this.numberToGuess) {
            this.showMessage('📉 Too low! Try again.', 'info');
            this.guessInput.value = '';
            this.guessInput.focus();
        } else if (guess > this.numberToGuess) {
            this.showMessage('📈 Too high! Try again.', 'info');
            this.guessInput.value = '';
            this.guessInput.focus();
        } else {
            this.handleWin();
        }
    }
    
    handleWin() {
        this.showMessage(`🎉 Congratulations! You've guessed the number ${this.numberToGuess} in ${this.tries} tries!`, 'success');
        this.guessInput.disabled = true;
        this.submitBtn.disabled = true;
        
        if (this.bestScore === null || this.tries < this.bestScore) {
            this.bestScore = this.tries;
            localStorage.setItem('bestScore', this.bestScore);
            this.updateBestScore();
            setTimeout(() => {
                this.showMessage(`🎉 Congratulations! You've guessed the number ${this.numberToGuess} in ${this.tries} tries! 🏆 NEW BEST SCORE!`, 'success');
            }, 100);
        }
    }
    
    showMessage(text, type) {
        this.messageDiv.textContent = text;
        this.messageDiv.className = `message ${type}`;
    }
    
    clearMessage() {
        this.messageDiv.textContent = '';
        this.messageDiv.className = 'message';
    }
    
    updateTriesDisplay() {
        this.triesCount.textContent = this.tries;
    }
    
    updateBestScore() {
        this.bestScoreSpan.textContent = this.bestScore || '-';
    }
    
    applyRange() {
        const newMin = parseInt(this.minInput.value);
        const newMax = parseInt(this.maxInput.value);
        
        if (isNaN(newMin) || isNaN(newMax)) {
            alert('Please enter valid numbers for the range!');
            return;
        }
        
        if (newMin >= newMax) {
            alert('Minimum must be less than maximum!');
            return;
        }
        
        this.minNum = newMin;
        this.maxNum = newMax;
        this.minRangeSpan.textContent = this.minNum;
        this.maxRangeSpan.textContent = this.maxNum;
        this.initGame();
        this.showMessage(`Range updated! New game started with range ${this.minNum}-${this.maxNum}`, 'info');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});
