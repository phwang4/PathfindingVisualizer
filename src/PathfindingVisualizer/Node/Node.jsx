import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isPath,
      isWall,
      //   onMouseDown,
      //   onMouseEnter,
      //   onMouseUp,
      row,
      isVisited,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"  
      : isStart
      ? "node-start"
      : isVisited
      ? "node-visited"
      : isPath
      ? "node-path"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        // onMouseDown={() => onMouseDown(row, col)}
        // onMouseEnter={() => onMouseEnter(row, col)}
        // onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}
