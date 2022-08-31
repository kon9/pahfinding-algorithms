const Graph = require("./Graph.js");
const bfs = require("/algorithms/bfs.js");
const dfs = require("/algorithms/dfs.js");
const dijkstra = require("/algorithms/dijkstra.js");
const astar = require("/algorithms/astar.js");
const randomMaze = require("./mazeAlgorithms/randomMaze.js");
const firstPattern = require("./mazeAlgorithms/firstPattern.js");
const secondPattern = require("./mazeAlgorithms/secondPattern.js");
const thirdPattern = require("./mazeAlgorithms/thirdPattern.js");

class Grid {
  constructor(row, col) {
    this.grid = document.getElementById("grid");
    this.col = col;
    this.row = row;
    this.graph = new Graph();
    this.startNode = 851;
    this.endNode = 878; //851
    this.speed = 1;
    this.isAlgCompleted = false;
    this.startPressed = false;
    this.endPressed = false;
    this.isPressed = false;
    this.isWheelPressed = false;
    this.currentAlgorithm = null;
  }

  initialize() {
    this.createGrid();
    this.createGraph();
    this.addEventListeners();
    this.addButtons();
    this.toggleTutorialButtons();
  }

  createGrid() {
    let nodeId = 1;
    let tableHtml = "";
    for (let i = 0; i < this.row; i++) {
      tableHtml += `<tr id="row ${i}">`;
      for (let j = 0; j < this.col; j++) {
        if (!(nodeId === this.startNode || nodeId === this.endNode))
          tableHtml += `<td id="${nodeId}" class="unvisited"></td>`;
        else if (nodeId === this.startNode)
          tableHtml += `<td id="${nodeId}" class="start"></td>`;
        else if (nodeId === this.endNode)
          tableHtml += `<td id="${nodeId}" class="end"></td>`;
        nodeId++;
      }
      tableHtml += "</tr>";
    }
    this.grid.innerHTML = tableHtml;
  }
  createGraph() {
    let nodeId = 1;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.graph.addNode(nodeId, j, i);
        if (i > 0 && j > 0) {
          this.graph.addEdge(nodeId, nodeId - 1);
          this.graph.addEdge(nodeId, nodeId - this.col);
        }
        if (i === 0 && j > 0) this.graph.addEdge(nodeId, nodeId - 1);
        if (j === 0 && i > 0) this.graph.addEdge(nodeId, nodeId - this.col);
        nodeId++;
      }
    }
  }
  clearGrid() {
    let nodeId = 1;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        let curNode = document.getElementById(`${nodeId}`);
        if (curNode.className === "wall" || curNode.className === "weight") {
          nodeId++;
          continue;
        }
        if (
          curNode.className === "visited-weight" ||
          curNode.className === "weight-path" ||
          curNode.className === "instant-weight-path"
        ) {
          curNode.className = "weight";
          nodeId++;
          continue;
        }
        if (!(nodeId === this.startNode || nodeId === this.endNode))
          curNode.className = "unvisited";
        if (nodeId === this.startNode) curNode.className = "start";
        if (nodeId === this.endNode) curNode.className = "end";
        nodeId++;
      }
    }
  }

  clearWalls() {
    let nodeId = 1;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        let curNode = document.getElementById(`${nodeId}`);
        if (!(nodeId === this.startNode || nodeId === this.endNode))
          curNode.className = "unvisited";
        if (nodeId === this.startNode) curNode.className = "start";
        if (nodeId === this.endNode) curNode.className = "end";
        this.graph.removeWall(nodeId);
        nodeId++;
      }
    }
  }

  clearWeights() {
    let nodeId = 1;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        let curNode = document.getElementById(`${nodeId}`);
        if (curNode.className === "wall") {
          nodeId++;
          continue;
        }
        if (!(nodeId === this.startNode || nodeId === this.endNode))
          curNode.className = "unvisited";
        if (nodeId === this.startNode) curNode.className = "start";
        if (nodeId === this.endNode) curNode.className = "end";
        this.graph.removeWeight(nodeId);
        nodeId++;
      }
    }
  }

  moveStartNode(ev) {
    if (ev.target.id === "grid") return;
    let oldNode = document.getElementById(`${this.startNode}`);
    oldNode.className = "unvisited";
    ev.target.className = "start";
    this.startNode = parseInt(ev.target.id);
    if (this.isAlgCompleted) {
      this.clearGrid();
      this.currentAlgorithm(0);
    }
  }

  moveEndNode(ev) {
    if (ev.target.id === "grid") return;
    let oldNode = document.getElementById(`${this.endNode}`);
    oldNode.className = "unvisited";
    ev.target.className = "end";
    this.endNode = parseInt(ev.target.id);
    if (this.isAlgCompleted) {
      this.clearGrid();
      this.currentAlgorithm(0);
    }
  }
  click_handler(ev) {
    let node = ev.target.id;
    if (ev.which === 1 && !this.isWheelPressed) {
      if (
        ev.target.className === "visited" ||
        ev.target.className === "instant-visit" ||
        ev.target.className === "path" ||
        ev.target.className === "instant-path"
      ) {
        this.currentAlgorithm(0);
      }

      if (ev.target.className === "wall") {
        ev.target.className = "unvisited";
        this.graph.removeWall(node);
        if (this.isAlgCompleted) this.currentAlgorithm(0);
        return;
      }
      if (ev.target.className !== "start" && ev.target.className !== "end") {
        ev.target.className = "wall";
        this.graph.addWall(parseInt(node));
      }
    }
    if (this.isWheelPressed) {
      if (
        ev.target.className === "visited" ||
        ev.target.className === "instant-visit" ||
        ev.target.className === "path" ||
        ev.target.className === "instant-path"
      ) {
        this.currentAlgorithm(0);
      }
      if (ev.target.className === "weight") {
        ev.target.className = "unvisited";
        this.graph.removeWeight(node);
        if (this.isAlgCompleted) this.currentAlgorithm(0);
        return;
      }
      if (
        ev.target.className !== "start" &&
        ev.target.className !== "end" &&
        ev.target.className !== "wall"
      ) {
        ev.target.className = "weight";
        this.graph.addWeight(parseInt(node));
      }
    }
  }

  addEventListeners() {
    this.grid.addEventListener("mousedown", (e) => {
      if (e.which === 2) {
        this.isWheelPressed = true;
        this.click_handler(e);
        return;
      }
      if (parseInt(e.target.id) === this.startNode) {
        this.startPressed = true;
        return;
      }
      if (parseInt(e.target.id) === this.endNode) {
        this.endPressed = true;
        return;
      }
      this.isPressed = true;
      this.click_handler(e);
    });

    this.grid.addEventListener("mouseover", (e) => {
      if (this.isPressed) this.click_handler(e);
      if (this.isWheelPressed) this.click_handler(e);
      if (
        e.target.className === "start" ||
        e.target.className === "end" ||
        e.target.className === "wall"
      )
        return;
      if (this.startPressed) {
        this.moveStartNode(e);
      }
      if (this.endPressed) {
        this.moveEndNode(e);
      }
    });

    window.addEventListener("mouseup", (e) => {
      this.startPressed = false;
      this.endPressed = false;
      this.isPressed = false;
      this.isWheelPressed = false;
    });
  }

  addButtons() {
    document.getElementById("btnStart").onclick = () => {
      this.isAlgCompleted = false;
      if (this.currentAlgorithm === null) {
        this.currentAlgorithm = (speed = this.speed) => {
          this.clearGrid();
          bfs(this.graph.nodes, this.startNode, this.endNode, speed);
          this.isAlgCompleted = true;
        };
      }
      this.currentAlgorithm();
    };

    document.getElementById("btnClear").onclick = () => {
      this.isAlgCompleted = false;
      this.clearGrid();
    };

    document.getElementById("btnClearWalls").onclick = () => {
      this.isAlgCompleted = false;
      this.clearWalls();
    };

    document.getElementById("btnClearWeights").onclick = () => {
      this.isAlgCompleted = false;
      this.clearWeights();
    };

    document.getElementById("instantSpeed").onclick = () => (this.speed = 0);
    document.getElementById("fastSpeed").onclick = () => (this.speed = 1);
    document.getElementById("mediumSpeed").onclick = () => (this.speed = 30);
    document.getElementById("slowSpeed").onclick = () => (this.speed = 100);

    document.getElementById("bfsAlgBtn").onclick = () => {
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        bfs(this.graph.nodes, this.startNode, this.endNode, speed);
        this.isAlgCompleted = true;
      };
    };

    document.getElementById("dfsAlgBtn").onclick = () => {
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        dfs(this.graph.nodes, this.startNode, this.endNode, speed);
        this.isAlgCompleted = true;
      };
    };

    document.getElementById("astarAlgBtn").onclick = () => {
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        astar(this.graph.nodes, this.startNode, this.endNode, speed);
        this.isAlgCompleted = true;
      };
    };

    document.getElementById("dijkstraAlgBtn").onclick = () => {
      this.clearGrid();
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        dijkstra(this.graph.nodes, this.startNode, this.endNode, speed);
        this.isAlgCompleted = true;
      };
    };

    document.getElementById("randomMazeBtn").onclick = () => {
      this.clearGrid();
      randomMaze(this.graph.nodes);
    };
    document.getElementById("firstPatternBtn").onclick = () => {
      this.clearGrid();
      this.clearWalls();
      firstPattern(this.graph.nodes, this.row, this.col);
    };
    document.getElementById("secondPatternBtn").onclick = () => {
      this.clearGrid();
      this.clearWalls();
      secondPattern(this.graph.nodes, this.row, this.col);
    };
    document.getElementById("thirdPatternBtn").onclick = () => {
      this.clearGrid();
      this.clearWalls();
      thirdPattern(this.graph.nodes, this.row, this.col);
    };
  }
  toggleTutorialButtons(counter = 1) {
    document.getElementById("skipButton").onclick = () => {
      document.getElementById("tutorial").style.display = "none";
    };

    if (document.getElementById("nextButton")) {
      document.getElementById("nextButton").onclick = () => {
        if (counter < 9) {
          counter++;
        }
        nextPreviousClick();
        this.toggleTutorialButtons(counter);
      };
    }

    document.getElementById("previousButton").onclick = () => {
      if (counter > 1) counter--;
      nextPreviousClick();
      this.toggleTutorialButtons(counter);
    };

    function nextPreviousClick() {
      if (counter === 1) {
        document.getElementById(
          "tutorial"
        ).innerHTML = ` <div id="tutorial-text"><h3>Welcome to Pathfinding Visualizer!</h3>
        <h5>This tutorial will show you all the features of this application.</h5>
        <img id="TutorialImage" src="src/styling/balls.jpg"></div>
        <div id="tutorial-buttons"><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>
        <button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button>
        <button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button>
        </div>`;
      } else if (counter === 2) {
        console.log(counter);
        document.getElementById(
          "tutorial"
        ).innerHTML = `<div id="tutorial-text"><h3>Drag nodes and add walls</h3>
        <h5>You can move start and end nodes,also you can add wall by clicking and dragging on the empty space</h5>
        <img id="TutorialImage" src="src/styling/demo-dynamic.gif"></div>
        <div id="tutorial-buttons"><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>
        <button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button>
        <button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button>
        </div>`;
      } else if (counter === 3) {
        document.getElementById(
          "tutorial"
        ).innerHTML = `<div id="tutorial-text"><h3>Add weights</h3>
        <h5>To add weights, click on the mouse wheel and drag over an empty area</h5>
        <img id="TutorialImage" src="src/styling/demo-weights.gif">
        <div id="tutorial-buttons"><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>
        <button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button>
        <button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button>
        </div>`;
      } else if (counter === 4) {
        document.getElementById(
          "tutorial"
        ).innerHTML = `<div id="tutorial-text"><h3>Available algorithms</h3>
        <ul>
            <li>Astar</li>
            <li>Dijkstra algorithm</li>
            <li>Depth-first search</li>
            <li>Breadth-first search</li>
        </ul>
        <div id="tutorial-buttons"><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>
        <button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button>
        <button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button>
        </div>`;
      } else document.getElementById("tutorial").style.display = "none";
    }
  }
}

module.exports = Grid;
