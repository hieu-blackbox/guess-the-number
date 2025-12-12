# Guess the Number Game - Web UI

A beautiful, interactive web-based number guessing game built with Flask, HTML, CSS, and JavaScript.

## Features

- 🎯 Three difficulty levels (Easy, Medium, Hard)
- 🎨 Modern, responsive UI with smooth animations
- 📊 Real-time feedback on guesses
- 🏆 Win celebration screen
- 📱 Mobile-friendly design

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Game

1. Start the Flask server:
```bash
python3 app.py
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

## How to Play

1. Choose your difficulty level:
   - **Easy**: Guess a number between 1-50
   - **Medium**: Guess a number between 1-100
   - **Hard**: Guess a number between 1-200

2. Enter your guess and click "Guess" or press Enter

3. Follow the hints:
   - 📉 "Too low" - Try a higher number
   - 📈 "Too high" - Try a lower number
   - 🎉 "Correct" - You win!

4. Try to guess the number in as few attempts as possible!

## Project Structure

```
.
├── app.py              # Flask backend with game logic
├── templates/
│   └── index.html      # Main game interface
├── static/
│   ├── style.css       # Styling and animations
│   └── script.js       # Client-side game logic
├── game.py             # Original CLI version
└── requirements.txt    # Python dependencies
```

## API Endpoints

- `POST /api/start` - Start a new game
- `POST /api/guess` - Make a guess
- `POST /api/reset` - Reset the game

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Design**: Gradient backgrounds, smooth animations, responsive layout
