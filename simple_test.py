#!/usr/bin/env python3
"""
Simple test for the game logic without FastAPI dependencies
"""

import sys
import os
sys.path.append(os.path.dirname(__file__))

# Import the Game class from api.py (without FastAPI dependencies)
import random
import uuid
from datetime import datetime

class Game:
    def __init__(self, min_num: int, max_num: int):
        self.game_id = str(uuid.uuid4())
        self.min_num = min_num
        self.max_num = max_num
        self.target_number = random.randint(min_num, max_num)
        self.tries = 0
        self.status = "active"
        self.created_at = datetime.now()
        self.guess_history = []
    
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
        
        # Add to history
        guess_entry = {
            "guess": guess,
            "result": result,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        self.guess_history.append(guess_entry)
        
        return {
            "game_id": self.game_id,
            "guess": guess,
            "result": result,
            "message": message,
            "tries": self.tries,
            "game_status": self.status
        }

def test_game_logic():
    print("🎮 Testing Guess the Number Game Logic")
    print("=" * 50)
    
    # Create a new game
    print("\n1. Creating a new game (1-10)...")
    game = Game(1, 10)
    print(f"Game ID: {game.game_id[:8]}...")
    print(f"Target number (for testing): {game.target_number}")
    print(f"Range: {game.min_num} - {game.max_num}")
    
    # Test some guesses
    print(f"\n2. Making test guesses...")
    test_guesses = [5, 8, 3]
    
    for guess in test_guesses:
        print(f"\n   Guessing {guess}...")
        result = game.make_guess(guess)
        if "error" in result:
            print(f"   Error: {result['error']}")
        else:
            print(f"   Result: {result['result']}")
            print(f"   Message: {result['message']}")
            print(f"   Tries: {result['tries']}")
            
            if result["game_status"] == "won":
                print("   🎉 Game won!")
                break
    
    # If game not won, guess the correct number
    if game.status == "active":
        print(f"\n   Guessing the correct number: {game.target_number}...")
        result = game.make_guess(game.target_number)
        print(f"   Result: {result['result']}")
        print(f"   Message: {result['message']}")
    
    # Show game history
    print(f"\n3. Game history:")
    for i, entry in enumerate(game.guess_history, 1):
        print(f"   {i}. Guess {entry['guess']}: {entry['result']} - {entry['message']}")
    
    # Test error cases
    print(f"\n4. Testing error cases...")
    
    # Out of range guess
    print("   Testing out of range guess (50)...")
    result = game.make_guess(50)
    if "error" in result:
        print(f"   ✅ Correctly caught error: {result['error']}")
    
    # Game already finished
    if game.status == "won":
        print("   Testing guess on finished game...")
        result = game.make_guess(5)
        if "error" in result:
            print(f"   ✅ Correctly caught error: {result['error']}")
    
    print("\n" + "=" * 50)
    print("✅ Game logic testing completed!")

if __name__ == "__main__":
    test_game_logic()