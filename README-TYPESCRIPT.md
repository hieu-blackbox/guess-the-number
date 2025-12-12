# Guess the Number Game - TypeScript Edition

A beautiful, interactive web-based number guessing game built with **TypeScript**, **Express**, and modern web technologies.

## 🚀 Features

- 🎯 **Three difficulty levels** (Easy: 1-50, Medium: 1-100, Hard: 1-200)
- 🎨 **Modern, responsive UI** with smooth animations
- 📊 **Real-time feedback** on guesses with visual indicators
- 🏆 **Win celebration screen** with confetti animation
- 📱 **Mobile-friendly design** that works on all devices
- 💪 **Fully typed** with TypeScript for type safety
- 🔒 **Session management** for game state persistence

## 🛠️ Tech Stack

### Backend
- **TypeScript** - Type-safe JavaScript
- **Express** - Fast, minimalist web framework
- **express-session** - Session middleware for game state
- **CORS** - Cross-origin resource sharing

### Frontend
- **TypeScript** - Type-safe client-side code
- **HTML5** - Modern semantic markup
- **CSS3** - Gradient backgrounds, animations, flexbox
- **Vanilla JavaScript** (compiled from TypeScript) - No framework dependencies

## 📦 Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Build the project:**
```bash
npm run build
```

This compiles both the server and client TypeScript code.

## 🎮 Running the Game

### Production Mode
```bash
npm start
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

The server will start on **http://localhost:5000**

## 🎯 How to Play

1. **Choose your difficulty level:**
   - 🟢 **Easy**: Guess a number between 1-50
   - 🟡 **Medium**: Guess a number between 1-100
   - 🔴 **Hard**: Guess a number between 1-200

2. **Enter your guess** and click "Guess" or press Enter

3. **Follow the hints:**
   - 📉 "Too low" - Try a higher number
   - 📈 "Too high" - Try a lower number
   - 🎉 "Correct" - You win!

4. **Try to guess the number in as few attempts as possible!**

## 📁 Project Structure

```
.
├── src/
│   ├── server.ts           # Express server with TypeScript
│   ├── types.ts            # Shared TypeScript type definitions
│   ├── client.ts           # Client-side TypeScript code
│   └── public/
│       ├── index.html      # Main game interface
│       ├── css/
│       │   └── style.css   # Styling and animations
│       └── js/
│           └── game.js     # Compiled client code
├── dist/                   # Compiled server code
├── tsconfig.json           # TypeScript config for server
├── tsconfig.client.json    # TypeScript config for client
├── package.json            # Dependencies and scripts
└── README-TYPESCRIPT.md    # This file
```

## 🔧 Available Scripts

- `npm run build` - Build both server and client TypeScript
- `npm run build:server` - Build only server TypeScript
- `npm run build:client` - Build only client TypeScript
- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm run clean` - Remove compiled files

## 🌐 API Endpoints

### POST `/api/start`
Start a new game with specified difficulty.

**Request:**
```json
{
  "min": 1,
  "max": 100
}
```

**Response:**
```json
{
  "success": true,
  "message": "Game started! Guess a number between 1 and 100.",
  "min": 1,
  "max": 100
}
```

### POST `/api/guess`
Make a guess in the current game.

**Request:**
```json
{
  "guess": 50
}
```

**Response:**
```json
{
  "success": true,
  "result": "low",
  "message": "Too low! Try again.",
  "tries": 1
}
```

### POST `/api/reset`
Reset the current game session.

**Response:**
```json
{
  "success": true,
  "message": "Game reset!"
}
```

## 🎨 Design Features

- **Gradient backgrounds** with purple theme
- **Smooth animations** for screen transitions
- **Shake effect** for incorrect guesses
- **Bounce animation** for win celebration
- **Responsive design** for mobile, tablet, and desktop
- **Keyboard support** (Enter key to submit guess)
- **Visual feedback** with color-coded messages

## 🔒 Type Safety

This project uses TypeScript throughout:

- **Shared types** between client and server
- **Type-safe API requests** and responses
- **Compile-time error checking**
- **IntelliSense support** in modern editors
- **Declaration files** for better IDE integration

## 🚀 Deployment

To deploy this application:

1. Build the project: `npm run build`
2. Set environment variables (if needed)
3. Start the server: `npm start`
4. Ensure port 5000 is accessible (or set `PORT` env variable)

## 📝 License

ISC

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy the game! 🎯**
