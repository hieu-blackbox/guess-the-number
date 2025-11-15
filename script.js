// Game state
let numberToGuess;
let tries = 0;
let minNum = 1;
let maxNum = 100;
let gameActive = true;

// DOM elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const feedback = document.getElementById('feedback');
const triesCount = document.getElementById('triesCount');
const rangeDisplay = document.getElementById('rangeDisplay');

// Initialize game
function initGame() {
    numberToGuess = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    tries = 0;
    gameActive = true;
    
    // Reset UI
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    restartBtn.style.display = 'none';
    feedback.textContent = '';
    feedback.className = 'feedback';
    triesCount.textContent = '0';
    rangeDisplay.textContent = `${minNum}-${maxNum}`;
    
    guessInput.focus();
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
    triesCount.textContent = tries;
    
    // Check guess
    if (guess < numberToGuess) {
        showFeedback('📉 Too low! Try a higher number.', 'too-low');
        guessInput.value = '';
        guessInput.focus();
    } else if (guess > numberToGuess) {
        showFeedback('📈 Too high! Try a lower number.', 'too-high');
        guessInput.value = '';
        guessInput.focus();
    } else {
        const message = tries === 1 
            ? `🎉 Incredible! You guessed it on the first try! The number was ${numberToGuess}!`
            : `🎉 Congratulations! You've guessed the number ${numberToGuess} in ${tries} tries!`;
        showFeedback(message, 'correct');
        endGame();
    }
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
    restartBtn.style.display = 'block';
}

// Event listeners
submitBtn.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

restartBtn.addEventListener('click', initGame);

// Start the game
initGame();
