export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    // while it's a neighbor

    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // if (closestNode.isWall) continue;
    // if wall, skip
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // if closest node is wall, continue
    // if closest node is at distance of infinite
    // we must be trapped and stop
    // and then return visitedNodesInOrder

    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getNeighbors(node, grid) {
  const { row, col } = node;

  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
