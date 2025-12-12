import express, { Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import {
  StartGameRequest,
  StartGameResponse,
  GuessRequest,
  GuessResponse,
  ResetResponse,
  GameState
} from './types';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: 'guess-the-number-secret-key-2024',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Serve static files from src/public (since we don't copy them to dist)
const publicPath = path.join(__dirname, '..', 'src', 'public');
app.use(express.static(publicPath));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start game endpoint
app.post('/api/start', (req: Request<{}, StartGameResponse, StartGameRequest>, res: Response<StartGameResponse>) => {
  const { min = 1, max = 100 } = req.body;
  
  const numberToGuess = Math.floor(Math.random() * (max - min + 1)) + min;
  
  const gameState: GameState = {
    numberToGuess,
    tries: 0,
    minNum: min,
    maxNum: max,
    gameOver: false
  };
  
  req.session.gameState = gameState;
  
  res.json({
    success: true,
    message: `Game started! Guess a number between ${min} and ${max}.`,
    min,
    max
  });
});

// Make guess endpoint
app.post('/api/guess', (req: Request<{}, GuessResponse, GuessRequest>, res: Response<GuessResponse>) => {
  const gameState = req.session.gameState;
  
  if (!gameState) {
    return res.json({
      success: false,
      message: 'Please start a new game first!',
      tries: 0
    });
  }
  
  if (gameState.gameOver) {
    return res.json({
      success: false,
      message: 'Game is over! Start a new game.',
      tries: gameState.tries
    });
  }
  
  const { guess } = req.body;
  
  if (guess === undefined || guess === null) {
    return res.json({
      success: false,
      message: 'Please provide a guess!',
      tries: gameState.tries
    });
  }
  
  const guessNum = Number(guess);
  
  if (isNaN(guessNum)) {
    return res.json({
      success: false,
      message: 'Please enter a valid number!',
      tries: gameState.tries
    });
  }
  
  gameState.tries++;
  req.session.gameState = gameState;
  
  if (guessNum < gameState.numberToGuess) {
    return res.json({
      success: true,
      result: 'low',
      message: 'Too low! Try again.',
      tries: gameState.tries
    });
  } else if (guessNum > gameState.numberToGuess) {
    return res.json({
      success: true,
      result: 'high',
      message: 'Too high! Try again.',
      tries: gameState.tries
    });
  } else {
    gameState.gameOver = true;
    req.session.gameState = gameState;
    
    return res.json({
      success: true,
      result: 'correct',
      message: `Congratulations! You guessed the number ${gameState.numberToGuess} in ${gameState.tries} tries!`,
      tries: gameState.tries,
      number: gameState.numberToGuess
    });
  }
});

// Reset game endpoint
app.post('/api/reset', (req: Request, res: Response<ResetResponse>) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Error resetting game'
      });
    }
    
    res.json({
      success: true,
      message: 'Game reset!'
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎯 Guess the Number game server running on http://localhost:${PORT}`);
  console.log(`📝 TypeScript version with Express and session management`);
});

export default app;
