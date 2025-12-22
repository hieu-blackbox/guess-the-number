import random
import tkinter as tk
from tkinter import messagebox

class GuessTheNumberGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Guess the Number Game")
        self.root.geometry("400x300")

        # Game state variables
        self.number_to_guess = None
        self.tries = 0
        self.min_num = 1
        self.max_num = 100

        # GUI elements
        self.setup_ui()

    def setup_ui(self):
        # Title label
        title_label = tk.Label(self.root, text="Guess the Number Game", font=("Arial", 16, "bold"))
        title_label.pack(pady=10)

        # Min/Max input frame
        input_frame = tk.Frame(self.root)
        input_frame.pack(pady=5)

        tk.Label(input_frame, text="Min:").grid(row=0, column=0, padx=5)
        self.min_entry = tk.Entry(input_frame, width=10)
        self.min_entry.insert(0, "1")
        self.min_entry.grid(row=0, column=1, padx=5)

        tk.Label(input_frame, text="Max:").grid(row=0, column=2, padx=5)
        self.max_entry = tk.Entry(input_frame, width=10)
        self.max_entry.insert(0, "100")
        self.max_entry.grid(row=0, column=3, padx=5)

        # Start game button
        self.start_button = tk.Button(self.root, text="Start New Game", command=self.start_game)
        self.start_button.pack(pady=10)

        # Guess input
        guess_frame = tk.Frame(self.root)
        guess_frame.pack(pady=5)

        tk.Label(guess_frame, text="Your Guess:").grid(row=0, column=0, padx=5)
        self.guess_entry = tk.Entry(guess_frame, width=10)
        self.guess_entry.grid(row=0, column=1, padx=5)

        # Guess button
        self.guess_button = tk.Button(guess_frame, text="Guess", command=self.make_guess, state=tk.DISABLED)
        self.guess_button.grid(row=0, column=2, padx=5)

        # Feedback label
        self.feedback_label = tk.Label(self.root, text="", font=("Arial", 12))
        self.feedback_label.pack(pady=10)

        # Tries label
        self.tries_label = tk.Label(self.root, text="Tries: 0")
        self.tries_label.pack(pady=5)

    def start_game(self):
        try:
            self.min_num = int(self.min_entry.get())
            self.max_num = int(self.max_entry.get())

            if self.min_num >= self.max_num:
                messagebox.showerror("Error", "Min number must be less than max number!")
                return

            self.number_to_guess = random.randint(self.min_num, self.max_num)
            self.tries = 0
            self.feedback_label.config(text=f"Try to guess the number between {self.min_num} and {self.max_num}!")
            self.tries_label.config(text="Tries: 0")
            self.guess_button.config(state=tk.NORMAL)
            self.guess_entry.focus()

        except ValueError:
            messagebox.showerror("Error", "Please enter valid numbers for min and max!")

    def make_guess(self):
        try:
            guess = int(self.guess_entry.get())
            self.tries += 1
            self.tries_label.config(text=f"Tries: {self.tries}")

            if guess < self.number_to_guess:
                self.feedback_label.config(text="Too low! Try again.")
            elif guess > self.number_to_guess:
                self.feedback_label.config(text="Too high! Try again.")
            else:
                self.feedback_label.config(text=f"Congratulations! You've guessed the number {self.number_to_guess} in {self.tries} tries!")
                self.guess_button.config(state=tk.DISABLED)
                messagebox.showinfo("Success", f"You won in {self.tries} tries!")

            self.guess_entry.delete(0, tk.END)
            self.guess_entry.focus()

        except ValueError:
            messagebox.showerror("Error", "Please enter a valid number for your guess!")

def main():
    root = tk.Tk()
    game = GuessTheNumberGame(root)
    root.mainloop()

if __name__ == '__main__':
    main()