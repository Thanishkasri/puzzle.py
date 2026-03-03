// Game State
let currentState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

let solution = null;
let currentStepIndex = 0;
let isPlaying = false;
let animationSpeed = 500;

// DOM Elements
const puzzleBoard = document.getElementById('puzzle-board');
const solveBtn = document.getElementById('solve-btn');
const playBtn = document.getElementById('play-btn');
const randomizeBtn = document.getElementById('randomize-btn');
const resetBtn = document.getElementById('reset-btn');
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
const stepsCount = document.getElementById('steps-count');
const currentStepDisplay = document.getElementById('current-step');
const statusDisplay = document.getElementById('status');
const messageDiv = document.getElementById('message');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPuzzle();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    solveBtn.addEventListener('click', solvePuzzle);
    playBtn.addEventListener('click', playSolution);
    randomizeBtn.addEventListener('click', randomizePuzzle);
    resetBtn.addEventListener('click', resetPuzzle);
    
    speedSlider.addEventListener('input', (e) => {
        animationSpeed = parseInt(e.target.value);
        speedValue.textContent = `${animationSpeed}ms`;
    });
}

// Render Puzzle
function renderPuzzle() {
    puzzleBoard.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tile = document.createElement('div');
            const value = currentState[i][j];
            
            if (value === 0) {
                tile.className = 'tile tile-empty';
            } else {
                tile.className = 'tile tile-number';
                tile.textContent = value;
                tile.addEventListener('click', () => moveTile(i, j));
            }
            
            tile.dataset.row = i;
            tile.dataset.col = j;
            puzzleBoard.appendChild(tile);
        }
    }
}

// Move Tile (Manual Play)
function moveTile(row, col) {
    if (isPlaying) return;
    
    const emptyPos = findEmpty();
    const distance = Math.abs(row - emptyPos.row) + Math.abs(col - emptyPos.col);
    
    if (distance === 1) {
        // Swap tiles
        currentState[emptyPos.row][emptyPos.col] = currentState[row][col];
        currentState[row][col] = 0;
        renderPuzzle();
        
        // Check if solved
        if (isPuzzleSolved()) {
            showMessage('🎉 Congratulations! You solved the puzzle!', 'success');
            updateStatus('Solved!', 'status-solved');
        }
    }
}

// Find Empty Tile Position
function findEmpty() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (currentState[i][j] === 0) {
                return { row: i, col: j };
            }
        }
    }
}

// Check if Puzzle is Solved
function isPuzzleSolved() {
    const goal = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (currentState[i][j] !== goal[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Randomize Puzzle
function randomizePuzzle() {
    if (isPlaying) return;
    
    // Create a solvable random puzzle by making random moves from goal state
    currentState = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ];
    
    // Make 50 random valid moves
    for (let i = 0; i < 50; i++) {
        const emptyPos = findEmpty();
        const possibleMoves = [];
        
        // Check all four directions
        const directions = [
            { row: -1, col: 0 },
            { row: 1, col: 0 },
            { row: 0, col: -1 },
            { row: 0, col: 1 }
        ];
        
        for (const dir of directions) {
            const newRow = emptyPos.row + dir.row;
            const newCol = emptyPos.col + dir.col;
            
            if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
                possibleMoves.push({ row: newRow, col: newCol });
            }
        }
        
        // Pick a random move
        const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        currentState[emptyPos.row][emptyPos.col] = currentState[move.row][move.col];
        currentState[move.row][move.col] = 0;
    }
    
    renderPuzzle();
    solution = null;
    playBtn.disabled = true;
    stepsCount.textContent = '-';
    currentStepDisplay.textContent = '0';
    updateStatus('Ready', 'status-ready');
    showMessage('Puzzle randomized! Click "Solve Puzzle" to find the solution.', 'info');
}

// Reset Puzzle
function resetPuzzle() {
    if (isPlaying) return;
    
    currentState = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ];
    
    renderPuzzle();
    solution = null;
    playBtn.disabled = true;
    stepsCount.textContent = '-';
    currentStepDisplay.textContent = '0';
    updateStatus('Ready', 'status-ready');
    showMessage('Puzzle reset to goal state.', 'info');
}

// Solve Puzzle
async function solvePuzzle() {
    if (isPlaying) return;
    
    if (isPuzzleSolved()) {
        showMessage('Puzzle is already solved!', 'info');
        return;
    }
    
    loadingOverlay.classList.add('active');
    updateStatus('Solving...', 'status-solving');
    
    try {
        const response = await fetch('/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                initial_state: currentState,
                goal_state: [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            solution = data.solution;
            stepsCount.textContent = data.steps;
            currentStepIndex = 0;
            playBtn.disabled = false;
            updateStatus('Solved!', 'status-solved');
            showMessage(`✨ Solution found in ${data.steps} steps! Click "Play Solution" to watch.`, 'success');
        } else {
            showMessage('❌ ' + (data.message || 'No solution found'), 'error');
            updateStatus('No Solution', 'status-error');
        }
    } catch (error) {
        showMessage('❌ Error: ' + error.message, 'error');
        updateStatus('Error', 'status-error');
    } finally {
        loadingOverlay.classList.remove('active');
    }
}

// Play Solution
async function playSolution() {
    if (!solution || isPlaying) return;
    
    isPlaying = true;
    playBtn.disabled = true;
    solveBtn.disabled = true;
    randomizeBtn.disabled = true;
    resetBtn.disabled = true;
    updateStatus('Playing...', 'status-solving');
    
    for (let i = 0; i < solution.length; i++) {
        currentState = solution[i];
        currentStepDisplay.textContent = i;
        renderPuzzle();
        
        // Highlight the moved tile
        if (i > 0) {
            highlightChangedTile(solution[i - 1], solution[i]);
        }
        
        await sleep(animationSpeed);
    }
    
    isPlaying = false;
    playBtn.disabled = false;
    solveBtn.disabled = false;
    randomizeBtn.disabled = false;
    resetBtn.disabled = false;
    updateStatus('Completed!', 'status-solved');
    showMessage('🎉 Solution playback complete!', 'success');
}

// Highlight Changed Tile
function highlightChangedTile(prevState, currState) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (prevState[i][j] !== currState[i][j] && currState[i][j] !== 0) {
                const tiles = puzzleBoard.querySelectorAll('.tile');
                const index = i * 3 + j;
                tiles[index].classList.add('tile-highlight');
                
                setTimeout(() => {
                    tiles[index].classList.remove('tile-highlight');
                }, animationSpeed);
                
                return;
            }
        }
    }
}

// Utility Functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    // Auto-hide after 5 seconds for info messages
    if (type === 'info') {
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 5000);
    }
}

function updateStatus(text, className) {
    statusDisplay.textContent = text;
    statusDisplay.className = `stat-value ${className}`;
}
