# Guess the Number Game 🎮

A beautiful, modern web-based implementation of the classic "Guess the Number" game with an intuitive UI and smooth animations.

## Features ✨

- **Modern UI Design**: Clean, gradient-based design with smooth animations
- **Interactive Gameplay**: Real-time feedback on each guess
- **Guess History**: Visual tracking of all your previous guesses
- **Statistics**: Track your attempts and current range
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Input Validation**: Prevents invalid inputs and duplicate guesses
- **Animations**: Smooth transitions, shake effects for errors, and pulse effects for success

## How to Play 🎯

1. The game randomly selects a number between 1 and 100
2. Enter your guess in the input field
3. Click "Submit Guess" or press Enter
4. The game will tell you if your guess is too low, too high, or correct
5. Keep guessing until you find the correct number
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
Simply open `index.html` in your web browser.

## Files 📁

- `index.html` - Main HTML structure
- `styles.css` - Modern CSS styling with animations
- `script.js` - Game logic and interactivity
- `game.py` - Original Python CLI version

## Technologies Used 💻

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins)

## Game Features in Detail 🎨

### Visual Feedback
- **Too Low**: Pink/red gradient feedback
- **Too High**: Orange/yellow gradient feedback
- **Correct**: Green gradient with celebration message
- **Error**: Red gradient for invalid inputs

### Animations
- Slide-in animation on page load
- Shake animation for invalid inputs
- Pulse animation for successful guess
- Pop-in animation for guess history items

### Responsive Design
- Optimized for screens from 320px to 4K
- Touch-friendly buttons and inputs
- Adaptive font sizes and spacing

## Browser Compatibility 🌐

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License 📄

Free to use and modify for personal and commercial projects.

---

Enjoy the game! 🎉
