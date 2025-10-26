# Random Number Game API

A Flask-based REST API that generates random numbers for the guessing game.

## Files

- `game.py` - Original guessing game
- `api.py` - Flask API server
- `test_api.py` - Test script for API logic
- `requirements.txt` - Python dependencies

## Installation

```bash
pip install -r requirements.txt
```

## Running the API

```bash
python api.py
```

The API will start on `http://localhost:5000`

## API Endpoints

### 1. Get Random Number (Query Parameters)
```
GET /api/random-number?min=1&max=100
```

**Parameters:**
- `min` (optional): Minimum value (default: 1)
- `max` (optional): Maximum value (default: 100)

**Example Response:**
```json
{
  "number": 42,
  "min": 1,
  "max": 100
}
```

### 2. Get Random Number (Path Parameters)
```
GET /api/random-number/1/100
```

**Example Response:**
```json
{
  "number": 73,
  "min": 1,
  "max": 100
}
```

### 3. Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "message": "Random Number API is running"
}
```

### 4. API Documentation
```
GET /
```

Returns API documentation with all available endpoints and examples.

## Usage Examples

```bash
# Get random number with default range (1-100)
curl http://localhost:5000/api/random-number

# Get random number with custom range using query params
curl "http://localhost:5000/api/random-number?min=1&max=10"

# Get random number with custom range using path params
curl http://localhost:5000/api/random-number/1/10

# Health check
curl http://localhost:5000/api/health

# API documentation
curl http://localhost:5000/
```

## Testing

Run the test script to verify the random number generation logic:

```bash
python test_api.py
```

## Error Handling

The API handles the following error cases:
- Invalid parameters (non-integer values)
- Minimum value greater than maximum value

Error responses include appropriate HTTP status codes and descriptive error messages.

## Integration with Game

You can modify the original `game.py` to use the API instead of generating random numbers locally. The API provides the same random number generation functionality but through HTTP endpoints.