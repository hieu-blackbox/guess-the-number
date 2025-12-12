from flask import Flask, render_template, request, jsonify, session
import random
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/start', methods=['POST'])
def start_game():
    data = request.json
    min_num = data.get('min', 1)
    max_num = data.get('max', 100)
    
    session['number_to_guess'] = random.randint(min_num, max_num)
    session['tries'] = 0
    session['min_num'] = min_num
    session['max_num'] = max_num
    session['game_over'] = False
    
    return jsonify({
        'success': True,
        'message': f'Game started! Guess a number between {min_num} and {max_num}.',
        'min': min_num,
        'max': max_num
    })

@app.route('/api/guess', methods=['POST'])
def make_guess():
    if 'number_to_guess' not in session:
        return jsonify({'success': False, 'message': 'Please start a new game first!'})
    
    if session.get('game_over'):
        return jsonify({'success': False, 'message': 'Game is over! Start a new game.'})
    
    data = request.json
    guess = data.get('guess')
    
    if guess is None:
        return jsonify({'success': False, 'message': 'Please provide a guess!'})
    
    try:
        guess = int(guess)
    except ValueError:
        return jsonify({'success': False, 'message': 'Please enter a valid number!'})
    
    number_to_guess = session['number_to_guess']
    session['tries'] += 1
    tries = session['tries']
    
    if guess < number_to_guess:
        return jsonify({
            'success': True,
            'result': 'low',
            'message': 'Too low! Try again.',
            'tries': tries
        })
    elif guess > number_to_guess:
        return jsonify({
            'success': True,
            'result': 'high',
            'message': 'Too high! Try again.',
            'tries': tries
        })
    else:
        session['game_over'] = True
        return jsonify({
            'success': True,
            'result': 'correct',
            'message': f'Congratulations! You guessed the number {number_to_guess} in {tries} tries!',
            'tries': tries,
            'number': number_to_guess
        })

@app.route('/api/reset', methods=['POST'])
def reset_game():
    session.clear()
    return jsonify({'success': True, 'message': 'Game reset!'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
