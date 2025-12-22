import random
import tkinter as tk
from tkinter import messagebox

class GuessTheNumberGUI:
    def __init__(self, min_num, max_num):
        self.min_num = min_num
        self.max_num = max_num
        self.number_to_guess = random.randint(min_num, max_num)
        self.tries = 0

        self.root = tk.Tk()
        self.root.title("Guess the Number Game")
        self.root.geometry("400x300")

        # Instruction label
        self.instruction_label = tk.Label(self.root,
            text=f"Try to guess the number between {min_num} and {max_num}!",
            font=("Arial", 14))
        self.instruction_label.pack(pady=20)

        # Entry field for guess
        self.guess_entry = tk.Entry(self.root, font=("Arial", 12))
        self.guess_entry.pack(pady=10)

        # Guess button
        self.guess_button = tk.Button(self.root, text="Guess", command=self.make_guess,
            font=("Arial", 12), bg="lightblue")
        self.guess_button.pack(pady=10)

        # Result label
        self.result_label = tk.Label(self.root, text="", font=("Arial", 12))
        self.result_label.pack(pady=10)

        # Tries counter
        self.tries_label = tk.Label(self.root, text="Tries: 0", font=("Arial", 10))
        self.tries_label.pack(pady=10)

    def make_guess(self):
        try:
            guess = int(self.guess_entry.get())
            self.tries += 1
            self.tries_label.config(text=f"Tries: {self.tries}")

            if guess < self.min_num or guess > self.max_num:
                self.result_label.config(text=f"Please enter a number between {self.min_num} and {self.max_num}!")
                return

            if guess < self.number_to_guess:
                self.result_label.config(text="Too low! Try again.")
            elif guess > self.number_to_guess:
                self.result_label.config(text="Too high! Try again.")
            else:
                self.result_label.config(text=f"Congratulations! You've guessed the number {self.number_to_guess} in {self.tries} tries!")
                self.guess_button.config(state="disabled")
                messagebox.showinfo("Game Over", f"You won in {self.tries} tries!")

        except ValueError:
            self.result_label.config(text="Please enter a valid number!")

    def run(self):
        self.root.mainloop()

def guess_the_number(min_num, max_num):
    gui = GuessTheNumberGUI(min_num, max_num)
    gui.run()

# Start the game
if __name__ == '__main__':
    guess_the_number(1, 100)