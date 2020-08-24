import React, { Component } from "react";
import Node from "./Node/Node";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import $ from "jquery";
// import Popper from "popper.js";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { greedy } from "../algorithms/greedy";
import { astar } from "../algorithms/astar";

var START_NODE_COL = 15;
var START_NODE_ROW = 10;
var FINISH_NODE_COL = 35;
var FINISH_NODE_ROW = 10;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNodeMoving: false,
      finishNodeMoving: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  clear() {
    START_NODE_COL = 15;
    START_NODE_ROW = 10;
    FINISH_NODE_COL = 35;
    FINISH_NODE_ROW = 10;
    const newGrid = getInitialGrid();

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (row === 10 && col === 15) this.setNode(row, col, "node-start");
        else if (row === 10 && col === 35)
          this.setNode(row, col, "node-finish");
        else this.setNode(row, col, "");
      }
    }
    this.setState({
      grid: newGrid,
      mouseIsPressed: false,
      startNodeMoving: false,
      finishNodeMoving: false,
    });
  }

  handleMouseDown(row, col) {
    // if trying to move start node
    if (this.checkNode(row, col, "node-start")) {
      this.setNode(row, col, "node-start-moving");
      const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        startNodeMoving: true,
        mouseIsPressed: true,
      });
    } else if (this.checkNode(row, col, "node-finish")) {
      // if trying to move finish node
      this.setNode(row, col, "node-finish-moving");
      const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        finishNodeMoving: true,
        mouseIsPressed: true,
      });
    } else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) {
      return;
    }
    if (this.state.startNodeMoving) {
      if (!this.checkNode(row, col, "node-finish")) {
        this.setNode(row, col, "node-start-moving");
        const newGrid = getNewGridWithWallToggledOff(this.state.grid, row, col);
        this.setState({ grid: newGrid });
      }
    } else if (this.state.finishNodeMoving) {
      if (!this.checkNode(row, col, "node-start")) {
        this.setNode(row, col, "node-finish-moving");
        const newGrid = getNewGridWithWallToggledOff(this.state.grid, row, col);
        this.setState({ grid: newGrid });
      }
    } else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseOut(row, col) {
    if (!this.state.mouseIsPressed) {
      return;
    }
    if (
      (this.state.startNodeMoving &&
        !this.checkNode(row, col, "node-finish")) ||
      (this.state.finishNodeMoving && !this.checkNode(row, col, "node-start"))
    ) {
      this.setNode(row, col, "");
    }
  }
  handleMouseUp(row, col) {
    if (this.state.startNodeMoving) {
      if (this.checkNode(row, col, "node-finish")) {
        return;
      }
      this.setNode(row, col, "node-start");
      const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, startNodeMoving: false });
      START_NODE_ROW = row;
      START_NODE_COL = col;
    } else if (this.state.finishNodeMoving) {
      if (this.checkNode(row, col, "node-start")) {
        return;
      }
      this.setNode(row, col, "node-finish");
      const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, finishNodeMoving: false });
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
    }
    this.setState({ mouseIsPressed: false });
  }
  // helper method to make code cleaner
  checkNode(row, col, name) {
    return (
      document.getElementById(`node-${row}-${col}`).className === `node ${name}`
    );
  }
  // helper method to make code cleaner
  setNode(row, col, name) {
    document.getElementById(`node-${row}-${col}`).className = `node ${name}`;
  }

  // handleEntirePageMouseDown() {
  //   this.setState({ mouseIsPressed: true });
  //
  // }
  // handleEntirePageMouseUp() {
  //   this.setState({ mouseIsPressed: false });
  //
  // }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          this.checkNode(node.row, node.col, "node-start") ||
          this.checkNode(node.row, node.col, "node-finish")
        ) {
        } // BAD
        else this.setNode(node.row, node.col, "node-visited");
      }, 10 * i);
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          this.checkNode(node.row, node.col, "node-start") ||
          this.checkNode(node.row, node.col, "node-finish")
        ) {
        } // BAD
        else this.setNode(node.row, node.col, "node-shortest-path");
      }, visitedNodesInOrder.length * 10 + 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeGreedy() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = greedy(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAStar() {
    const { grid } = this.state;

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  updateGrid(grid) {
    const newGrid = grid.slice();

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (newGrid[row][col].isVisited || newGrid[row][col].isPath) {
          const node = newGrid[row][col];
          const newNode = {
            ...node,
            isVisited: false,
            isPath: false,
          };
          newGrid[row][col] = newNode;
        }
      }
    }
    return newGrid;
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <div className='dropdown'>
          <button
            className='btn btn-primary dropdown-toggle'
            type='button'
            data-toggle='dropdown'
          >
            Algorithms
            <span className='caret'></span>
          </button>
          <ul className='dropdown-menu'>
            <li>
              <button type='button' onClick={() => this.visualizeDijkstra()}>
                Dijkstra's
              </button>
            </li>
            <li>
              <button type='button' onClick={() => this.visualizeGreedy()}>
                Greedy BFS
              </button>
            </li>
            <li>
              <button type='button' onClick={() => this.visualizeAStar()}>
                A* Search
              </button>
            </li>
          </ul>
          <button type='button' onClick={() => this.clear()}>
            Clear
          </button>
        </div>

        <div className='grid'>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    isStart,
                    isFinish,
                    isWall,
                    row,
                    col,
                    isVisited,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      row={row}
                      col={col}
                      isWall={isWall}
                      isVisited={isVisited}
                      mouseIsPressed={mouseIsPressed}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseOut={(row, col) => this.handleMouseOut(row, col)}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                    ></Node> // to get rid of error have to add a key
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isClosed: false,
    isPath: false,
    isWall: false,
    previousNode: null,
    f: 0,
    g: 0,
    h: 0,
    cost: 1,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  if (grid[row][col].isStart || grid[row][col].isFinish) return grid;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node, // copy all parameters but change only what's listed below
    isWall: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithWallToggledOff = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node, // copy all parameters but change only what's listed below
    isWall: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStartToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithFinishToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
