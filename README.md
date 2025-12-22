# Guess the Number Game

A beautiful, modern web-based implementation of the classic "Guess the Number" game with an elegant dark-themed UI.

## Features

- 🎮 Interactive number guessing game (1-100)
- 🎨 Modern, responsive dark-themed UI
- 📊 Real-time statistics tracking (tries, range)
- 📝 Visual guess history with color-coded feedback
- ✨ Smooth animations and transitions
- 📱 Fully responsive design (mobile, tablet, desktop)
- ♿ Accessible design with proper focus states
- 🎯 Input validation and duplicate guess detection

## How to Play

1. The game randomly selects a number between 1 and 100
2. Enter your guess in the input field
3. Click "Guess" or press Enter
4. Receive feedback:
   - **Too Low** (Orange): Your guess is lower than the target
   - **Too High** (Red): Your guess is higher than the target
   - **Correct** (Green): You found the number!
5. Track your progress with the tries counter and guess history
6. Click "New Game" to start over

## Running the Game

### Option 1: Simple HTTP Server (Python)
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8000
```
Then open http://localhost:8000 in your browser.

### Option 3: Direct File Access
Simply open `index.html` in your web browser.

## Files

- `index.html` - Main HTML structure
- `style.css` - Modern CSS styling with animations
- `game.js` - Game logic and interactivity
- `game.py` - Original Python CLI version

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+ Classes)
- Google Fonts (Poppins)

## Design Features

- **Color Scheme**: Dark theme with indigo accent colors
- **Typography**: Poppins font family for modern aesthetics
- **Animations**: Smooth transitions, shake effects, celebration animations
- **Responsive**: Breakpoints at 600px and 400px for mobile devices
- **Accessibility**: Proper focus states, semantic HTML, ARIA-friendly

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License

Free to use and modify.
