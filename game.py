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

        # Set up the GUI
        self.root.title("Guess the Number")
        self.root.geometry("400x300")

        # Instruction label
        self.instruction_label = tk.Label(root, text=f"Guess the number between {min_num} and {max_num}!", font=("Arial", 14))
        self.instruction_label.pack(pady=10)

        # Entry field for guess
        self.guess_entry = tk.Entry(root, font=("Arial", 12))
        self.guess_entry.pack(pady=5)

        # Guess button
        self.guess_button = tk.Button(root, text="Guess", command=self.check_guess, font=("Arial", 12))
        self.guess_button.pack(pady=5)

        # Feedback label
        self.feedback_label = tk.Label(root, text="", font=("Arial", 12))
        self.feedback_label.pack(pady=10)

        # Tries label
        self.tries_label = tk.Label(root, text="Tries: 0", font=("Arial", 10))
        self.tries_label.pack(pady=5)

        # New Game button
        self.new_game_button = tk.Button(root, text="New Game", command=self.new_game, font=("Arial", 12))
        self.new_game_button.pack(pady=10)

    def check_guess(self):
        try:
            guess = int(self.guess_entry.get())
            self.tries += 1
            self.tries_label.config(text=f"Tries: {self.tries}")

            if guess < self.number_to_guess:
                self.feedback_label.config(text="Too low! Try again.", fg="blue")
            elif guess > self.number_to_guess:
                self.feedback_label.config(text="Too high! Try again.", fg="red")
            else:
                self.feedback_label.config(text=f"Congratulations! You've guessed the number {self.number_to_guess} in {self.tries} tries!", fg="green")
                self.guess_button.config(state="disabled")
        except ValueError:
            messagebox.showerror("Invalid Input", "Please enter a valid number.")

        self.guess_entry.delete(0, tk.END)

    def new_game(self):
        self.number_to_guess = random.randint(self.min_num, self.max_num)
        self.tries = 0
        self.tries_label.config(text="Tries: 0")
        self.feedback_label.config(text="")
        self.guess_button.config(state="normal")
        self.guess_entry.focus()

# Start the game
if __name__ == '__main__':
    root = tk.Tk()
    game = GuessTheNumberGame(root)
    root.mainloop()