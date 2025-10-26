#!/usr/bin/env python3
"""
Test script to demonstrate the Guess the Number Game API functionality
This script simulates API calls without requiring FastAPI to be installed
"""

import json
import sys
import os

# Add the current directory to Python path to import our API module
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_game_logic():
    """Test the core game logic without FastAPI dependencies"""
    print("=== Testing Guess the Number Game API Logic ===\n")
    
    # Import the Game class from our API
    try:
        from api import Game, CreateGameRequest, GuessRequest
        print("✓ Successfully imported API components")
    except ImportError as e:
        print(f"✗ Import error: {e}")
        print("Note: FastAPI dependencies not installed, but core logic can still be tested")
        return
    
    # Test 1: Create a new game
    print("\n1. Testing game creation:")
    game = Game(1, 10)
    print(f"   Game ID: {game.game_id}")
    print(f"   Range: {game.min_num} - {game.max_num}")
    print(f"   Target number: {game.target_number} (for testing purposes)")
    print(f"   Status: {game.status}")
    
    # Test 2: Make some guesses
    print("\n2. Testing guesses:")
    
    # Test a low guess
    if game.target_number > 1:
        low_guess = 1
        response = game.make_guess(low_guess)
        print(f"   Guess {low_guess}: {response.message}")
        print(f"   Result: {response.result}, Tries: {response.tries}")
    
    # Test a high guess
    if game.target_number < 10:
        high_guess = 10
        response = game.make_guess(high_guess)
        print(f"   Guess {high_guess}: {response.message}")
        print(f"   Result: {response.result}, Tries: {response.tries}")
    
    # Test the correct guess
    correct_guess = game.target_number
    response = game.make_guess(correct_guess)
    print(f"   Guess {correct_guess}: {response.message}")
    print(f"   Result: {response.result}, Tries: {response.tries}")
    print(f"   Game Status: {response.game_status}")
    
    # Test 3: Check game history
    print(f"\n3. Testing game history:")
    print(f"   Total guesses made: {len(game.guesses)}")
    for i, guess_history in enumerate(game.guesses, 1):
        print(f"   Guess {i}: {guess_history.guess} -> {guess_history.result}")
    
    print("\n=== All tests completed successfully! ===")

def show_api_usage():
    """Show example API usage with curl commands"""
    print("\n=== API Usage Examples ===")
    print("\nOnce you have FastAPI installed, you can start the server with:")
    print("  python3 api.py")
    print("\nThen use these curl commands to interact with the API:")
    
    print("\n1. Create a new game:")
    print('  curl -X POST "http://localhost:8000/games" \\')
    print('       -H "Content-Type: application/json" \\')
    print('       -d \'{"min_num": 1, "max_num": 100}\'')
    
    print("\n2. Make a guess (replace GAME_ID with actual game ID):")
    print('  curl -X POST "http://localhost:8000/games/GAME_ID/guess" \\')
    print('       -H "Content-Type: application/json" \\')
    print('       -d \'{"guess": 50}\'')
    
    print("\n3. Get game status:")
    print('  curl "http://localhost:8000/games/GAME_ID"')
    
    print("\n4. Get game history:")
    print('  curl "http://localhost:8000/games/GAME_ID/history"')
    
    print("\n5. Get API info:")
    print('  curl "http://localhost:8000/"')

if __name__ == "__main__":
    test_game_logic()
    show_api_usage()