# Guess the Number Game API

A REST API for the classic "Guess the Number" game built with FastAPI.

## Features

- Create new games with customizable number ranges
- Make guesses and receive feedback (too high, too low, correct)
- Track game status and guess history
- RESTful API with proper HTTP status codes
- Input validation and error handling

## Files

- `game.py` - Original console-based game
- `api.py` - FastAPI REST API implementation
- `requirements.txt` - Python dependencies
- `simple_test.py` - Test script for game logic (no dependencies required)
- `test_api.py` - Full API test script (requires FastAPI)

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the API

Start the API server:
```bash
python3 api.py
```

Or using uvicorn directly:
```bash
uvicorn api:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 1. Create a New Game
```bash
POST /games
Content-Type: application/json

{
  "min_num": 1,
  "max_num": 100
}
```

Response:
```json
{
  "game_id": "uuid-string",
  "min_num": 1,
  "max_num": 100,
  "message": "New game created! Guess a number between 1 and 100."
}
```

### 2. Make a Guess
```bash
POST /games/{game_id}/guess
Content-Type: application/json

{
  "guess": 50
}
```

Response:
```json
{
  "game_id": "uuid-string",
  "guess": 50,
  "result": "too_high",
  "message": "Too high! Try again.",
  "tries": 1,
  "game_status": "active"
}
```

### 3. Get Game Status
```bash
GET /games/{game_id}
```

Response:
```json
{
  "game_id": "uuid-string",
  "min_num": 1,
  "max_num": 100,
  "tries": 3,
  "game_status": "active",
  "created_at": "2025-10-26T10:30:00"
}
```

### 4. Get Guess History
```bash
GET /games/{game_id}/history
```

Response:
```json
{
  "game_id": "uuid-string",
  "guesses": [
    {
      "guess": 50,
      "result": "too_high",
      "message": "Too high! Try again.",
      "timestamp": "2025-10-26T10:30:00"
    }
  ]
}
```

## Testing

### Test Game Logic (No Dependencies)
```bash
python3 simple_test.py
```

### Test Full API (Requires FastAPI)
```bash
python3 test_api.py
```

## Example Usage with curl

1. Create a game:
```bash
curl -X POST "http://localhost:8000/games" \
  -H "Content-Type: application/json" \
  -d '{"min_num": 1, "max_num": 10}'
```

2. Make a guess (replace GAME_ID with actual ID):
```bash
curl -X POST "http://localhost:8000/games/GAME_ID/guess" \
  -H "Content-Type: application/json" \
  -d '{"guess": 5}'
```

3. Check game status:
```bash
curl "http://localhost:8000/games/GAME_ID"
```

4. View guess history:
```bash
curl "http://localhost:8000/games/GAME_ID/history"
```

## API Documentation

Once the server is running, visit:
- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## Game Rules

1. The server generates a random number within the specified range
2. Players make guesses via the API
3. The server responds with "too_high", "too_low", or "correct"
4. The game tracks the number of attempts
5. Game ends when the correct number is guessed

## Error Handling

The API handles various error cases:
- Invalid game IDs (404 Not Found)
- Out-of-range guesses (400 Bad Request)
- Guesses on finished games (400 Bad Request)
- Invalid request data (422 Unprocessable Entity)

## Data Storage

Games are stored in memory and will be lost when the server restarts. For production use, consider implementing persistent storage with a database.