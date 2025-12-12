let numberToGuess;
let tries = 0;
let minNum = 1;
let maxNum = 100;
let gameOver = false;

function initGame() {
    numberToGuess = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    tries = 0;
    gameOver = false;
    
    document.getElementById('tries').textContent = tries;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('guess-input').value = '';
    document.getElementById('guess-input').disabled = false;
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('guess-input').focus();
}

function makeGuess() {
    if (gameOver) return;
    
    const guessInput = document.getElementById('guess-input');
    const guess = parseInt(guessInput.value);
    const feedbackElement = document.getElementById('feedback');
    
    if (isNaN(guess) || guess < minNum || guess > maxNum) {
        feedbackElement.textContent = `Please enter a valid number between ${minNum} and ${maxNum}`;
        feedbackElement.className = 'feedback high';
        return;
    }
    
    tries++;
    document.getElementById('tries').textContent = tries;
    
    if (guess < numberToGuess) {
        feedbackElement.textContent = '📉 Too low! Try a higher number.';
        feedbackElement.className = 'feedback low';
    } else if (guess > numberToGuess) {
        feedbackElement.textContent = '📈 Too high! Try a lower number.';
        feedbackElement.className = 'feedback high';
    } else {
        feedbackElement.textContent = `🎉 Congratulations! You guessed ${numberToGuess} in ${tries} ${tries === 1 ? 'try' : 'tries'}!`;
        feedbackElement.className = 'feedback success';
        gameOver = true;
        document.getElementById('guess-input').disabled = true;
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('restart-btn').style.display = 'block';
    }
    
    guessInput.value = '';
    guessInput.focus();
}

function restartGame() {
    initGame();
}

// Allow Enter key to submit guess
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('guess-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });
    
    initGame();
});
