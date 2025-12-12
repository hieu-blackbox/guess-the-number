let currentMin = 1;
let currentMax = 100;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

async function startGame(min, max) {
    currentMin = min;
    currentMax = max;
    
    try {
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ min, max })
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('range-display').textContent = `Range: ${min} - ${max}`;
            document.getElementById('tries-display').textContent = 'Tries: 0';
            document.getElementById('feedback').textContent = '';
            document.getElementById('feedback').className = 'feedback';
            document.getElementById('guess-input').value = '';
            document.getElementById('guess-input').min = min;
            document.getElementById('guess-input').max = max;
            showScreen('game-screen');
            document.getElementById('guess-input').focus();
        }
    } catch (error) {
        console.error('Error starting game:', error);
        showFeedback('Error starting game. Please try again.', 'error');
    }
}

async function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value;
    
    if (!guess) {
        showFeedback('Please enter a number!', 'error');
        return;
    }
    
    const guessNum = parseInt(guess);
    if (guessNum < currentMin || guessNum > currentMax) {
        showFeedback(`Please enter a number between ${currentMin} and ${currentMax}!`, 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess: guessNum })
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('tries-display').textContent = `Tries: ${data.tries}`;
            
            if (data.result === 'correct') {
                document.getElementById('win-message').textContent = `Congratulations! 🎊`;
                document.getElementById('win-tries').textContent = `You guessed the number ${data.number} in ${data.tries} ${data.tries === 1 ? 'try' : 'tries'}!`;
                showScreen('win-screen');
                createConfetti();
            } else if (data.result === 'low') {
                showFeedback('📉 Too low! Try a higher number.', 'low');
                guessInput.value = '';
                guessInput.focus();
            } else if (data.result === 'high') {
                showFeedback('📈 Too high! Try a lower number.', 'high');
                guessInput.value = '';
                guessInput.focus();
            }
        } else {
            showFeedback(data.message, 'error');
        }
    } catch (error) {
        console.error('Error making guess:', error);
        showFeedback('Error making guess. Please try again.', 'error');
    }
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

async function resetGame() {
    try {
        await fetch('/api/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        showScreen('setup-screen');
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        makeGuess();
    }
}

// Particle animation
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Confetti animation
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#11998e', '#38ef7d', '#fa709a', '#fee140'];
    const confettiCount = 100;
    const container = document.getElementById('confetti');
    
    if (!container) return;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add input animation
function addInputFeedback() {
    const input = document.getElementById('guess-input');
    if (!input) return;
    
    input.addEventListener('input', function() {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
}

// Initialize the game on page load
window.addEventListener('load', () => {
    showScreen('setup-screen');
    initParticles();
    addInputFeedback();
});
