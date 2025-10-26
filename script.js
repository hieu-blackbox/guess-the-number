class GuessTheNumberGame {
    constructor() {
        this.minNum = 1;
        this.maxNum = 100;
        this.numberToGuess = null;
        this.attempts = 0;
        this.gameActive = false;
        this.guessHistory = [];
        
        this.initializeElements();
        this.attachEventListeners();
        this.startNewGame();
    }
    
    initializeElements() {
        this.guessInput = document.getElementById('guessInput');
        this.submitBtn = document.getElementById('submitGuess');
        this.feedback = document.getElementById('feedback');
        this.attemptsDisplay = document.getElementById('attempts');
        this.rangeDisplay = document.getElementById('range');
        this.newGameBtn = document.getElementById('newGame');
        this.giveUpBtn = document.getElementById('giveUp');
        this.guessHistoryContainer = document.getElementById('guessHistory');
        this.winModal = document.getElementById('winModal');
        this.winMessage = document.getElementById('winMessage');
        this.playAgainBtn = document.getElementById('playAgain');
    }
    
    attachEventListeners() {
        this.submitBtn.addEventListener('click', () => this.makeGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess();
            }
        });
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.giveUpBtn.addEventListener('click', () => this.giveUp());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        
        // Close modal when clicking outside
        this.winModal.addEventListener('click', (e) => {
            if (e.target === this.winModal) {
                this.closeModal();
            }
        });
        
        // Input validation
        this.guessInput.addEventListener('input', () => this.validateInput());
    }
    
    startNewGame() {
        this.numberToGuess = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
        this.attempts = 0;
        this.gameActive = true;
        this.guessHistory = [];
        
        this.updateDisplay();
        this.clearFeedback();
        this.clearGuessHistory();
        this.enableInput();
        this.closeModal();
        
        this.guessInput.focus();
        
        console.log(`Debug: Number to guess is ${this.numberToGuess}`); // For testing purposes
    }
    
    makeGuess() {
        if (!this.gameActive) return;
        
        const guess = parseInt(this.guessInput.value);
        
        if (!this.isValidGuess(guess)) {
            this.showFeedback('Please enter a valid number between 1 and 100!', 'invalid');
            return;
        }
        
        this.attempts++;
        this.guessHistory.push({
            number: guess,
            result: this.getGuessResult(guess)
        });
        
        this.updateDisplay();
        this.updateGuessHistory();
        
        if (guess === this.numberToGuess) {
            this.handleCorrectGuess();
        } else if (guess < this.numberToGuess) {
            this.showFeedback('📈 Too low! Try a higher number.', 'too-low');
        } else {
            this.showFeedback('📉 Too high! Try a lower number.', 'too-high');
        }
        
        this.guessInput.value = '';
        this.guessInput.focus();
    }
    
    isValidGuess(guess) {
        return !isNaN(guess) && guess >= this.minNum && guess <= this.maxNum;
    }
    
    getGuessResult(guess) {
        if (guess < this.numberToGuess) return 'low';
        if (guess > this.numberToGuess) return 'high';
        return 'correct';
    }
    
    handleCorrectGuess() {
        this.gameActive = false;
        this.showFeedback(`🎉 Congratulations! You found the number ${this.numberToGuess}!`, 'correct');
        this.disableInput();
        
        setTimeout(() => {
            this.showWinModal();
        }, 1500);
    }
    
    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${type}`;
        
        // Clear feedback after some time for non-correct guesses
        if (type !== 'correct') {
            setTimeout(() => {
                if (this.gameActive) {
                    this.clearFeedback();
                }
            }, 3000);
        }
    }
    
    clearFeedback() {
        this.feedback.textContent = 'Make your first guess!';
        this.feedback.className = 'feedback';
    }
    
    updateDisplay() {
        this.attemptsDisplay.textContent = this.attempts;
        this.rangeDisplay.textContent = `${this.minNum} - ${this.maxNum}`;
    }
    
    updateGuessHistory() {
        this.guessHistoryContainer.innerHTML = '';
        
        if (this.guessHistory.length === 0) {
            this.guessHistoryContainer.innerHTML = '<p style="text-align: center; color: #718096; font-style: italic;">No guesses yet</p>';
            return;
        }
        
        this.guessHistory.forEach((guess, index) => {
            const guessItem = document.createElement('div');
            guessItem.className = 'guess-item';
            
            const resultText = guess.result === 'low' ? 'Too Low' : 
                              guess.result === 'high' ? 'Too High' : 'Correct!';
            const resultClass = guess.result === 'low' ? 'low' : 
                               guess.result === 'high' ? 'high' : 'correct';
            
            guessItem.innerHTML = `
                <span class="guess-number">#${index + 1}: ${guess.number}</span>
                <span class="guess-result ${resultClass}">${resultText}</span>
            `;
            
            this.guessHistoryContainer.appendChild(guessItem);
        });
        
        // Scroll to bottom
        this.guessHistoryContainer.scrollTop = this.guessHistoryContainer.scrollHeight;
    }
    
    clearGuessHistory() {
        this.guessHistoryContainer.innerHTML = '<p style="text-align: center; color: #718096; font-style: italic;">No guesses yet</p>';
    }
    
    giveUp() {
        if (!this.gameActive) return;
        
        const confirmGiveUp = confirm(`Are you sure you want to give up? The number was ${this.numberToGuess}.`);
        if (confirmGiveUp) {
            this.gameActive = false;
            this.showFeedback(`😔 You gave up! The number was ${this.numberToGuess}. Better luck next time!`, 'give-up');
            this.disableInput();
        }
    }
    
    showWinModal() {
        const attemptsText = this.attempts === 1 ? '1 attempt' : `${this.attempts} attempts`;
        const performanceMessage = this.getPerformanceMessage();
        
        this.winMessage.textContent = `You guessed the number ${this.numberToGuess} in ${attemptsText}! ${performanceMessage}`;
        this.winModal.classList.add('show');
    }
    
    getPerformanceMessage() {
        if (this.attempts === 1) return 'Incredible! First try! 🎯';
        if (this.attempts <= 3) return 'Amazing! You\'re a natural! 🌟';
        if (this.attempts <= 5) return 'Great job! Well done! 👏';
        if (this.attempts <= 7) return 'Good work! Keep it up! 👍';
        if (this.attempts <= 10) return 'Not bad! Practice makes perfect! 💪';
        return 'Keep trying! You\'ll get better! 🎮';
    }
    
    closeModal() {
        this.winModal.classList.remove('show');
    }
    
    playAgain() {
        this.closeModal();
        this.startNewGame();
    }
    
    enableInput() {
        this.guessInput.disabled = false;
        this.submitBtn.disabled = false;
        this.guessInput.focus();
    }
    
    disableInput() {
        this.guessInput.disabled = true;
        this.submitBtn.disabled = true;
    }
    
    validateInput() {
        const value = this.guessInput.value;
        const numValue = parseInt(value);
        
        // Remove any non-numeric characters
        this.guessInput.value = value.replace(/[^0-9]/g, '');
        
        // Limit to range
        if (numValue > this.maxNum) {
            this.guessInput.value = this.maxNum;
        }
        if (numValue < 0) {
            this.guessInput.value = '';
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.keyCode);
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.length === konamiCode.length && 
        window.konamiSequence.every((key, index) => key === konamiCode[index])) {
        
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Add rainbow animation
        if (!document.getElementById('rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        window.konamiSequence = [];
    }
});