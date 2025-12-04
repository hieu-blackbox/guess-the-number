let gameStarted = false;
let minNum = 1;
let maxNum = 100;

const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const newGameBtn = document.getElementById('new-game-btn');
const resetBtn = document.getElementById('reset-btn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const rangeDisplay = document.getElementById('range');

// Start a new game on page load
window.addEventListener('load', () => {
    startNewGame();
});

// Event listeners
guessBtn.addEventListener('click', makeGuess);
newGameBtn.addEventListener('click', startNewGame);
resetBtn.addEventListener('click', resetGame);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

async function startNewGame() {
    try {
        const response = await fetch('/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                min: minNum,
                max: maxNum
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            gameStarted = true;
            showFeedback(data.message, 'info');
            attemptsDisplay.textContent = '0';
            rangeDisplay.textContent = `${data.min} and ${data.max}`;
            guessInput.value = '';
            guessInput.focus();
            guessInput.disabled = false;
            guessBtn.disabled = false;
        }
    } catch (error) {
        showFeedback('Error starting game. Please try again.', 'error');
    }
}

async function makeGuess() {
    const guess = guessInput.value.trim();
    
    if (!guess) {
        showFeedback('Please enter a number!', 'error');
        return;
    }
    
    if (!gameStarted) {
        showFeedback('Please start a new game first!', 'error');
        return;
    }
    
    try {
        const response = await fetch('/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                guess: parseInt(guess)
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            attemptsDisplay.textContent = data.tries;
            
            if (data.result === 'correct') {
                showFeedback(data.message, 'correct');
                guessInput.disabled = true;
                guessBtn.disabled = true;
                gameStarted = false;
            } else if (data.result === 'low') {
                showFeedback(data.message, 'info');
                guessInput.value = '';
                guessInput.focus();
            } else if (data.result === 'high') {
                showFeedback(data.message, 'info');
                guessInput.value = '';
                guessInput.focus();
            }
        } else {
            showFeedback(data.message, 'error');
        }
    } catch (error) {
        showFeedback('Error making guess. Please try again.', 'error');
    }
}

async function resetGame() {
    try {
        const response = await fetch('/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            gameStarted = false;
            attemptsDisplay.textContent = '0';
            guessInput.value = '';
            guessInput.disabled = false;
            guessBtn.disabled = false;
            feedback.textContent = '';
            feedback.className = 'feedback';
            startNewGame();
        }
    } catch (error) {
        showFeedback('Error resetting game. Please try again.', 'error');
    }
}

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}
