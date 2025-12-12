let currentMin = 1;
let currentMax = 100;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

async function startGame(min, max) {
    currentMin = min;
    currentMax = max;
    
    try {
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ min, max })
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('range-display').textContent = `Range: ${min} - ${max}`;
            document.getElementById('tries-display').textContent = 'Tries: 0';
            document.getElementById('feedback').textContent = '';
            document.getElementById('feedback').className = 'feedback';
            document.getElementById('guess-input').value = '';
            document.getElementById('guess-input').min = min;
            document.getElementById('guess-input').max = max;
            showScreen('game-screen');
            document.getElementById('guess-input').focus();
        }
    } catch (error) {
        console.error('Error starting game:', error);
        showFeedback('Error starting game. Please try again.', 'error');
    }
}

async function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value;
    
    if (!guess) {
        showFeedback('Please enter a number!', 'error');
        return;
    }
    
    const guessNum = parseInt(guess);
    
    if (guessNum < currentMin || guessNum > currentMax) {
        showFeedback(`Please enter a number between ${currentMin} and ${currentMax}!`, 'error');
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
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('tries-display').textContent = `Tries: ${data.tries}`;
            
            if (data.result === 'correct') {
                document.getElementById('win-message').textContent = `Congratulations! 🎊`;
                document.getElementById('win-tries').textContent = `You guessed the number ${data.number} in ${data.tries} ${data.tries === 1 ? 'try' : 'tries'}!`;
                showScreen('win-screen');
            } else if (data.result === 'low') {
                showFeedback('📉 Too low! Try a higher number.', 'low');
                guessInput.value = '';
                guessInput.focus();
            } else if (data.result === 'high') {
                showFeedback('📈 Too high! Try a lower number.', 'high');
                guessInput.value = '';
                guessInput.focus();
            }
        } else {
            showFeedback(data.message, 'error');
        }
    } catch (error) {
        console.error('Error making guess:', error);
        showFeedback('Error making guess. Please try again.', 'error');
    }
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

async function resetGame() {
    try {
        await fetch('/api/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        showScreen('setup-screen');
    } catch (error) {
        console.error('Error resetting game:', error);
        showScreen('setup-screen');
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        makeGuess();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showScreen('setup-screen');
});
