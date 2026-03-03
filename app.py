from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from puzzle import Puzzle
from astar import astar_search

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    try:
        data = request.json
        initial_state = data.get('initial_state')
        goal_state = data.get('goal_state', [[1, 2, 3], [4, 5, 6], [7, 8, 0]])
        
        if not initial_state:
            return jsonify({'error': 'Initial state is required'}), 400
        
        puzzle = Puzzle(initial_state, goal_state)
        solution = astar_search(puzzle)
        
        if solution:
            return jsonify({
                'success': True,
                'solution': solution,
                'steps': len(solution) - 1
            })
        else:
            return jsonify({
                'success': False,
                'message': 'No solution found'
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/validate', methods=['POST'])
def validate():
    try:
        data = request.json
        state = data.get('state')
        
        # Check if state has all numbers 0-8
        flat = [num for row in state for num in row]
        if sorted(flat) != list(range(9)):
            return jsonify({'valid': False, 'message': 'State must contain numbers 0-8 exactly once'})
        
        return jsonify({'valid': True})
    except Exception as e:
        return jsonify({'valid': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
