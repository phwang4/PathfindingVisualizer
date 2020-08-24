export function astar(grid, startNode, finishNode) {
  var visitedNodesInOrder = [];

  var openHeap = new BinaryHeap(function (node) {
    return node.f;
  });

  openHeap.push(startNode);

  while (openHeap.size() > 0) {
    // grab lowest fx, heap keeps it sorted
    var currentNode = openHeap.pop();
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    // end case
    if (currentNode === finishNode) {
      //   var curr = currentNode;

      //   while (curr.previousNode) {
      //     visitedNodesInOrder.push(curr);
      //     curr = curr.previousNode;
      //   }
      return visitedNodesInOrder;
    }
    // normal case -- move currentNode from open to close, process neighbors
    currentNode.isClosed = true;

    // find all neighbors
    var neighbors = getUnvisitedNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      if (neighbor.isClosed || neighbor.isWall) {
        // not a valid node
        continue;
      }

      // g score is cost so far to reach node
      // need to check if path is shortest
      var gScore = currentNode.g + neighbor.cost;
      var beenVisited = neighbor.isVisited;

      if (!beenVisited || gScore < neighbor.g) {
        // found and optimal path, so take score and see how good it is
        neighbor.isVisited = true;
        visitedNodesInOrder.push(neighbor);
        neighbor.previousNode = currentNode;
        neighbor.h = manhattanDistance(neighbor, finishNode);
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;

        if (!beenVisited) {
          // push will put it in proper place based on f value
          openHeap.push(neighbor);
        } else {
          // already seen node but has been rescored
          openHeap.rescoreElement(neighbor);
        }
      }
    }
  }
  // no result was found
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const { row, col } = node;

  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function manhattanDistance(startNode, finishNode) {
  return (
    Math.abs(startNode.row - finishNode.row) +
    Math.abs(startNode.col - finishNode.col)
  );
}

function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function (element) {
    // Add the new element to the end of the array.
    this.content.push(element);

    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
  },
  pop: function () {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  },
  remove: function (node) {
    var i = this.content.indexOf(node);

    // When it is found, the process seen in 'pop' is repeated
    // to fill up the hole.
    var end = this.content.pop();

    if (i !== this.content.length - 1) {
      this.content[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i);
      } else {
        this.bubbleUp(i);
      }
    }
  },
  size: function () {
    return this.content.length;
  },
  rescoreElement: function (node) {
    this.sinkDown(this.content.indexOf(node));
  },
  sinkDown: function (n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];

    // When at 0, an element can not sink any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = ((n + 1) >> 1) - 1;
      var parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  },
  bubbleUp: function (n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;
      // This is used to store the new position of the element, if any.
      var swap = null;
      var child1Score;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  },
};
