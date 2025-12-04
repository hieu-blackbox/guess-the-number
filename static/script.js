let gameActive = false;
let minNum = 1;
let maxNum = 100;

const gameSetup = document.getElementById('game-setup');
const gamePlay = document.getElementById('game-play');
const startBtn = document.getElementById('start-btn');
const guessBtn = document.getElementById('guess-btn');
const resetBtn = document.getElementById('reset-btn');
const minNumInput = document.getElementById('min-num');
const maxNumInput = document.getElementById('max-num');
const guessInput = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const rangeDisplay = document.getElementById('range-display');
const triesDisplay = document.getElementById('tries-display');

startBtn.addEventListener('click', startGame);
guessBtn.addEventListener('click', makeGuess);
resetBtn.addEventListener('click', resetGame);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

async function startGame() {
    minNum = parseInt(minNumInput.value);
    maxNum = parseInt(maxNumInput.value);
    
    if (minNum >= maxNum) {
        showFeedback('Min must be less than Max!', 'error');
        return;
    }
    
    try {
        const response = await fetch('/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ min: minNum, max: maxNum })
        });
        
        const data = await response.json();
        
        if (data.success) {
            gameActive = true;
            gameSetup.classList.add('hidden');
            gamePlay.classList.remove('hidden');
            rangeDisplay.textContent = `${data.min} - ${data.max}`;
            triesDisplay.textContent = '0';
            guessInput.value = '';
            guessInput.min = data.min;
            guessInput.max = data.max;
            guessInput.focus();
            showFeedback(data.message, 'info');
        }
    } catch (error) {
        showFeedback('Error starting game. Please try again.', 'error');
    }
}

async function makeGuess() {
    if (!gameActive) {
        return;
    }
    
    const guess = guessInput.value;
    
    if (!guess) {
        showFeedback('Please enter a number!', 'error');
        return;
    }
    
    try {
        const response = await fetch('/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guess: parseInt(guess) })
        });
        
        const data = await response.json();
        
        if (data.success) {
            triesDisplay.textContent = data.tries;
            
            if (data.result === 'correct') {
                showFeedback(data.message, 'correct');
                gameActive = false;
                guessBtn.disabled = true;
                guessInput.disabled = true;
            } else if (data.result === 'low') {
                showFeedback(`${data.message} 📈`, 'low');
                guessInput.value = '';
                guessInput.focus();
            } else if (data.result === 'high') {
                showFeedback(`${data.message} 📉`, 'high');
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
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            gameActive = false;
            gamePlay.classList.add('hidden');
            gameSetup.classList.remove('hidden');
            guessBtn.disabled = false;
            guessInput.disabled = false;
            feedback.textContent = '';
            feedback.className = 'feedback';
        }
    } catch (error) {
        showFeedback('Error resetting game. Please try again.', 'error');
    }
}

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}
