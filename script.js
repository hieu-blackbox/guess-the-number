class GuessTheNumberGame {
    constructor() {
        this.minNum = 1;
        this.maxNum = 100;
        this.numberToGuess = null;
        this.tries = 0;
        this.gameWon = false;
        this.guessHistory = [];
        this.bestScore = localStorage.getItem('bestScore') || null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.startNewGame();
        this.updateBestScore();
    }

    initializeElements() {
        this.guessInput = document.getElementById('guessInput');
        this.submitBtn = document.getElementById('submitGuess');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.triesCount = document.getElementById('triesCount');
        this.bestScoreElement = document.getElementById('bestScore');
        this.feedback = document.getElementById('feedback');
        this.feedbackIcon = document.getElementById('feedbackIcon');
        this.feedbackText = document.getElementById('feedbackText');
        this.guessHistoryElement = document.getElementById('guessHistory');
        this.minNumElement = document.getElementById('minNum');
        this.maxNumElement = document.getElementById('maxNum');
        this.gameInput = document.getElementById('gameInput');
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.makeGuess());
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess();
            }
        });

        this.guessInput.addEventListener('input', () => {
            this.validateInput();
        });
    }

    validateInput() {
        const value = parseInt(this.guessInput.value);
        if (value < this.minNum || value > this.maxNum) {
            this.guessInput.classList.add('border-red-500');
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            this.guessInput.classList.remove('border-red-500');
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    startNewGame() {
        this.numberToGuess = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
        this.tries = 0;
        this.gameWon = false;
        this.guessHistory = [];
        
        this.updateTriesDisplay();
        this.clearFeedback();
        this.clearHistory();
        this.enableInput();
        
        this.guessInput.value = '';
        this.guessInput.focus();
        
        console.log(`New game started! Number to guess: ${this.numberToGuess}`); // For debugging
    }

    makeGuess() {
        if (this.gameWon) return;
        
        const guess = parseInt(this.guessInput.value);
        
        if (isNaN(guess) || guess < this.minNum || guess > this.maxNum) {
            this.showFeedback('❌', `Please enter a number between ${this.minNum} and ${this.maxNum}`, 'bg-red-100 text-red-800');
            return;
        }

        this.tries++;
        this.updateTriesDisplay();
        this.addToHistory(guess);

        if (guess < this.numberToGuess) {
            this.showFeedback('📈', 'Too low! Try a higher number.', 'bg-yellow-100 text-yellow-800');
        } else if (guess > this.numberToGuess) {
            this.showFeedback('📉', 'Too high! Try a lower number.', 'bg-orange-100 text-orange-800');
        } else {
            this.gameWon = true;
            this.showFeedback('🎉', `Congratulations! You guessed ${this.numberToGuess} in ${this.tries} tries!`, 'bg-green-100 text-green-800');
            this.disableInput();
            this.updateBestScore();
            this.celebrateWin();
        }

        this.guessInput.value = '';
        this.guessInput.focus();
    }

    showFeedback(icon, text, bgClass) {
        this.feedbackIcon.textContent = icon;
        this.feedbackText.textContent = text;
        this.feedback.className = `text-center py-4 rounded-lg transition-all duration-300 ${bgClass}`;
        this.feedback.style.opacity = '1';
    }

    clearFeedback() {
        this.feedback.style.opacity = '0';
    }

    updateTriesDisplay() {
        this.triesCount.textContent = this.tries;
    }

    updateBestScore() {
        if (this.gameWon) {
            if (!this.bestScore || this.tries < parseInt(this.bestScore)) {
                this.bestScore = this.tries;
                localStorage.setItem('bestScore', this.bestScore);
                this.bestScoreElement.textContent = this.bestScore;
                this.bestScoreElement.classList.add('animate-pulse');
                setTimeout(() => {
                    this.bestScoreElement.classList.remove('animate-pulse');
                }, 2000);
            }
        }
        
        if (this.bestScore) {
            this.bestScoreElement.textContent = this.bestScore;
        }
    }

    addToHistory(guess) {
        this.guessHistory.unshift(guess);
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.guessHistoryElement.innerHTML = '';
        this.guessHistory.slice(0, 5).forEach((guess, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'flex justify-between items-center bg-gray-100 px-3 py-2 rounded text-sm';
            
            let status = '';
            let statusClass = '';
            if (guess < this.numberToGuess) {
                status = 'Too Low';
                statusClass = 'text-yellow-600';
            } else if (guess > this.numberToGuess) {
                status = 'Too High';
                statusClass = 'text-orange-600';
            } else {
                status = 'Correct!';
                statusClass = 'text-green-600 font-semibold';
            }
            
            historyItem.innerHTML = `
                <span class="font-medium">${guess}</span>
                <span class="${statusClass}">${status}</span>
            `;
            
            this.guessHistoryElement.appendChild(historyItem);
        });
    }

    clearHistory() {
        this.guessHistoryElement.innerHTML = '';
    }

    enableInput() {
        this.guessInput.disabled = false;
        this.submitBtn.disabled = false;
        this.gameInput.classList.remove('opacity-50');
    }

    disableInput() {
        this.guessInput.disabled = true;
        this.submitBtn.disabled = true;
        this.gameInput.classList.add('opacity-50');
    }

    celebrateWin() {
        // Add some celebration animation
        const gameContainer = document.querySelector('.bg-white');
        gameContainer.classList.add('animate-pulse');
        setTimeout(() => {
            gameContainer.classList.remove('animate-pulse');
        }, 1000);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});
