import random
import tkinter as tk
from tkinter import messagebox

class GuessTheNumberGame:
    def __init__(self, root, min_num=1, max_num=100):
        self.root = root
        self.min_num = min_num
        self.max_num = max_num
        self.number_to_guess = random.randint(min_num, max_num)
        self.tries = 0

        # GUI elements
        self.title_label = tk.Label(root, text="Guess the Number Game", font=("Arial", 16, "bold"))
        self.title_label.pack(pady=10)

        self.instruction_label = tk.Label(root, text=f"Try to guess the number between {min_num} and {max_num}.")
        self.instruction_label.pack(pady=5)

        self.guess_entry = tk.Entry(root, font=("Arial", 12))
        self.guess_entry.pack(pady=5)

        self.submit_button = tk.Button(root, text="Submit Guess", command=self.submit_guess)
        self.submit_button.pack(pady=5)

        self.reset_button = tk.Button(root, text="New Game", command=self.reset_game)
        self.reset_button.pack(pady=5)

        self.feedback_text = tk.Text(root, height=5, width=40, state=tk.DISABLED, font=("Arial", 10))
        self.feedback_text.pack(pady=10)

        self.tries_label = tk.Label(root, text="Tries: 0")
        self.tries_label.pack(pady=5)

    def submit_guess(self):
        try:
            guess = int(self.guess_entry.get())
            self.tries += 1
            self.tries_label.config(text=f"Tries: {self.tries}")

            if guess < self.min_num or guess > self.max_num:
                self.display_feedback(f"Please enter a number between {self.min_num} and {self.max_num}.")
            elif guess < self.number_to_guess:
                self.display_feedback("Too low! Try again.")
            elif guess > self.number_to_guess:
                self.display_feedback("Too high! Try again.")
            else:
                self.display_feedback(f"Congratulations! You've guessed the number {self.number_to_guess} in {self.tries} tries!")
                self.submit_button.config(state=tk.DISABLED)
        except ValueError:
            self.display_feedback("Please enter a valid number.")

        self.guess_entry.delete(0, tk.END)

    def display_feedback(self, message):
        self.feedback_text.config(state=tk.NORMAL)
        self.feedback_text.delete(1.0, tk.END)
        self.feedback_text.insert(tk.END, message)
        self.feedback_text.config(state=tk.DISABLED)

    def reset_game(self):
        self.number_to_guess = random.randint(self.min_num, self.max_num)
        self.tries = 0
        self.tries_label.config(text="Tries: 0")
        self.display_feedback("New game started! Try to guess the number.")
        self.submit_button.config(state=tk.NORMAL)
        self.guess_entry.focus()

# Start the game
if __name__ == '__main__':
    root = tk.Tk()
    root.title("Guess the Number")
    game = GuessTheNumberGame(root)
    root.mainloop()