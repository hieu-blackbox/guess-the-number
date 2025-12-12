export interface GameState {
  numberToGuess: number;
  tries: number;
  minNum: number;
  maxNum: number;
  gameOver: boolean;
}

export interface StartGameRequest {
  min?: number;
  max?: number;
}

export interface StartGameResponse {
  success: boolean;
  message: string;
  min: number;
  max: number;
}

export interface GuessRequest {
  guess: number;
}

export interface GuessResponse {
  success: boolean;
  result?: 'low' | 'high' | 'correct';
  message: string;
  tries: number;
  number?: number;
}

export interface ResetResponse {
  success: boolean;
  message: string;
}

declare module 'express-session' {
  interface SessionData {
    gameState?: GameState;
  }
}
