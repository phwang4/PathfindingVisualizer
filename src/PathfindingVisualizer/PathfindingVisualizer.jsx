import React, { Component } from "react";
import Node from "./Node/Node";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const START_NODE_COL = 15;
const START_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const FINISH_NODE_ROW = 10;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    console.log("down");
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    console.log("enter");
    if (!this.state.mouseIsPressed) return;

    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
    console.log("up");
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          (node.row === START_NODE_ROW && node.col === START_NODE_COL) ||
          (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL)
        ) {
        } // BAD
        else
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
      }, 10 * i);
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          (node.row === START_NODE_ROW && node.col === START_NODE_COL) ||
          (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL)
        ) {
        } // BAD
        else
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
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

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <div class='dropdown'>
          <button
            class='btn btn-primary dropdown-toggle'
            type='button'
            data-toggle='dropdown'
          >
            Algorithms
            <span class='caret'></span>
          </button>
          <ul class='dropdown-menu'>
            <li>
              <button type='button' onClick={() => this.visualizeDijkstra()}>
                Dijkstra's
              </button>
            </li>
          </ul>
        </div>
        <div className='grid'>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, isWall, row, col, isPath } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      row={row}
                      col={col}
                      isPath={isPath}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
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
    isPath: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node, // copy all parameters but change only what's listed below
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
