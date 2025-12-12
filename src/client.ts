// Client-side TypeScript for the game

interface StartGameResponse {
  success: boolean;
  message: string;
  min: number;
  max: number;
}

interface GuessResponse {
  success: boolean;
  result?: 'low' | 'high' | 'correct';
  message: string;
  tries: number;
  number?: number;
}

interface ResetResponse {
  success: boolean;
  message: string;
}

class GuessTheNumberGame {
  private currentMin: number = 1;
  private currentMax: number = 100;

  constructor() {
    this.initializeEventListeners();
    this.showScreen('setup-screen');
  }

  private initializeEventListeners(): void {
    // Difficulty buttons
    const difficultyButtons = document.querySelectorAll('.difficulty-buttons .btn');
    difficultyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const min = parseInt(target.dataset.min || '1');
        const max = parseInt(target.dataset.max || '100');
        this.startGame(min, max);
      });
    });

    // Guess button
    const guessBtn = document.getElementById('guess-btn');
    if (guessBtn) {
      guessBtn.addEventListener('click', () => this.makeGuess());
    }

    // Enter key on input
    const guessInput = document.getElementById('guess-input') as HTMLInputElement;
    if (guessInput) {
      guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.makeGuess();
        }
      });
    }

    // New game button
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) {
      newGameBtn.addEventListener('click', () => this.resetGame());
    }

    // Play again button
    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => this.resetGame());
    }
  }

  private showScreen(screenId: string): void {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }
  }

  private async startGame(min: number, max: number): Promise<void> {
    this.currentMin = min;
    this.currentMax = max;

    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ min, max })
      });

      const data: StartGameResponse = await response.json();

      if (data.success) {
        const rangeDisplay = document.getElementById('range-display');
        const triesDisplay = document.getElementById('tries-display');
        const feedback = document.getElementById('feedback');
        const guessInput = document.getElementById('guess-input') as HTMLInputElement;

        if (rangeDisplay) rangeDisplay.textContent = `Range: ${min} - ${max}`;
        if (triesDisplay) triesDisplay.textContent = 'Tries: 0';
        if (feedback) {
          feedback.textContent = '';
          feedback.className = 'feedback';
        }
        if (guessInput) {
          guessInput.value = '';
          guessInput.min = min.toString();
          guessInput.max = max.toString();
          guessInput.focus();
        }

        this.showScreen('game-screen');
      }
    } catch (error) {
      console.error('Error starting game:', error);
      this.showFeedback('Error starting game. Please try again.', 'error');
    }
  }

  private async makeGuess(): Promise<void> {
    const guessInput = document.getElementById('guess-input') as HTMLInputElement;
    const guess = guessInput.value;

    if (!guess) {
      this.showFeedback('Please enter a number!', 'error');
      return;
    }

    const guessNum = parseInt(guess);

    if (guessNum < this.currentMin || guessNum > this.currentMax) {
      this.showFeedback(
        `Please enter a number between ${this.currentMin} and ${this.currentMax}!`,
        'error'
      );
      return;
    }

    try {
      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess: guessNum })
      });

      const data: GuessResponse = await response.json();

      if (data.success) {
        const triesDisplay = document.getElementById('tries-display');
        if (triesDisplay) {
          triesDisplay.textContent = `Tries: ${data.tries}`;
        }

        if (data.result === 'correct') {
          const winMessage = document.getElementById('win-message');
          const winTries = document.getElementById('win-tries');
          
          if (winMessage) {
            winMessage.textContent = 'Congratulations! 🎊';
          }
          if (winTries) {
            winTries.textContent = `You guessed the number ${data.number} in ${data.tries} ${data.tries === 1 ? 'try' : 'tries'}!`;
          }
          
          this.showScreen('win-screen');
        } else if (data.result === 'low') {
          this.showFeedback('📉 Too low! Try a higher number.', 'low');
          guessInput.value = '';
          guessInput.focus();
        } else if (data.result === 'high') {
          this.showFeedback('📈 Too high! Try a lower number.', 'high');
          guessInput.value = '';
          guessInput.focus();
        }
      } else {
        this.showFeedback(data.message, 'error');
      }
    } catch (error) {
      console.error('Error making guess:', error);
      this.showFeedback('Error making guess. Please try again.', 'error');
    }
  }

  private showFeedback(message: string, type: string): void {
    const feedback = document.getElementById('feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.className = `feedback ${type}`;
    }
  }

  private async resetGame(): Promise<void> {
    try {
      await fetch('/api/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      this.showScreen('setup-screen');
    } catch (error) {
      console.error('Error resetting game:', error);
      this.showScreen('setup-screen');
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GuessTheNumberGame();
});
