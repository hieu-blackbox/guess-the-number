#!/usr/bin/env python3
"""
Standalone test of the game logic without FastAPI dependencies
"""

import random
import uuid
from datetime import datetime

class SimpleGame:
    """Simplified version of the game logic for testing"""
    def __init__(self, min_num: int, max_num: int):
        self.game_id = str(uuid.uuid4())
        self.min_num = min_num
        self.max_num = max_num
        self.target_number = random.randint(min_num, max_num)
        self.tries = 0
        self.status = "active"
        self.guesses = []
        self.created_at = datetime.now()
    
    def make_guess(self, guess: int):
        if self.status != "active":
            return {"error": "Game is already finished"}
        
        if guess < self.min_num or guess > self.max_num:
            return {"error": f"Guess must be between {self.min_num} and {self.max_num}"}
        
        self.tries += 1
        
        if guess < self.target_number:
            result = "too_low"
            message = "Too low! Try again."
        elif guess > self.target_number:
            result = "too_high"
            message = "Too high! Try again."
        else:
            result = "correct"
            message = f"Congratulations! You've guessed the number {self.target_number} in {self.tries} tries!"
            self.status = "won"
        
        # Store guess in history
        guess_record = {
            "guess": guess,
            "result": result,
            "message": message,
            "timestamp": datetime.now()
        }
        self.guesses.append(guess_record)
        
        return {
            "game_id": self.game_id,
            "guess": guess,
            "result": result,
            "message": message,
            "tries": self.tries,
            "game_status": self.status
        }

def test_game():
    print("=== Testing Guess the Number Game Logic ===\n")
    
    # Create a new game with a small range for easier testing
    game = SimpleGame(1, 10)
    print(f"Game created!")
    print(f"Game ID: {game.game_id}")
    print(f"Range: {game.min_num} - {game.max_num}")
    print(f"Target number (for testing): {game.target_number}")
    print(f"Initial status: {game.status}\n")
    
    # Test some guesses
    test_guesses = [1, 10, game.target_number]  # Low, high, correct
    
    for guess in test_guesses:
        if game.status == "won":
            break
            
        print(f"Making guess: {guess}")
        response = game.make_guess(guess)
        
        if "error" in response:
            print(f"  Error: {response['error']}")
        else:
            print(f"  Result: {response['result']}")
            print(f"  Message: {response['message']}")
            print(f"  Tries: {response['tries']}")
            print(f"  Game Status: {response['game_status']}")
        print()
    
    # Show game history
    print("Game History:")
    for i, guess_record in enumerate(game.guesses, 1):
        print(f"  {i}. Guess: {guess_record['guess']}, Result: {guess_record['result']}")
    
    print(f"\nFinal game status: {game.status}")
    print(f"Total tries: {game.tries}")
    
    # Test edge cases
    print("\n=== Testing Edge Cases ===")
    
    # Test out of range guess
    if game.status == "active":
        print("Testing out of range guess (0):")
        response = game.make_guess(0)
        if "error" in response:
            print(f"  ✓ Correctly rejected: {response['error']}")
    
    # Test guess on finished game
    if game.status == "won":
        print("Testing guess on finished game:")
        response = game.make_guess(5)
        if "error" in response:
            print(f"  ✓ Correctly rejected: {response['error']}")
    
    print("\n=== Test Complete ===")

if __name__ == "__main__":
    test_game()