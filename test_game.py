import unittest
from unittest.mock import patch
import io
import sys
import random

# Import the game module
import game


class TestGuessTheNumber(unittest.TestCase):
    
    @patch('builtins.input', side_effect=['50', '75', '88', '94', '91'])
    @patch('random.randint', return_value=91)
    def test_game_completion(self, mock_random, mock_input):
        """Test that the game completes successfully with correct guesses"""
        captured_output = io.StringIO()
        sys.stdout = captured_output
        
        game.guess_the_number(1, 100)
        
        sys.stdout = sys.__stdout__
        output = captured_output.getvalue()
        
        # Check welcome message
        self.assertIn("Welcome to the Guess the Number game!", output)
        self.assertIn("between 1 and 100", output)
        
        # Check feedback messages
        self.assertIn("Too low!", output)
        self.assertIn("Too high!", output)
        
        # Check success message
        self.assertIn("Congratulations!", output)
        self.assertIn("91", output)
        self.assertIn("5 tries", output)
    
    @patch('builtins.input', side_effect=['42'])
    @patch('random.randint', return_value=42)
    def test_first_guess_correct(self, mock_random, mock_input):
        """Test winning on the first guess"""
        captured_output = io.StringIO()
        sys.stdout = captured_output
        
        game.guess_the_number(1, 100)
        
        sys.stdout = sys.__stdout__
        output = captured_output.getvalue()
        
        # Should win in 1 try
        self.assertIn("Congratulations!", output)
        self.assertIn("42", output)
        self.assertIn("1 tries", output)
        
        # Should not have "Too low" or "Too high" messages
        self.assertNotIn("Too low!", output)
        self.assertNotIn("Too high!", output)
    
    @patch('builtins.input', side_effect=['10', '20', '15'])
    @patch('random.randint', return_value=15)
    def test_multiple_guesses(self, mock_random, mock_input):
        """Test game with multiple guesses"""
        captured_output = io.StringIO()
        sys.stdout = captured_output
        
        game.guess_the_number(1, 100)
        
        sys.stdout = sys.__stdout__
        output = captured_output.getvalue()
        
        # Check that feedback is given correctly
        self.assertIn("Too low!", output)
        self.assertIn("Too high!", output)
        self.assertIn("Congratulations!", output)
        self.assertIn("3 tries", output)


if __name__ == '__main__':
    print("Running automated tests for game.py...\n")
    unittest.main(verbosity=2)
