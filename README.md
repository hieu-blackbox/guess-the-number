# Guess the Number Game API

A REST API for the classic "Guess the Number" game built with FastAPI.

## Files

- `game.py` - Original console-based game
- `api.py` - FastAPI REST API implementation
- `requirements.txt` - Python dependencies
- `test_game_logic.py` - Standalone test script
- `README.md` - This documentation

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the API server:
```bash
python3 api.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Create a New Game
**POST** `/games`

Create a new guessing game with optional range parameters.

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

### Make a Guess
**POST** `/games/{game_id}/guess`

Submit a guess for a specific game.

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

**Result values:**
- `too_low` - Guess is lower than the target
- `too_high` - Guess is higher than the target  
- `correct` - Guess matches the target (game won)

### Get Game Status
**GET** `/games/{game_id}`

Get the current status of a game.

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

### Get Game History
**GET** `/games/{game_id}/history`

Get all guesses made for a specific game.

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

### API Information
**GET** `/`

Get welcome message and endpoint information.

## Example Usage

1. **Create a game:**
```bash
curl -X POST "http://localhost:8000/games" \
     -H "Content-Type: application/json" \
     -d '{"min_num": 1, "max_num": 100}'
```

2. **Make a guess:**
```bash
curl -X POST "http://localhost:8000/games/YOUR_GAME_ID/guess" \
     -H "Content-Type: application/json" \
     -d '{"guess": 50}'
```

3. **Check game status:**
```bash
curl "http://localhost:8000/games/YOUR_GAME_ID"
```

4. **View guess history:**
```bash
curl "http://localhost:8000/games/YOUR_GAME_ID/history"
```

## Interactive Documentation

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

## Testing

Run the test script to verify the game logic:
```bash
python3 test_game_logic.py
```

## Features

- ✅ RESTful API design
- ✅ Input validation with Pydantic models
- ✅ Unique game IDs using UUID
- ✅ Game state management
- ✅ Guess history tracking
- ✅ Error handling for invalid games/guesses
- ✅ Interactive API documentation
- ✅ Comprehensive test coverage

## Game Rules

1. Each game generates a random number within the specified range
2. Players submit guesses and receive feedback (too low, too high, or correct)
3. The game tracks the number of attempts
4. Games end when the correct number is guessed
5. All guess history is preserved for each game