class Puzzle:
    def __init__(self, start, goal):
        self.start = start
        self.goal = goal

    def get_blank_pos(self, state):
        for i in range(3):
            for j in range(3):
                if state[i][j] == 0:
                    return i, j

    def get_neighbors(self, state):
        neighbors = []
        x, y = self.get_blank_pos(state)
        moves = [(-1,0), (1,0), (0,-1), (0,1)]

        for dx, dy in moves:
            nx, ny = x + dx, y + dy
            if 0 <= nx < 3 and 0 <= ny < 3:
                new_state = [row[:] for row in state]
                new_state[x][y], new_state[nx][ny] = new_state[nx][ny], new_state[x][y]
                neighbors.append(new_state)

        return neighbors
