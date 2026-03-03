from puzzle import Puzzle
from astar import astar_search

# Initial and Goal State
initial_state = [
    [1, 2, 3],
    [4, 0, 6],
    [7, 5, 8]
]

goal_state = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]

puzzle = Puzzle(initial_state, goal_state)
solution = astar_search(puzzle)

if solution:
    print("Solution Found!\n")
    for step in solution:
        for row in step:
            print(row)
        print("-----")
else:
    print("No solution found")
