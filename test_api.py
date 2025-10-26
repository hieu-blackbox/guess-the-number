#!/usr/bin/env python3
"""
Test script for the Guess the Number Game API
This script tests the API functionality without starting a server
"""

import json
from fastapi.testclient import TestClient
from api import app

def test_api():
    client = TestClient(app)
    
    print("🎮 Testing Guess the Number Game API")
    print("=" * 50)
    
    # Test 1: Root endpoint
    print("\n1. Testing root endpoint...")
    response = client.get("/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    # Test 2: Create a new game
    print("\n2. Creating a new game...")
    create_response = client.post("/games", json={"min_num": 1, "max_num": 10})
    print(f"Status: {create_response.status_code}")
    game_data = create_response.json()
    print(f"Response: {json.dumps(game_data, indent=2)}")
    
    game_id = game_data["game_id"]
    
    # Test 3: Get game status
    print(f"\n3. Getting game status for game {game_id[:8]}...")
    status_response = client.get(f"/games/{game_id}")
    print(f"Status: {status_response.status_code}")
    print(f"Response: {json.dumps(status_response.json(), indent=2)}")
    
    # Test 4: Make some guesses
    print(f"\n4. Making guesses for game {game_id[:8]}...")
    guesses = [5, 8, 3, 7]
    
    for guess in guesses:
        print(f"\n   Guessing {guess}...")
        guess_response = client.post(f"/games/{game_id}/guess", json={"guess": guess})
        print(f"   Status: {guess_response.status_code}")
        guess_data = guess_response.json()
        print(f"   Result: {guess_data['result']} - {guess_data['message']}")
        
        if guess_data["game_status"] == "won":
            print("   🎉 Game won!")
            break
    
    # Test 5: Get game history
    print(f"\n5. Getting game history for game {game_id[:8]}...")
    history_response = client.get(f"/games/{game_id}/history")
    print(f"Status: {history_response.status_code}")
    history_data = history_response.json()
    print(f"Number of guesses: {len(history_data['guesses'])}")
    for i, guess_entry in enumerate(history_data['guesses'], 1):
        print(f"   {i}. Guess {guess_entry['guess']}: {guess_entry['result']}")
    
    # Test 6: Error handling - invalid game ID
    print("\n6. Testing error handling - invalid game ID...")
    invalid_response = client.get("/games/invalid-id")
    print(f"Status: {invalid_response.status_code}")
    print(f"Response: {json.dumps(invalid_response.json(), indent=2)}")
    
    # Test 7: Error handling - out of range guess
    print(f"\n7. Testing error handling - out of range guess...")
    out_of_range_response = client.post(f"/games/{game_id}/guess", json={"guess": 50})
    print(f"Status: {out_of_range_response.status_code}")
    print(f"Response: {json.dumps(out_of_range_response.json(), indent=2)}")
    
    # Test 8: Create game with custom range
    print("\n8. Creating game with custom range (50-100)...")
    custom_game_response = client.post("/games", json={"min_num": 50, "max_num": 100})
    print(f"Status: {custom_game_response.status_code}")
    print(f"Response: {json.dumps(custom_game_response.json(), indent=2)}")
    
    print("\n" + "=" * 50)
    print("✅ API testing completed!")

if __name__ == "__main__":
    test_api()