from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import random
import uuid
from datetime import datetime

app = FastAPI(title="Guess the Number Game API", version="1.0.0")

# Pydantic Models
class CreateGameRequest(BaseModel):
    min_num: int = Field(default=1, ge=1, description="Minimum number in range")
    max_num: int = Field(default=100, ge=1, description="Maximum number in range")
    
    def model_post_init(self, __context):
        if self.min_num >= self.max_num:
            raise ValueError("min_num must be less than max_num")

class GuessRequest(BaseModel):
    guess: int = Field(description="Your guess for the number")

class GuessResponse(BaseModel):
    game_id: str
    guess: int
    result: str  # "too_low", "too_high", "correct"
    message: str
    tries: int
    game_status: str  # "active", "won"

class GameStatus(BaseModel):
    game_id: str
    min_num: int
    max_num: int
    tries: int
    game_status: str
    created_at: datetime

class GuessHistory(BaseModel):
    guess: int
    result: str
    message: str
    timestamp: datetime

class GameHistoryResponse(BaseModel):
    game_id: str
    guesses: List[GuessHistory]

class CreateGameResponse(BaseModel):
    game_id: str
    min_num: int
    max_num: int
    message: str

# In-memory game storage
games = {}

class Game:
    def __init__(self, min_num: int, max_num: int):
        self.game_id = str(uuid.uuid4())
        self.min_num = min_num
        self.max_num = max_num
        self.target_number = random.randint(min_num, max_num)
        self.tries = 0
        self.status = "active"
        self.guesses = []
        self.created_at = datetime.now()
    
    def make_guess(self, guess: int) -> GuessResponse:
        if self.status != "active":
            raise HTTPException(status_code=400, detail="Game is already finished")
        
        if guess < self.min_num or guess > self.max_num:
            raise HTTPException(
                status_code=400, 
                detail=f"Guess must be between {self.min_num} and {self.max_num}"
            )
        
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
        guess_history = GuessHistory(
            guess=guess,
            result=result,
            message=message,
            timestamp=datetime.now()
        )
        self.guesses.append(guess_history)
        
        return GuessResponse(
            game_id=self.game_id,
            guess=guess,
            result=result,
            message=message,
            tries=self.tries,
            game_status=self.status
        )

# API Endpoints
@app.post("/games", response_model=CreateGameResponse)
async def create_game(request: CreateGameRequest):
    """Create a new guess the number game"""
    game = Game(request.min_num, request.max_num)
    games[game.game_id] = game
    
    return CreateGameResponse(
        game_id=game.game_id,
        min_num=game.min_num,
        max_num=game.max_num,
        message=f"New game created! Guess a number between {game.min_num} and {game.max_num}."
    )

@app.post("/games/{game_id}/guess", response_model=GuessResponse)
async def make_guess(game_id: str, request: GuessRequest):
    """Make a guess for a specific game"""
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    
    game = games[game_id]
    return game.make_guess(request.guess)

@app.get("/games/{game_id}", response_model=GameStatus)
async def get_game_status(game_id: str):
    """Get the current status of a game"""
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    
    game = games[game_id]
    return GameStatus(
        game_id=game.game_id,
        min_num=game.min_num,
        max_num=game.max_num,
        tries=game.tries,
        game_status=game.status,
        created_at=game.created_at
    )

@app.get("/games/{game_id}/history", response_model=GameHistoryResponse)
async def get_game_history(game_id: str):
    """Get the guess history for a specific game"""
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    
    game = games[game_id]
    return GameHistoryResponse(
        game_id=game.game_id,
        guesses=game.guesses
    )

@app.get("/")
async def root():
    """Welcome message and API information"""
    return {
        "message": "Welcome to the Guess the Number Game API!",
        "endpoints": {
            "POST /games": "Create a new game",
            "POST /games/{game_id}/guess": "Make a guess",
            "GET /games/{game_id}": "Get game status",
            "GET /games/{game_id}/history": "Get guess history"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)