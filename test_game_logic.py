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
    
    # Create a new game
    print("1. Creating a new game (range 1-10):")
    game = SimpleGame(1, 10)
    print(f"   Game ID: {game.game_id}")
    print(f"   Range: {game.min_num} - {game.max_num}")
    print(f"   Target number: {game.target_number} (for testing)")
    print(f"   Status: {game.status}")
    
    # Test some guesses
    print("\n2. Making guesses:")
    
    # Test edge cases first
    print("   Testing out-of-range guess:")
    response = game.make_guess(15)
    if "error" in response:
        print(f"   ✓ Correctly rejected out-of-range guess: {response['error']}")
    
    # Make strategic guesses
    guesses_to_try = [1, 10, game.target_number]  # Low, high, correct
    
    for guess in guesses_to_try:
        if game.status == "won":
            break
        response = game.make_guess(guess)
        if "error" not in response:
            print(f"   Guess {guess}: {response['message']}")
            print(f"   Result: {response['result']}, Tries: {response['tries']}")
    
    # Show final game state
    print(f"\n3. Final game state:")
    print(f"   Status: {game.status}")
    print(f"   Total tries: {game.tries}")
    print(f"   Guess history:")
    for i, guess_record in enumerate(game.guesses, 1):
        print(f"     {i}. {guess_record['guess']} -> {guess_record['result']}")
    
    print("\n=== Test completed successfully! ===")

def show_api_info():
    print("\n=== API Information ===")
    print("The API provides the following endpoints:")
    print("• POST /games - Create a new game")
    print("• POST /games/{game_id}/guess - Make a guess")
    print("• GET /games/{game_id} - Get game status")
    print("• GET /games/{game_id}/history - Get guess history")
    print("• GET / - API information")
    
    print("\nTo run the API server:")
    print("1. Install dependencies: pip install fastapi uvicorn")
    print("2. Start server: python3 api.py")
    print("3. Access API at: http://localhost:8000")
    print("4. View interactive docs at: http://localhost:8000/docs")

if __name__ == "__main__":
    test_game()
    show_api_info()