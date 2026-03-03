from heuristic import manhattan_distance
import heapq

def astar_search(puzzle):
    """
    A* search algorithm to solve the 8-puzzle
    """
    start = tuple(map(tuple, puzzle.start))
    goal = tuple(map(tuple, puzzle.goal))
    
    # Priority queue: (f_score, g_score, state, path)
    open_set = [(0, 0, start, [start])]
    closed_set = set()
    
    while open_set:
        f_score, g_score, current, path = heapq.heappop(open_set)
        
        if current == goal:
            return [list(map(list, state)) for state in path]
        
        if current in closed_set:
            continue
            
        closed_set.add(current)
        
        # Get neighbors
        current_list = list(map(list, current))
        neighbors = puzzle.get_neighbors(current_list)
        
        for neighbor in neighbors:
            neighbor_tuple = tuple(map(tuple, neighbor))
            
            if neighbor_tuple not in closed_set:
                new_g_score = g_score + 1
                h_score = manhattan_distance(neighbor, puzzle.goal)
                new_f_score = new_g_score + h_score
                
                new_path = path + [neighbor_tuple]
                heapq.heappush(open_set, (new_f_score, new_g_score, neighbor_tuple, new_path))
    
    return None
