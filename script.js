// Game state
let numberToGuess;
let tries = 0;
let minNum = 1;
let maxNum = 100;
let gameActive = true;

// DOM elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const triesDisplay = document.getElementById('tries');
const guessHistory = document.getElementById('guessHistory');
const minNumDisplay = document.getElementById('minNum');
const maxNumDisplay = document.getElementById('maxNum');
const rangeDisplay = document.getElementById('range');

// Initialize game
function initGame() {
    numberToGuess = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    tries = 0;
    gameActive = true;
    
    // Reset UI
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    feedback.textContent = '';
    feedback.className = 'feedback';
    triesDisplay.textContent = '0';
    guessHistory.innerHTML = '';
    
    // Update displays
    minNumDisplay.textContent = minNum;
    maxNumDisplay.textContent = maxNum;
    rangeDisplay.textContent = `${minNum}-${maxNum}`;
    
    // Focus input
    guessInput.focus();
}

// Add guess to history
function addToHistory(guess, status) {
    const guessItem = document.createElement('div');
    guessItem.className = `guess-item ${status}`;
    guessItem.textContent = guess;
    guessHistory.appendChild(guessItem);
}

// Handle guess submission
function handleGuess() {
    if (!gameActive) return;
    
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess)) {
        showFeedback('Please enter a valid number!', 'too-high');
        return;
    }
    
    if (guess < minNum || guess > maxNum) {
        showFeedback(`Please enter a number between ${minNum} and ${maxNum}!`, 'too-high');
        return;
    }
    
    tries++;
    triesDisplay.textContent = tries;
    
    // Check guess
    if (guess < numberToGuess) {
        showFeedback('Too low! Try a higher number.', 'too-low');
        addToHistory(guess, 'low');
    } else if (guess > numberToGuess) {
        showFeedback('Too high! Try a lower number.', 'too-high');
        addToHistory(guess, 'high');
    } else {
        const message = tries === 1 
            ? `🎉 Amazing! You guessed it in just 1 try!` 
            : `🎉 Congratulations! You guessed the number ${numberToGuess} in ${tries} tries!`;
        showFeedback(message, 'success');
        addToHistory(guess, 'correct');
        endGame();
    }
    
    // Clear input and focus
    guessInput.value = '';
    guessInput.focus();
}

// Show feedback message
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;
}

// End game
function endGame() {
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
}

// Event listeners
submitBtn.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

resetBtn.addEventListener('click', () => {
    initGame();
});

// Prevent typing non-numeric characters
guessInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Initialize game on load
initGame();
