# Guess the Number Game 🎮

A beautiful, modern web-based implementation of the classic "Guess the Number" game.

## Features ✨

- **Modern UI**: Clean, gradient-based design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Visual Feedback**: Color-coded hints (too low/too high/correct)
- **Guess History**: Track all your previous guesses
- **Statistics**: View your attempt count and current range
- **Accessibility**: Keyboard support (Enter to submit) and reduced motion support

## How to Play 🎯

1. The game randomly selects a number between 1 and 100
2. Enter your guess in the input field
3. Click "Submit Guess" or press Enter
4. Receive feedback:
   - **Yellow/Orange**: Your guess is too low
   - **Red/Pink**: Your guess is too high
   - **Green**: Congratulations! You guessed correctly!
5. Try to guess the number in as few attempts as possible
6. Click "New Game" to start over

## Running the Game 🚀

### Option 1: Simple HTTP Server (Python)
```bash
python3 -m http.server 8000
```
Then open your browser to: `http://localhost:8000`

### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8000
```
Then open your browser to: `http://localhost:8000`

### Option 3: Direct File Access
Simply open `index.html` in your web browser by double-clicking the file.

## Files 📁

- `index.html` - Main HTML structure
- `styles.css` - Modern styling with animations
- `script.js` - Game logic and interactivity
- `game.py` - Original Python CLI version

## Technologies Used 💻

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins)

## Browser Support 🌐

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Original Python Version 🐍

The original CLI version is available in `game.py`. Run it with:
```bash
python3 game.py
```

---

Enjoy the game! 🎉
