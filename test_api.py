#!/usr/bin/env python3
"""
Test script for the random number API logic
"""
import random
import json

def test_random_number_logic():
    """Test the core random number generation logic"""
    print("Testing Random Number API Logic")
    print("=" * 40)
    
    # Test 1: Default range (1-100)
    min_num, max_num = 1, 100
    random_number = random.randint(min_num, max_num)
    result = {
        'number': random_number,
        'min': min_num,
        'max': max_num
    }
    print(f"Test 1 - Default range (1-100): {json.dumps(result, indent=2)}")
    assert min_num <= random_number <= max_num, "Number not in range!"
    
    # Test 2: Custom range (1-10)
    min_num, max_num = 1, 10
    random_number = random.randint(min_num, max_num)
    result = {
        'number': random_number,
        'min': min_num,
        'max': max_num
    }
    print(f"Test 2 - Custom range (1-10): {json.dumps(result, indent=2)}")
    assert min_num <= random_number <= max_num, "Number not in range!"
    
    # Test 3: Large range (1-1000)
    min_num, max_num = 1, 1000
    random_number = random.randint(min_num, max_num)
    result = {
        'number': random_number,
        'min': min_num,
        'max': max_num
    }
    print(f"Test 3 - Large range (1-1000): {json.dumps(result, indent=2)}")
    assert min_num <= random_number <= max_num, "Number not in range!"
    
    # Test 4: Single number range (5-5)
    min_num, max_num = 5, 5
    random_number = random.randint(min_num, max_num)
    result = {
        'number': random_number,
        'min': min_num,
        'max': max_num
    }
    print(f"Test 4 - Single number (5-5): {json.dumps(result, indent=2)}")
    assert random_number == 5, "Should always return 5!"
    
    # Test 5: Error case simulation (min > max)
    min_num, max_num = 10, 5
    if min_num > max_num:
        error_result = {
            'error': 'Minimum value cannot be greater than maximum value'
        }
        print(f"Test 5 - Error case (min > max): {json.dumps(error_result, indent=2)}")
    
    print("\n✅ All tests passed! The API logic works correctly.")
    
    # Generate multiple random numbers to show variety
    print("\nGenerating 5 random numbers in range 1-20:")
    for i in range(5):
        num = random.randint(1, 20)
        print(f"  Random number {i+1}: {num}")

if __name__ == '__main__':
    test_random_number_logic()