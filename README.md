# 8-Puzzle Solver Web Application

A beautiful, interactive web application that solves the classic 8-puzzle game using the A* search algorithm with Manhattan distance heuristic.

## ✨ Features

- **🎨 Premium UI Design**: Modern dark theme with gradients, animations, and glassmorphism effects
- **🤖 AI-Powered Solver**: Uses A* search algorithm to find optimal solutions
- **🎮 Interactive Gameplay**: Click tiles to manually solve or let the AI do it for you
- **📊 Real-time Statistics**: Track steps, current state, and solution progress
- **⚡ Animated Solutions**: Watch the solution playback with adjustable speed
- **🎲 Random Puzzles**: Generate solvable random puzzles with one click
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Application**
   ```bash
   python app.py
   ```

3. **Open in Browser**
   Navigate to: `http://127.0.0.1:5000`

## 🎯 How to Use

1. **Randomize Puzzle**: Click the "Randomize Puzzle" button to create a random solvable puzzle
2. **Manual Play**: Click on tiles adjacent to the empty space to move them
3. **Solve Automatically**: Click "Solve Puzzle" to let the AI find the optimal solution
4. **Watch Solution**: Click "Play Solution" to see an animated playback of the solution
5. **Adjust Speed**: Use the speed slider to control animation speed (100ms - 2000ms)
6. **Reset**: Click "Reset to Goal" to return to the solved state

## 📁 Project Structure

```
8 puzzle game/
├── app.py              # Flask backend server
├── astar.py            # A* search algorithm implementation
├── puzzle.py           # Puzzle class with game logic
├── heuristic.py        # Manhattan distance heuristic
├── main.py             # Original CLI version
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html      # Main HTML template
└── static/
    ├── style.css       # Premium CSS styling
    └── script.js       # Interactive JavaScript
```

## 🔧 API Endpoints

### POST /solve
Solves the puzzle using A* algorithm.

**Request Body:**
```json
{
  "initial_state": [[1,2,3],[4,0,6],[7,5,8]],
  "goal_state": [[1,2,3],[4,5,6],[7,8,0]]
}
```

**Response:**
```json
{
  "success": true,
  "solution": [/* array of states */],
  "steps": 3
}
```

### POST /validate
Validates if a puzzle state is valid.

**Request Body:**
```json
{
  "state": [[1,2,3],[4,5,6],[7,8,0]]
}
```

**Response:**
```json
{
  "valid": true
}
```

## 🧠 Algorithm Details

### A* Search Algorithm
- **Heuristic**: Manhattan distance (sum of distances each tile is from its goal position)
- **Optimality**: Guarantees finding the shortest solution path
- **Efficiency**: Uses priority queue to explore most promising states first

### Manhattan Distance
For each tile, calculates the sum of:
- Horizontal distance from current position to goal position
- Vertical distance from current position to goal position

## 🎨 Design Features

- **Dark Mode Theme**: Easy on the eyes with vibrant accent colors
- **Smooth Animations**: Micro-animations for enhanced user experience
- **Gradient Backgrounds**: Modern gradient overlays and button styles
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Responsive Layout**: Adapts to different screen sizes
- **Interactive Feedback**: Hover effects, active states, and visual feedback

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify `app.py`:
```python
app.run(debug=True, port=5001)  # Change to any available port
```

### Module Not Found
Make sure all dependencies are installed:
```bash
pip install -r requirements.txt
```

### Puzzle Not Solvable
The randomize function ensures all generated puzzles are solvable. If you manually create a puzzle, not all configurations are solvable.

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- A* algorithm implementation based on classic AI search techniques
- UI design inspired by modern web design trends
- Built with Flask, HTML5, CSS3, and Vanilla JavaScript

---

**Enjoy solving puzzles! 🧩✨**
