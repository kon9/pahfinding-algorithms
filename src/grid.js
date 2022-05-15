const Graph = require("./Graph.js");
const sleep = require("./utils/sleep.js");
const bfs = require("/algorithms/bfs.js");
const dfs = require("/algorithms/dfs.js");
const dijkstra = require("/algorithms/dijkstra.js");
const astar = require("/algorithms/astar.js");
class Grid {
  constructor(row, col) {
    this.grid = document.getElementById("grid");
    this.col = col;
    this.row = row;
    this.speed = 1;
    this.graph = new Graph(710, 719);
    this.isAlgComleted = false;
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
  }

  createGrid() {
    let nodeId = 1;
    let tableHtml = "";
    for (let i = 0; i < this.row; i++) {
      tableHtml += `<tr id="row ${i}">`;
      for (let j = 0; j < this.col; j++) {
        this.graph.addNode(nodeId, j, i);
        if (i > 0 && j > 0) {
          this.graph.addEdge(nodeId, nodeId - this.col);
          this.graph.addEdge(nodeId, nodeId - 1);
        }
        if (i === 0 && j > 0) this.graph.addEdge(nodeId, nodeId - 1);
        if (j === 0 && i > 0) this.graph.addEdge(nodeId, nodeId - this.col);

        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))
          tableHtml += `<td id="${nodeId}" class="unvisited"></td>`;
        else if (nodeId === this.graph.startNode)
          tableHtml += `<td id="${nodeId}" class="start"></td>`;
        else if (nodeId === this.graph.endNode)
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
        if (curNode.className === "visited-weight") {
          curNode.className = "weight";
          nodeId++;
          continue;
        }
        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))
          curNode.className = "unvisited";
        if (nodeId === this.graph.startNode) curNode.className = "start";
        if (nodeId === this.graph.endNode) curNode.className = "end";
        nodeId++;
      }
    }
  }

  clearWalls() {
    let nodeId = 1;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        let curNode = document.getElementById(`${nodeId}`);
        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))
          curNode.className = "unvisited";
        if (nodeId === this.graph.startNode) curNode.className = "start";
        if (nodeId === this.graph.endNode) curNode.className = "end";
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
        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))
          curNode.className = "unvisited";
        if (nodeId === this.graph.startNode) curNode.className = "start";
        if (nodeId === this.graph.endNode) curNode.className = "end";
        this.graph.removeWeight(nodeId);
        nodeId++;
      }
    }
  }

  async drawPath(steps, speed) {
    let path = [];
    let currentNode = this.graph.endNode;
    let node = document.getElementById(`${currentNode}`);
    node.classList = "end";
    while (parseInt(currentNode) !== this.graph.startNode) {
      path.unshift(currentNode);
      currentNode = steps[currentNode];
      await sleep(speed);
      let node = document.getElementById(`${currentNode}`);

      if (this.isAlgComleted) {
        node.className = "instant-path";
      } else {
        node.className = "path";
      }
      if (node.id === this.graph.startNode) node.className = "start";
    }

    node = document.getElementById(`${currentNode}`);
    node.className = "start";
    this.isAlgComleted = true;
  }

  nodeUpdate(nodeId) {
    let node = document.getElementById(`${nodeId}`);
    if (parseInt(nodeId) === this.graph.startNode) return;
    if (this.graph.nodes[nodeId].isWall) return;
    if (this.graph.nodes[nodeId].isWeight) {
      node.className = "visited-weight";
      return;
    }
    if (this.isAlgComleted) {
      node.className = "instant-visit";
      return;
    }
    node.className = "visited";
  }

  moveStartNode(ev) {
    if (ev.target.id === "grid") return;
    let oldNode = document.getElementById(`${this.graph.startNode}`);
    oldNode.className = "unvisited";
    ev.target.className = "start";
    this.graph.startNode = parseInt(ev.target.id);
    if (this.isAlgComleted) {
      this.clearGrid();
      this.currentAlgorithm(0);
    }
  }

  moveEndNode(ev) {
    if (ev.target.id === "grid") return;
    let oldNode = document.getElementById(`${this.graph.endNode}`);
    oldNode.className = "unvisited";
    ev.target.className = "end";
    this.graph.endNode = parseInt(ev.target.id);
    if (this.isAlgComleted) {
      this.clearGrid();
      this.currentAlgorithm(0);
    }
  }
  click_handler(ev) {
    let node = ev.target.id;
    if (ev.which === 1) {
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
        if (this.isAlgComleted) this.currentAlgorithm(0);
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
      if (ev.target.className === "wall") {
        ev.target.className = "weight";
        this.graph.removeWall(node);
        this.graph.addWeight(node);
        if (this.isAlgComleted) this.currentAlgorithm(0);
        return;
      }
      if (ev.target.className === "weight") {
        ev.target.className = "unvisited";
        this.graph.removeWeight(node);
        if (this.isAlgComleted) this.currentAlgorithm(0);
        return;
      }
      if (ev.target.className !== "start" && ev.target.className !== "end") {
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
      if (parseInt(e.target.id) === this.graph.startNode) {
        this.startPressed = true;
        return;
      }
      if (parseInt(e.target.id) === this.graph.endNode) {
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
      console.log("startbtn clisk");
      this.isAlgComleted = false;
      if (this.currentAlgorithm === null) {
        this.currentAlgorithm = (speed = this.speed) => {
          this.clearGrid();
          bfs(
            this.graph.nodes,
            this.graph.startNode,
            this.graph.endNode,
            this.nodeUpdate.bind(this),
            this.drawPath.bind(this),
            speed
          );
        };
      }
      this.currentAlgorithm();
    };

    document.getElementById("btnClear").onclick = () => {
      this.isAlgComleted = false;
      this.clearGrid();
    };

    document.getElementById("btnClearWalls").onclick = () => {
      this.isAlgComleted = false;
      this.clearWalls();
    };

    document.getElementById("btnClearWeights").onclick = () => {
      this.isAlgComleted = false;
      this.clearWeights();
    };

    document.getElementById("instantSpeed").onclick = () => (this.speed = 0);

    document.getElementById("fastSpeed").onclick = () => (this.speed = 1);

    document.getElementById("mediumSpeed").onclick = () => (this.speed = 30);

    document.getElementById("slowSpeed").onclick = () => (this.speed = 100);

    document.getElementById("bfsAlgBtn").onclick = () => {
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        bfs(
          this.graph.nodes,
          this.graph.startNode,
          this.graph.endNode,
          this.nodeUpdate.bind(this),
          this.drawPath.bind(this),
          speed
        );
      };
    };

    document.getElementById("dfsAlgBtn").onclick = () => {
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        dfs(
          this.graph.nodes,
          this.graph.startNode,
          this.graph.endNode,
          this.nodeUpdate.bind(this),
          this.drawPath.bind(this),
          speed
        );
      };
    };
    document.getElementById("astarAlgBtn").onclick = () => {
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        astar(
          this.graph.nodes,
          this.graph.startNode,
          this.graph.endNode,
          this.nodeUpdate.bind(this),
          this.drawPath.bind(this),
          speed
        );
      };
    };

    document.getElementById("dijkstraAlgBtn").onclick = () => {
      this.clearGrid();
      this.currentAlgorithm = (speed = this.speed) => {
        this.clearGrid();
        dijkstra(
          this.graph.nodes,
          this.graph.startNode,
          this.graph.endNode,
          this.nodeUpdate.bind(this),
          this.drawPath.bind(this),
          speed
        );
      };
    };
  }
}

module.exports = Grid;
