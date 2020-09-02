This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Actual code is located in src/PathfindingVisualizer and src/algorithms, everything else came from starting with a React App

This is an in-progress visualizer for dijkstra's algorithm, greedy BFS, and astar search
Click and drag nodes to add walls. Click and drag the start and finish nodes to move them around. When you're satisfied with the board, click on Algorithms and choose one of the three to see how it pathfindinds from the start to the finish.

Goals:

- [ ] Fix onmousedown issue (caused by only the nodes being responsive to mouse clicks, so if you let go outside of a node, reality desyncs)
- [ ] add ability to (easily) remove walls (technicall can have toggle, but then the animation messes up)
- [ ] if you drag a start/finish node through a wall, make the wall reappear when you leave
- [ ] add ability to redo the same circumstances with a different algorithm
- [ ] make prettier
- [ ] add weights
- [ ] make weights different depending on color (1, 2, 5, impassable)
- [ ] add button to generate a maze
- [ ] make that maze random

**Dijkstra's Algorithm** <br />
This algorithm finds the shortest path between the start node and the finish node by branching out until it reaches the finish node and calculating
the shortest path from there. This algorithm ALWAYS finds the shortest path, but can be extremely slow in that in checks a lot of useless nodes.

**Greedy Best First Search** <br />
This algorithm does NOT always find the shortest path, however it is much faster than it's counterpart here.
Greedy BFS beelines for the finish node, but upon hitting a wall will begin branching out before beelining again. Unfortunately,
this can cause situations where the final path has to loop back because of a wall.

**AStar Search Algorithm** <br />
AStar combines the best of both worlds. It's as fast as Greedy BFS, but doesn't make the mistake of looping back on itself and will ALWAYS
find the shortest path like Dijkstra's.

If you want to play around, check it out here https://phwang4.github.io/PathfindingVisualizer/

(note to self) npm run deploy to update this site
