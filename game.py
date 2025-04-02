import random

def guess_the_number(min_num, max_num):
    number_to_guess = random.randint(min_num, max_num)
    guess = None
    tries = 0

    print(f"Welcome to the Guess the Number game! Try to guess the number between {min_num} and {max_num}.")

    while guess != number_to_guess:
        guess = int(input("Enter your guess: "))
        tries += 1

        if guess < number_to_guess:
            print("Too low! Try again.")
        elif guess > number_to_guess:
            print("Too high! Try again.")
        else:
            print(f"Congratulations! You've guessed the number {number_to_guess} in {tries} tries!")

# Start the game
if __name__ == '__main__':
    guess_the_number(1, 100)