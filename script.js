// Game state
let numberToGuess;
let tries = 0;
let minNum = 1;
let maxNum = 100;
let guessHistory = [];
let gameActive = true;

// DOM elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const triesDisplay = document.getElementById('tries');
const rangeDisplay = document.getElementById('range');
const guessHistoryDisplay = document.getElementById('guessHistory');
const minNumDisplay = document.getElementById('minNum');
const maxNumDisplay = document.getElementById('maxNum');

// Initialize game
function initGame() {
    numberToGuess = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    tries = 0;
    guessHistory = [];
    gameActive = true;
    
    // Reset UI
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    feedback.textContent = '';
    feedback.className = 'feedback';
    triesDisplay.textContent = '0';
    rangeDisplay.textContent = `${minNum}-${maxNum}`;
    minNumDisplay.textContent = minNum;
    maxNumDisplay.textContent = maxNum;
    guessHistoryDisplay.innerHTML = '<div class="empty-history">No guesses yet</div>';
    
    // Focus input
    guessInput.focus();
}

// Handle guess submission
function handleGuess() {
    if (!gameActive) return;
    
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess)) {
        showFeedback('Please enter a valid number!', 'error');
        shakeElement(guessInput);
        return;
    }
    
    if (guess < minNum || guess > maxNum) {
        showFeedback(`Please enter a number between ${minNum} and ${maxNum}!`, 'error');
        shakeElement(guessInput);
        return;
    }
    
    // Check if already guessed
    if (guessHistory.includes(guess)) {
        showFeedback('You already guessed that number!', 'error');
        shakeElement(guessInput);
        return;
    }
    
    // Process guess
    tries++;
    triesDisplay.textContent = tries;
    guessHistory.push(guess);
    
    // Clear input
    guessInput.value = '';
    
    // Check guess
    if (guess < numberToGuess) {
        showFeedback('Too low! Try a higher number.', 'too-low');
        addGuessToHistory(guess, 'low');
    } else if (guess > numberToGuess) {
        showFeedback('Too high! Try a lower number.', 'too-high');
        addGuessToHistory(guess, 'high');
    } else {
        // Correct guess!
        gameActive = false;
        guessInput.disabled = true;
        submitBtn.disabled = true;
        
        const message = tries === 1 
            ? `🎉 Amazing! You guessed it on the first try!`
            : `🎉 Congratulations! You guessed the number ${numberToGuess} in ${tries} ${tries === 1 ? 'try' : 'tries'}!`;
        
        showFeedback(message, 'success');
        addGuessToHistory(guess, 'correct');
        pulseElement(feedback);
    }
    
    guessInput.focus();
}

// Show feedback message
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;
}

// Add guess to history display
function addGuessToHistory(guess, type) {
    // Remove empty message if exists
    const emptyMessage = guessHistoryDisplay.querySelector('.empty-history');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    const guessItem = document.createElement('div');
    guessItem.className = `guess-item ${type}`;
    guessItem.textContent = guess;
    guessHistoryDisplay.appendChild(guessItem);
}

// Animation helpers
function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

function pulseElement(element) {
    element.classList.add('pulse');
    setTimeout(() => element.classList.remove('pulse'), 600);
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
    showFeedback('New game started! Good luck!', 'success');
    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'feedback';
    }, 2000);
});

// Prevent non-numeric input
guessInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Initialize game on load
initGame();
