const readline = require('readline');

function guessTheNumber(minNum, maxNum) {
    const numberToGuess = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    let tries = 0;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(`Welcome to the Guess the Number game! Try to guess the number between ${minNum} and ${maxNum}.`);

    const askGuess = () => {
        rl.question('Enter your guess: ', (answer) => {
            const guess = parseInt(answer);
            tries++;

            if (guess < numberToGuess) {
                console.log('Too low! Try again.');
                askGuess();
            } else if (guess > numberToGuess) {
                console.log('Too high! Try again.');
                askGuess();
            } else {
                console.log(`Congratulations! You've guessed the number ${numberToGuess} in ${tries} tries!`);
                rl.close();
            }
        });
    };

    askGuess();
}

// Start the game
guessTheNumber(1, 100);
