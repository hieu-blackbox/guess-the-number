# 🎯 Guess the Number Game

A beautiful, modern web-based implementation of the classic "Guess the Number" game with an intuitive UI and smooth animations.

## Features

- **Beautiful Modern UI**: Clean, gradient-based design with smooth animations
- **Multiple Difficulty Levels**: 
  - Easy (1-50)
  - Medium (1-100)
  - Hard (1-500)
  - Expert (1-1000)
- **Game Statistics**: Track your tries and best score
- **Guess History**: Visual history of all your guesses with color coding
- **Smart Feedback**: Real-time feedback with animations (too high/too low)
- **Persistent Best Score**: Your best score is saved in browser localStorage
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Input Validation**: Prevents invalid inputs and guides users
- **Keyboard Support**: Press Enter to submit guesses

## How to Play

1. Open `index.html` in your web browser
2. Choose your difficulty level
3. Enter a number in the input field
4. Click "Submit Guess" or press Enter
5. Follow the feedback to adjust your next guess
6. Try to guess the number in as few tries as possible!

## Running the Game

### Option 1: Direct File Open
Simply open `index.html` in any modern web browser.

### Option 2: Local Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server

# Then open http://localhost:8000 in your browser
```

## Files

- `index.html` - Main HTML structure
- `styles.css` - Modern CSS styling with animations
- `game.js` - Game logic and interactivity
- `game.py` - Original Python CLI version

## Technologies Used

- HTML5
- CSS3 (Gradients, Animations, Flexbox, Grid)
- Vanilla JavaScript (ES6+ Classes)
- LocalStorage API for persistent data

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Game Logic

The game generates a random number within the selected range and provides feedback after each guess:
- **Too Low**: Your guess is below the target number
- **Too High**: Your guess is above the target number
- **Correct**: You've guessed the number!

Your tries are counted, and if you beat your previous best score, it's automatically saved.

Enjoy the game! 🎮
