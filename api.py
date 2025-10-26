from flask import Flask, jsonify, request
import random

app = Flask(__name__)

@app.route('/api/random-number', methods=['GET'])
def get_random_number():
    """
    Returns a random number within the specified range.
    Query parameters:
    - min: minimum value (default: 1)
    - max: maximum value (default: 100)
    """
    try:
        min_num = int(request.args.get('min', 1))
        max_num = int(request.args.get('max', 100))
        
        if min_num > max_num:
            return jsonify({
                'error': 'Minimum value cannot be greater than maximum value'
            }), 400
        
        random_number = random.randint(min_num, max_num)
        
        return jsonify({
            'number': random_number,
            'min': min_num,
            'max': max_num
        })
    
    except ValueError:
        return jsonify({
            'error': 'Invalid parameters. Min and max must be integers.'
        }), 400

@app.route('/api/random-number/<int:min_num>/<int:max_num>', methods=['GET'])
def get_random_number_with_path(min_num, max_num):
    """
    Returns a random number within the specified range using path parameters.
    Path parameters:
    - min_num: minimum value
    - max_num: maximum value
    """
    if min_num > max_num:
        return jsonify({
            'error': 'Minimum value cannot be greater than maximum value'
        }), 400
    
    random_number = random.randint(min_num, max_num)
    
    return jsonify({
        'number': random_number,
        'min': min_num,
        'max': max_num
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Random Number API is running'
    })

@app.route('/', methods=['GET'])
def home():
    """API documentation"""
    return jsonify({
        'message': 'Random Number Game API',
        'endpoints': {
            'GET /api/random-number': 'Get random number with query params ?min=1&max=100',
            'GET /api/random-number/<min>/<max>': 'Get random number with path params',
            'GET /api/health': 'Health check endpoint'
        },
        'examples': {
            'default_range': '/api/random-number',
            'custom_range_query': '/api/random-number?min=1&max=10',
            'custom_range_path': '/api/random-number/1/10'
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)