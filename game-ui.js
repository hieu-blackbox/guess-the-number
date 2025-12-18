class GuessingGame {
    constructor() {
        this.numberToGuess = null;
        this.tries = 0;
        this.hintsUsed = 0;
        this.minNum = 1;
        this.maxNum = 100;
        this.gameOver = false;
        this.difficulty = 'medium';
        this.guessHistory = [];
        this.bestScores = this.loadBestScores();
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateBestScoreDisplay();
    }

    initializeElements() {
        this.elements = {
            difficultySelector: document.getElementById('difficulty-selector'),
            gameArea: document.getElementById('game-area'),
            gameOver: document.getElementById('game-over'),
            guessInput: document.getElementById('guess-input'),
            submitBtn: document.getElementById('submit-btn'),
            feedback: document.getElementById('feedback'),
            tries: document.getElementById('tries'),
            hintsUsed: document.getElementById('hints-used'),
            minNum: document.getElementById('min-num'),
            maxNum: document.getElementById('max-num'),
            hintBtn: document.getElementById('hint-btn'),
            hintText: document.getElementById('hint-text'),
            historyList: document.getElementById('history-list'),
            restartBtn: document.getElementById('restart-btn'),
            changeDifficultyBtn: document.getElementById('change-difficulty-btn'),
            startGameBtn: document.getElementById('start-game-btn'),
            bestScore: document.getElementById('best-score'),
            gameOverTitle: document.getElementById('game-over-title'),
            gameOverMessage: document.getElementById('game-over-message'),
            finalTries: document.getElementById('final-tries'),
            finalHints: document.getElementById('final-hints')
        };
    }

    attachEventListeners() {
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectDifficulty(e.target.closest('.difficulty-btn')));
        });

        this.elements.startGameBtn.addEventListener('click', () => this.startGame());
        this.elements.submitBtn.addEventListener('click', () => this.makeGuess());
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        this.elements.changeDifficultyBtn.addEventListener('click', () => this.changeDifficulty());

        // Enter key support
        this.elements.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
    }

    selectDifficulty(btn) {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.difficulty;

        const ranges = {
            easy: { min: 1, max: 50 },
            medium: { min: 1, max: 100 },
            hard: { min: 1, max: 500 }
        };

        const range = ranges[this.difficulty];
        this.minNum = range.min;
        this.maxNum = range.max;
    }

    startGame() {
        this.initGame();
        this.elements.difficultySelector.style.display = 'none';
        this.elements.gameArea.style.display = 'block';
    }

    initGame() {
        this.numberToGuess = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
        this.tries = 0;
        this.hintsUsed = 0;
        this.gameOver = false;
        this.guessHistory = [];

        this.updateUI();
        this.elements.guessInput.value = '';
        this.elements.guessInput.disabled = false;
        this.elements.submitBtn.disabled = false;
        this.elements.hintBtn.disabled = false;
        this.elements.feedback.textContent = '';
        this.elements.feedback.className = 'feedback';
        this.elements.hintText.textContent = '';
        this.elements.hintText.classList.remove('show');
        this.elements.historyList.innerHTML = '';
        this.elements.guessInput.focus();
    }

    updateUI() {
        this.elements.tries.textContent = this.tries;
        this.elements.hintsUsed.textContent = this.hintsUsed;
        this.elements.minNum.textContent = this.minNum;
        this.elements.maxNum.textContent = this.maxNum;
        this.elements.guessInput.min = this.minNum;
        this.elements.guessInput.max = this.maxNum;
        this.elements.guessInput.placeholder = `Enter ${this.minNum}-${this.maxNum}`;
    }

    makeGuess() {
        if (this.gameOver) return;

        const guess = parseInt(this.elements.guessInput.value);

        if (!this.validateGuess(guess)) return;

        this.tries++;
        this.elements.tries.textContent = this.tries;
        this.addToHistory(guess);

        if (guess < this.numberToGuess) {
            this.showFeedback('📉 Too low! Try a higher number.', 'low');
        } else if (guess > this.numberToGuess) {
            this.showFeedback('📈 Too high! Try a lower number.', 'high');
        } else {
            this.winGame();
        }

        this.elements.guessInput.value = '';
        this.elements.guessInput.focus();
    }

    validateGuess(guess) {
        if (isNaN(guess)) {
            this.showFeedback('⚠️ Please enter a valid number!', 'error');
            return false;
        }

        if (guess < this.minNum || guess > this.maxNum) {
            this.showFeedback(`⚠️ Number must be between ${this.minNum} and ${this.maxNum}!`, 'error');
            return false;
        }

        if (this.guessHistory.includes(guess)) {
            this.showFeedback('⚠️ You already guessed that number!', 'error');
            return false;
        }

        return true;
    }

    showFeedback(message, type) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = `feedback ${type}`;
    }

    addToHistory(guess) {
        this.guessHistory.push(guess);
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${guess < this.numberToGuess ? 'low' : 'high'}`;
        historyItem.textContent = guess;
        this.elements.historyList.appendChild(historyItem);
    }

    showHint() {
        this.hintsUsed++;
        this.elements.hintsUsed.textContent = this.hintsUsed;

        const hints = this.generateHints();
        const hint = hints[Math.min(this.hintsUsed - 1, hints.length - 1)];

        this.elements.hintText.textContent = hint;
        this.elements.hintText.classList.add('show');

        if (this.hintsUsed >= 3) {
            this.elements.hintBtn.disabled = true;
        }
    }

    generateHints() {
        const range = this.maxNum - this.minNum;
        const quarter = Math.floor(range / 4);
        
        let hints = [];

        // Hint 1: General range
        if (this.numberToGuess <= this.minNum + quarter) {
            hints.push(`💡 The number is in the lower quarter (${this.minNum}-${this.minNum + quarter})`);
        } else if (this.numberToGuess <= this.minNum + quarter * 2) {
            hints.push(`💡 The number is in the lower-middle quarter (${this.minNum + quarter + 1}-${this.minNum + quarter * 2})`);
        } else if (this.numberToGuess <= this.minNum + quarter * 3) {
            hints.push(`💡 The number is in the upper-middle quarter (${this.minNum + quarter * 2 + 1}-${this.minNum + quarter * 3})`);
        } else {
            hints.push(`💡 The number is in the upper quarter (${this.minNum + quarter * 3 + 1}-${this.maxNum})`);
        }

        // Hint 2: Even/Odd
        hints.push(`💡 The number is ${this.numberToGuess % 2 === 0 ? 'even' : 'odd'}`);

        // Hint 3: More specific range
        const narrowRange = Math.floor(range / 10);
        const lowerBound = Math.max(this.minNum, this.numberToGuess - narrowRange);
        const upperBound = Math.min(this.maxNum, this.numberToGuess + narrowRange);
        hints.push(`💡 The number is between ${lowerBound} and ${upperBound}`);

        return hints;
    }

    winGame() {
        this.gameOver = true;
        this.elements.guessInput.disabled = true;
        this.elements.submitBtn.disabled = true;
        this.elements.hintBtn.disabled = true;

        const score = this.calculateScore();
        this.updateBestScore(score);

        this.elements.gameOverTitle.textContent = this.getWinTitle();
        this.elements.gameOverMessage.textContent = `You found the number ${this.numberToGuess}! Your score: ${score}`;
        this.elements.finalTries.textContent = this.tries;
        this.elements.finalHints.textContent = this.hintsUsed;

        this.elements.gameArea.style.display = 'none';
        this.elements.gameOver.style.display = 'block';
    }

    getWinTitle() {
        if (this.tries === 1) return '🏆 Perfect! First Try!';
        if (this.tries <= 3) return '🌟 Excellent!';
        if (this.tries <= 5) return '🎯 Great Job!';
        if (this.tries <= 10) return '👍 Well Done!';
        return '🎉 Congratulations!';
    }

    calculateScore() {
        const baseScore = 1000;
        const tryPenalty = this.tries * 10;
        const hintPenalty = this.hintsUsed * 50;
        return Math.max(0, baseScore - tryPenalty - hintPenalty);
    }

    loadBestScores() {
        try {
            const scores = localStorage.getItem('guessingGameBestScores');
            return scores ? JSON.parse(scores) : { easy: 0, medium: 0, hard: 0 };
        } catch (e) {
            return { easy: 0, medium: 0, hard: 0 };
        }
    }

    updateBestScore(score) {
        if (score > this.bestScores[this.difficulty]) {
            this.bestScores[this.difficulty] = score;
            try {
                localStorage.setItem('guessingGameBestScores', JSON.stringify(this.bestScores));
            } catch (e) {
                console.error('Failed to save best score:', e);
            }
            this.updateBestScoreDisplay();
        }
    }

    updateBestScoreDisplay() {
        const bestScore = this.bestScores[this.difficulty];
        this.elements.bestScore.textContent = bestScore > 0 ? bestScore : '--';
    }

    restartGame() {
        this.elements.gameOver.style.display = 'none';
        this.elements.gameArea.style.display = 'block';
        this.initGame();
    }

    changeDifficulty() {
        this.elements.gameOver.style.display = 'none';
        this.elements.difficultySelector.style.display = 'block';
        this.updateBestScoreDisplay();
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GuessingGame();
});
