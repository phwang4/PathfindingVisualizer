import {
  sortNodesByDistance,
  getAllNodes,
  getUnvisitedNeighbors,
} from "../algorithms/dijkstra";

export function greedy(grid, startNode, finishNode) {
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
    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function manhattanDistance(startNode, finishNode) {
  return (
    Math.abs(startNode.row - finishNode.row) +
    Math.abs(startNode.col - finishNode.col)
  );
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (finishNode) {
      var distance = manhattanDistance(neighbor, finishNode);
      neighbor.distance = distance;
      neighbor.previousNode = node;
    } else {
      console.log("else");
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
}
