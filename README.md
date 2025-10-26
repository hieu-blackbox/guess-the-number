# Guess the Number Game API

A REST API for the classic "Guess the Number" game built with FastAPI.

## Overview

This API allows players to:
- Create new guessing games with customizable number ranges
- Make guesses and receive feedback
- Track game progress and history
- View game statistics

## Files

- `game.py` - Original console-based game
- `api.py` - FastAPI REST API implementation
- `requirements.txt` - Python dependencies
- `test_game_logic.py` - Standalone test script
- `test_api.py` - API testing utilities

## Installation

1. Install dependencies:
```bash
pip install fastapi uvicorn pydantic
```

2. Start the API server:
```bash
python3 api.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Interactive API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## API Endpoints

### `POST /games`
Create a new game.

**Request Body:**
```json
{
  "min_num": 1,
  "max_num": 100
}
```

**Response:**
```json
{
  "game_id": "uuid-string",
  "min_num": 1,
  "max_num": 100,
  "message": "New game created! Guess a number between 1 and 100."
}
```

### `POST /games/{game_id}/guess`
Make a guess for a specific game.

**Request Body:**
```json
{
  "guess": 50
}
```

**Response:**
```json
{
  "game_id": "uuid-string",
  "guess": 50,
  "result": "too_low",
  "message": "Too low! Try again.",
  "tries": 1,
  "game_status": "active"
}
```

### `GET /games/{game_id}`
Get current game status.

**Response:**
```json
{
  "game_id": "uuid-string",
  "min_num": 1,
  "max_num": 100,
  "tries": 3,
  "game_status": "active",
  "created_at": "2025-10-26T12:00:00"
}
```

### `GET /games/{game_id}/history`
Get guess history for a game.

**Response:**
```json
{
  "game_id": "uuid-string",
  "guesses": [
    {
      "guess": 50,
      "result": "too_low",
      "message": "Too low! Try again.",
      "timestamp": "2025-10-26T12:00:00"
    }
  ]
}
```

## Usage Examples

### Create a new game:
```bash
curl -X POST "http://localhost:8000/games" \
     -H "Content-Type: application/json" \
     -d '{"min_num": 1, "max_num": 100}'
```

### Make a guess:
```bash
curl -X POST "http://localhost:8000/games/YOUR_GAME_ID/guess" \
     -H "Content-Type: application/json" \
     -d '{"guess": 50}'
```

### Get game status:
```bash
curl "http://localhost:8000/games/YOUR_GAME_ID"
```

### Get game history:
```bash
curl "http://localhost:8000/games/YOUR_GAME_ID/history"
```

## Game Rules

1. Each game generates a random number within the specified range
2. Players make guesses and receive feedback:
   - `too_low` - guess is lower than the target
   - `too_high` - guess is higher than the target  
   - `correct` - guess matches the target (game won)
3. The game tracks the number of attempts
4. Games can only accept guesses while in `active` status

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request (invalid guess, game finished, etc.)
- `404` - Game not found
- `422` - Validation error

## Testing

Run the test script to verify game logic:
```bash
python3 test_game_logic.py
```

## Features

- **Stateful Games**: Each game maintains its own state and history
- **Input Validation**: Ensures guesses are within valid range
- **Comprehensive History**: Tracks all guesses with timestamps
- **RESTful Design**: Clean, predictable API endpoints
- **Auto Documentation**: Built-in Swagger/OpenAPI docs
- **Error Handling**: Proper HTTP status codes and error messages