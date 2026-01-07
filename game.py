import random

class GuessTheNumberGame:
    def __init__(self, min_num: int = 1, max_num: int = 100):
        self.min_num = int(min_num)
        self.max_num = int(max_num)
        self.reset()

    def reset(self):
        self.number_to_guess = random.randint(self.min_num, self.max_num)
        self.tries = 0

    def make_guess(self, guess: int):
        guess = int(guess)
        self.tries += 1

        if guess < self.number_to_guess:
            return {
                "result": "low",
                "message": "Too low! Try again.",
                "tries": self.tries,
            }
        if guess > self.number_to_guess:
            return {
                "result": "high",
                "message": "Too high! Try again.",
                "tries": self.tries,
            }

        return {
            "result": "correct",
            "message": f"Correct! You guessed it in {self.tries} tries!",
            "tries": self.tries,
            "number": self.number_to_guess,
        }


def guess_the_number(min_num, max_num):
    game = GuessTheNumberGame(min_num, max_num)
    guess = None

    print(
        f"Welcome to the Guess the Number game! Try to guess the number between {game.min_num} and {game.max_num}."
    )

    while guess != game.number_to_guess:
        guess = int(input("Enter your guess: "))
        result = game.make_guess(guess)
        print(result["message"])

# Start the game
if __name__ == '__main__':
    guess_the_number(1, 100)
