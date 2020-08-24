export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);

  sortNodesByDistance(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    // while there are still unvisited nodes

    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    // if wall, skip
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;

    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

export function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

export function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

export function getUnvisitedNeighbors(node, grid) {
  const { row, col } = node;

  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
export function getNodesInShortestPathOrder(finishNode) {
  const NodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    NodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return NodesInShortestPathOrder;
}
