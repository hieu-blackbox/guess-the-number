# Guess the Number Game - Web UI

A beautiful, modern web-based version of the classic "Guess the Number" game built with Flask, HTML, CSS, and JavaScript.

## Features

- 🎯 Interactive web interface with modern design
- 🎨 Beautiful gradient UI with smooth animations
- 📊 Real-time attempt tracking
- 🔄 Customizable number range (min/max)
- 📱 Fully responsive design for all devices
- ✨ Visual feedback for guesses (too high/low/correct)
- 🎮 Easy game reset and restart functionality

## Installation

1. Install Flask:
```bash
python3 -m pip install flask
```

## Running the Game

1. Start the Flask server:
```bash
python3 app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Play the game:
   - Set your desired number range (default: 1-100)
   - Click "Start New Game"
   - Enter your guesses and get instant feedback
   - Try to guess the number in as few attempts as possible!

## Project Structure

```
.
├── app.py                 # Flask backend with game logic
├── game.py               # Original CLI version
├── templates/
│   └── index.html        # Main game interface
├── static/
│   ├── style.css         # Modern styling and animations
│   └── script.js         # Frontend game logic
└── README.md             # This file
```

## API Endpoints

- `GET /` - Main game page
- `POST /start` - Start a new game with custom range
- `POST /guess` - Submit a guess
- `POST /reset` - Reset the game

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Design**: Modern gradient UI with animations
- **Session Management**: Flask sessions for game state

## Game Rules

1. The computer randomly selects a number within your chosen range
2. You make guesses to find the number
3. After each guess, you'll receive feedback:
   - 📈 "Too low!" - Guess higher
   - 📉 "Too high!" - Guess lower
   - ✅ "Correct!" - You won!
4. Try to guess the number in as few attempts as possible

Enjoy the game! 🎮
