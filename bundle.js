/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * aor disable the default devtool with "devtool: flse".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./Graph.js":
      /*!******************!*\
  !*** ./Graph.js ***!
  \******************/
      /***/ (module) => {
        eval(
          "class Graph {\r\n  constructor() {\r\n    this.nodes = [];\r\n    this.startNode = 710;\r\n    this.endNode = 719;\r\n  }\r\n\r\n  addNode(value, x, y) {\r\n    this.nodes[value] = [];\r\n    this.nodes[value].isEnd = false;\r\n    this.nodes[value].isWall = false;\r\n    this.nodes[value].isWeight = false;\r\n    this.nodes[value].positionX = x;\r\n    this.nodes[value].positionY = y;\r\n  }\r\n\r\n  addEdge(node1, node2) {\r\n    this.nodes[node2].push(node1);\r\n    this.nodes[node1].push(node2);\r\n  }\r\n\r\n  addWall(node) {\r\n    this.nodes[node].isWall = true;\r\n  }\r\n\r\n  addWeight(node) {\r\n    this.nodes[node].isWeight = true;\r\n  }\r\n\r\n  removeWeight(node) {\r\n    this.nodes[node].isWeight = false;\r\n  }\r\n\r\n  removeWall(node) {\r\n    this.nodes[node].isWall = false;\r\n  }\r\n\r\n  setStartNode(value) {\r\n    this.startNode = value;\r\n  }\r\n\r\n  setEndNode(value) {\r\n    this.endNode = value;\r\n  }\r\n\r\n  changeNodeStartState(value) {\r\n    this.nodes[value][0].isStart = !this.nodes[value][0].isStart;\r\n  }\r\n\r\n  changeNodeEndState(value) {\r\n    this.nodes[value][1] = !this.nodes[value][1];\r\n  }\r\n}\r\n\r\nmodule.exports = Graph;\r\n\n\n//# sourceURL=webpack://require/./Graph.js?"
        );

        /***/
      },

    /***/ "./algorithms/astar.js":
      /*!*****************************!*\
  !*** ./algorithms/astar.js ***!
  \*****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const sleep = __webpack_require__(/*! ../utils/sleep.js */ "./utils/sleep.js");\r\nconst PriorityQueue = __webpack_require__(/*! ../utils/PriorityQueue */ "./utils/PriorityQueue.js");\r\n\r\nasync function astar(nodes, startNode, endNode, nodeUpdate, drawPath, speed) {\r\n  const queue = new PriorityQueue();\r\n  let distances = {};\r\n  let visited = {};\r\n  let steps = {};\r\n  let heuristic = {};\r\n  let nodesKeys = Object.keys(nodes);\r\n  nodesKeys.forEach((node) => {\r\n    distances[node] = Infinity;\r\n    steps[node] = null;\r\n    heuristic[node] = Infinity;\r\n    visited[node] = false;\r\n  });\r\n  heuristic[startNode] = manhattan(startNode);\r\n  distances[startNode] = 0;\r\n  queue.insert(startNode, manhattan(startNode));\r\n\r\n  function handleNode(node) {\r\n    nodeUpdate(node);\r\n    let activeNodeDistance = distances[node];\r\n\r\n    let neighbours = nodes[node].slice(0, 5);\r\n    neighbours.forEach((neighbourNode) => {\r\n      let currentNeighbourDistance = distances[neighbourNode];\r\n      let newNeighbourDistance;\r\n      if (!nodes[node].isWall) {\r\n        if (nodes[node].isWeight) {\r\n          heuristic[neighbourNode] = manhattan(neighbourNode) + 5;\r\n          newNeighbourDistance = activeNodeDistance + 5;\r\n        } else {\r\n          heuristic[neighbourNode] = manhattan(neighbourNode);\r\n          newNeighbourDistance = activeNodeDistance + 1;\r\n        }\r\n      } else newNeighbourDistance = Infinity;\r\n      if (newNeighbourDistance < currentNeighbourDistance) {\r\n        distances[neighbourNode] = newNeighbourDistance;\r\n        steps[neighbourNode] = node;\r\n        if (!visited[neighbourNode]) {\r\n          queue.insert(neighbourNode, heuristic[neighbourNode]);\r\n          visited[neighbourNode] = true;\r\n        }\r\n      }\r\n    });\r\n    visited[node] = true;\r\n  }\r\n\r\n  while (!queue.isEmpty()) {\r\n    let currentNode = queue.extract_minimum();\r\n\r\n    if (currentNode === endNode) {\r\n      break;\r\n    }\r\n    await sleep(speed);\r\n\r\n    handleNode(currentNode);\r\n  }\r\n\r\n  function manhattan(nodeId) {\r\n    // let d1 = Math.pow(nodes[nodeId].positionX - nodes[endNode].positionX, 2);\r\n    // let d2 = Math.pow(nodes[nodeId].positionY - nodes[endNode].positionY, 2);\r\n    let d1 = Math.abs(nodes[nodeId].positionX - nodes[endNode].positionX);\r\n    let d2 = Math.abs(nodes[nodeId].positionY - nodes[endNode].positionY);\r\n    return d1 + d2;\r\n  }\r\n  drawPath(steps, speed);\r\n}\r\nmodule.exports = astar;\r\n\n\n//# sourceURL=webpack://require/./algorithms/astar.js?'
        );

        /***/
      },

    /***/ "./algorithms/bfs.js":
      /*!***************************!*\
  !*** ./algorithms/bfs.js ***!
  \***************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const sleep = __webpack_require__(/*! ../utils/sleep.js */ "./utils/sleep.js");\r\n\r\nasync function bfs(nodes, startNode, endNode, nodeUpdate, drawPath, speed) {\r\n  let queue = [startNode];\r\n  let visited = { [startNode]: 1 };\r\n  let distance = { [startNode]: 0 };\r\n  let steps = { [startNode]: null };\r\n  function handleNode(node) {\r\n    nodeUpdate(node);\r\n    let neighboursList = nodes[node].slice(0, 5);\r\n    neighboursList.forEach((neighbour) => {\r\n      if (!visited[neighbour]) {\r\n        visited[neighbour] = 1;\r\n        queue.push(neighbour);\r\n        steps[neighbour] = node;\r\n        distance[neighbour] = distance[node] + 1;\r\n      }\r\n    });\r\n  }\r\n  while (queue.length) {\r\n    await sleep(speed);\r\n    let activeNode = queue.shift();\r\n    if (nodes[activeNode].isWall) continue;\r\n    handleNode(activeNode);\r\n    if (activeNode === endNode) break;\r\n  }\r\n  drawPath(steps, speed);\r\n}\r\n\r\nmodule.exports = bfs;\r\n\n\n//# sourceURL=webpack://require/./algorithms/bfs.js?'
        );

        /***/
      },

    /***/ "./algorithms/dfs.js":
      /*!***************************!*\
  !*** ./algorithms/dfs.js ***!
  \***************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const sleep = __webpack_require__(/*! ../utils/sleep.js */ "./utils/sleep.js");\r\nasync function dfs(nodes, startNode, endNode, nodeUpdate, drawPath, speed) {\r\n  let stack = [startNode];\r\n  let visited = { [startNode]: 1 };\r\n  let steps = { [startNode]: null };\r\n  function handleNode(node) {\r\n    nodeUpdate(node);\r\n\r\n    let reversedNeighboursList = [...nodes[node]].reverse();\r\n\r\n    reversedNeighboursList.forEach((neighbour) => {\r\n      if (!visited[neighbour]) {\r\n        steps[neighbour] = node;\r\n        visited[neighbour] = 1;\r\n        stack.push(neighbour);\r\n      }\r\n    });\r\n  }\r\n\r\n  while (stack.length) {\r\n    await sleep(speed);\r\n    let activeNode = stack.pop();\r\n    if (nodes[activeNode].isWall) continue;\r\n    handleNode(activeNode);\r\n    if (activeNode === endNode) break;\r\n  }\r\n  drawPath(steps, speed);\r\n}\r\nmodule.exports = dfs;\r\n\n\n//# sourceURL=webpack://require/./algorithms/dfs.js?'
        );

        /***/
      },

    /***/ "./algorithms/dijkstra.js":
      /*!********************************!*\
  !*** ./algorithms/dijkstra.js ***!
  \********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const sleep = __webpack_require__(/*! ../utils/sleep.js */ "./utils/sleep.js");\r\nconst PriorityQueue = __webpack_require__(/*! ../utils/PriorityQueue */ "./utils/PriorityQueue.js");\r\n\r\nasync function dijkstra(\r\n  nodes,\r\n  startNode,\r\n  endNode,\r\n  nodeUpdate,\r\n  drawPath,\r\n  speed\r\n) {\r\n  const queue = new PriorityQueue();\r\n  let distances = {};\r\n  let visited = {};\r\n  let steps = {};\r\n  let nodesKeys = Object.keys(nodes);\r\n  nodesKeys.forEach((node) => {\r\n    distances[node] = Infinity;\r\n    steps[node] = null;\r\n    visited[node] = false;\r\n  });\r\n  distances[startNode] = 0;\r\n  queue.insert(startNode, 1);\r\n\r\n  function handleNode(node) {\r\n    nodeUpdate(node);\r\n    let activeNodeDistance = distances[node];\r\n\r\n    let neighbours = nodes[node].slice(0, 5);\r\n    neighbours.forEach((neighbourNode) => {\r\n      let currentNeighbourDistance = distances[neighbourNode];\r\n      let newNeighbourDistance;\r\n      if (!nodes[node].isWall) {\r\n        if (nodes[node].isWeight) {\r\n          newNeighbourDistance = activeNodeDistance + 5;\r\n        } else {\r\n          newNeighbourDistance = activeNodeDistance + 1;\r\n        }\r\n      } else newNeighbourDistance = Infinity;\r\n      if (newNeighbourDistance < currentNeighbourDistance) {\r\n        distances[neighbourNode] = newNeighbourDistance;\r\n        steps[neighbourNode] = node;\r\n        if (!visited[neighbourNode]) {\r\n          queue.insert(neighbourNode, activeNodeDistance);\r\n          visited[neighbourNode] = true;\r\n        }\r\n      }\r\n      visited[node] = true;\r\n    });\r\n  }\r\n\r\n  while (!queue.isEmpty()) {\r\n    let currentNode = queue.extract_minimum();\r\n    if (currentNode === endNode) {\r\n      break;\r\n    }\r\n    await sleep(speed);\r\n\r\n    handleNode(currentNode);\r\n  }\r\n  drawPath(steps, speed);\r\n}\r\n\r\nmodule.exports = dijkstra;\r\n\n\n//# sourceURL=webpack://require/./algorithms/dijkstra.js?'
        );

        /***/
      },

    /***/ "./grid.js":
      /*!*****************!*\
  !*** ./grid.js ***!
  \*****************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const Graph = __webpack_require__(/*! ./Graph.js */ "./Graph.js");\r\nconst sleep = __webpack_require__(/*! ./utils/sleep.js */ "./utils/sleep.js");\r\nconst bfs = __webpack_require__(/*! ../../../../../algorithms/bfs.js */ "./algorithms/bfs.js");\r\nconst dfs = __webpack_require__(/*! ../../../../../algorithms/dfs.js */ "./algorithms/dfs.js");\r\nconst dijkstra = __webpack_require__(/*! ../../../../../algorithms/dijkstra.js */ "./algorithms/dijkstra.js");\r\nconst astar = __webpack_require__(/*! ../../../../../algorithms/astar.js */ "./algorithms/astar.js");\r\n// import bfs from ;\r\n// import dfs from ;\r\n// import dijkstra from ;\r\n// import astar from ;\r\n// import { binaryMaze } from "./mazeAlgorithms/binaryMazeAlgorithm.js";\r\nclass Grid {\r\n  constructor(row, col) {\r\n    this.grid = document.getElementById("grid");\r\n    this.col = col; //63\r\n    this.row = row; //26\r\n    this.speed = 1;\r\n    this.graph = new Graph();\r\n    this.isAlgComleted = false;\r\n    this.startPressed = false;\r\n    this.endPressed = false;\r\n    this.isPressed = false;\r\n    this.isWheelPressed = false;\r\n    this.currentAlgorithm = null;\r\n  }\r\n\r\n  initialize() {\r\n    this.createGrid();\r\n    this.createGraph();\r\n    this.addEventListeners();\r\n    this.addButtons();\r\n  }\r\n\r\n  createGrid() {\r\n    let nodeId = 1;\r\n    let tableHtml = "";\r\n    for (let i = 0; i < this.row; i++) {\r\n      tableHtml += `<tr id="row ${i}">`;\r\n      for (let j = 0; j < this.col; j++) {\r\n        //Добавляем узлы и ребра графу\r\n        this.graph.addNode(nodeId, j, i);\r\n        if (i > 0 && j > 0) {\r\n          this.graph.addEdge(nodeId, nodeId - this.col);\r\n          this.graph.addEdge(nodeId, nodeId - 1);\r\n        }\r\n        if (i === 0 && j > 0) this.graph.addEdge(nodeId, nodeId - 1);\r\n        if (j === 0 && i > 0) this.graph.addEdge(nodeId, nodeId - this.col);\r\n\r\n        //Отрисовываем таблицу\r\n        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))\r\n          tableHtml += `<td id="${nodeId}" class="unvisited"></td>`;\r\n        else if (nodeId === this.graph.startNode)\r\n          tableHtml += `<td id="${nodeId}" class="start"></td>`;\r\n        else if (nodeId === this.graph.endNode)\r\n          tableHtml += `<td id="${nodeId}" class="end"></td>`;\r\n        nodeId++;\r\n      }\r\n      tableHtml += "</tr>";\r\n    }\r\n    this.grid.innerHTML = tableHtml;\r\n  }\r\n  createGraph() {\r\n    let nodeId = 1;\r\n    for (let i = 0; i < this.row; i++) {\r\n      for (let j = 0; j < this.col; j++) {\r\n        this.graph.addNode(nodeId, j, i);\r\n        if (i > 0 && j > 0) {\r\n          this.graph.addEdge(nodeId, nodeId - 1);\r\n          this.graph.addEdge(nodeId, nodeId - this.col);\r\n        }\r\n        if (i === 0 && j > 0) this.graph.addEdge(nodeId, nodeId - 1);\r\n        if (j === 0 && i > 0) this.graph.addEdge(nodeId, nodeId - this.col);\r\n        nodeId++;\r\n      }\r\n    }\r\n  }\r\n  clearGrid() {\r\n    let nodeId = 1;\r\n    for (let i = 0; i < this.row; i++) {\r\n      for (let j = 0; j < this.col; j++) {\r\n        let curNode = document.getElementById(`${nodeId}`);\r\n        if (curNode.className === "wall" || curNode.className === "weight") {\r\n          nodeId++;\r\n          continue;\r\n        }\r\n        if (curNode.className === "visited-weight") {\r\n          curNode.className = "weight";\r\n          nodeId++;\r\n          continue;\r\n        }\r\n        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))\r\n          curNode.className = "unvisited";\r\n        if (nodeId === this.graph.startNode) curNode.className = "start";\r\n        if (nodeId === this.graph.endNode) curNode.className = "end";\r\n        nodeId++;\r\n      }\r\n    }\r\n  }\r\n\r\n  clearWalls() {\r\n    let nodeId = 1;\r\n    for (let i = 0; i < this.row; i++) {\r\n      for (let j = 0; j < this.col; j++) {\r\n        let curNode = document.getElementById(`${nodeId}`);\r\n        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))\r\n          curNode.className = "unvisited";\r\n        if (nodeId === this.graph.startNode) curNode.className = "start";\r\n        if (nodeId === this.graph.endNode) curNode.className = "end";\r\n        this.graph.removeWall(nodeId);\r\n        nodeId++;\r\n      }\r\n    }\r\n  }\r\n\r\n  clearWeights() {\r\n    let nodeId = 1;\r\n    for (let i = 0; i < this.row; i++) {\r\n      for (let j = 0; j < this.col; j++) {\r\n        let curNode = document.getElementById(`${nodeId}`);\r\n        if (curNode.className === "wall") {\r\n          nodeId++;\r\n          continue;\r\n        }\r\n        if (!(nodeId === this.graph.startNode || nodeId === this.graph.endNode))\r\n          curNode.className = "unvisited";\r\n        if (nodeId === this.graph.startNode) curNode.className = "start";\r\n        if (nodeId === this.graph.endNode) curNode.className = "end";\r\n        this.graph.removeWeight(nodeId);\r\n        nodeId++;\r\n      }\r\n    }\r\n  }\r\n\r\n  async drawPath(steps, speed) {\r\n    let path = [];\r\n    let currentNode = this.graph.endNode;\r\n    let node = document.getElementById(`${currentNode}`);\r\n    node.classList = "end";\r\n    while (parseInt(currentNode) !== this.graph.startNode) {\r\n      path.unshift(currentNode);\r\n      currentNode = steps[currentNode];\r\n      await sleep(speed);\r\n      let node = document.getElementById(`${currentNode}`);\r\n\r\n      if (this.isAlgComleted) {\r\n        node.className = "instant-path";\r\n      } else {\r\n        node.className = "path";\r\n      }\r\n      if (node.id === this.graph.startNode) node.className = "start";\r\n    }\r\n\r\n    node = document.getElementById(`${currentNode}`);\r\n    node.className = "start";\r\n    this.isAlgComleted = true;\r\n  }\r\n\r\n  nodeUpdate(nodeId) {\r\n    let node = document.getElementById(`${nodeId}`);\r\n    if (parseInt(nodeId) === this.graph.startNode) return;\r\n    if (this.graph.nodes[nodeId].isWall) return;\r\n    if (this.graph.nodes[nodeId].isWeight) {\r\n      node.className = "visited-weight";\r\n      return;\r\n    }\r\n    if (this.isAlgComleted) {\r\n      node.className = "instant-visit";\r\n      return;\r\n    }\r\n    node.className = "visited";\r\n  }\r\n\r\n  moveStartNode(ev) {\r\n    if (ev.target.id === "grid") return;\r\n    let oldNode = document.getElementById(`${this.graph.startNode}`);\r\n    oldNode.className = "unvisited";\r\n    ev.target.className = "start";\r\n    this.graph.startNode = parseInt(ev.target.id);\r\n    if (this.isAlgComleted) {\r\n      this.clearGrid();\r\n      this.currentAlgorithm(0);\r\n    }\r\n  }\r\n\r\n  moveEndNode(ev) {\r\n    if (ev.target.id === "grid") return;\r\n    let oldNode = document.getElementById(`${this.graph.endNode}`);\r\n    oldNode.className = "unvisited";\r\n    ev.target.className = "end";\r\n    this.graph.endNode = parseInt(ev.target.id);\r\n    if (this.isAlgComleted) {\r\n      this.clearGrid();\r\n      this.currentAlgorithm(0);\r\n    }\r\n  }\r\n  click_handler(ev) {\r\n    let node = ev.target.id;\r\n    if (ev.which === 1) {\r\n      if (\r\n        ev.target.className === "visited" ||\r\n        ev.target.className === "instant-visit" ||\r\n        ev.target.className === "path" ||\r\n        ev.target.className === "instant-path"\r\n      ) {\r\n        this.currentAlgorithm(0);\r\n      }\r\n\r\n      if (ev.target.className === "wall") {\r\n        ev.target.className = "unvisited";\r\n        this.graph.removeWall(node);\r\n        if (this.isAlgComleted) this.currentAlgorithm(0);\r\n        return;\r\n      }\r\n      if (ev.target.className !== "start" && ev.target.className !== "end") {\r\n        ev.target.className = "wall";\r\n        this.graph.addWall(parseInt(node));\r\n      }\r\n    }\r\n    if (this.isWheelPressed) {\r\n      if (\r\n        ev.target.className === "visited" ||\r\n        ev.target.className === "instant-visit" ||\r\n        ev.target.className === "path" ||\r\n        ev.target.className === "instant-path"\r\n      ) {\r\n        this.currentAlgorithm(0);\r\n      }\r\n      if (ev.target.className === "wall") {\r\n        ev.target.className = "weight";\r\n        this.graph.removeWall(node);\r\n        this.graph.addWeight(node);\r\n        if (this.isAlgComleted) this.currentAlgorithm(0);\r\n        return;\r\n      }\r\n      if (ev.target.className === "weight") {\r\n        ev.target.className = "unvisited";\r\n        this.graph.removeWeight(node);\r\n        if (this.isAlgComleted) this.currentAlgorithm(0);\r\n        return;\r\n      }\r\n      if (ev.target.className !== "start" && ev.target.className !== "end") {\r\n        ev.target.className = "weight";\r\n        this.graph.addWeight(parseInt(node));\r\n      }\r\n    }\r\n  }\r\n\r\n  addEventListeners() {\r\n    this.grid.addEventListener("mousedown", (e) => {\r\n      if (e.which === 2) {\r\n        this.isWheelPressed = true;\r\n        this.click_handler(e);\r\n        return;\r\n      }\r\n      if (parseInt(e.target.id) === this.graph.startNode) {\r\n        this.startPressed = true;\r\n        return;\r\n      }\r\n      if (parseInt(e.target.id) === this.graph.endNode) {\r\n        this.endPressed = true;\r\n        return;\r\n      }\r\n      this.isPressed = true;\r\n      this.click_handler(e);\r\n    });\r\n\r\n    this.grid.addEventListener("mouseover", (e) => {\r\n      if (this.isPressed) this.click_handler(e);\r\n      if (this.isWheelPressed) this.click_handler(e);\r\n      if (\r\n        e.target.className === "start" ||\r\n        e.target.className === "end" ||\r\n        e.target.className === "wall"\r\n      )\r\n        return;\r\n      if (this.startPressed) {\r\n        this.moveStartNode(e);\r\n      }\r\n      if (this.endPressed) {\r\n        this.moveEndNode(e);\r\n      }\r\n    });\r\n\r\n    window.addEventListener("mouseup", (e) => {\r\n      this.startPressed = false;\r\n      this.endPressed = false;\r\n      this.isPressed = false;\r\n      this.isWheelPressed = false;\r\n    });\r\n  }\r\n\r\n  addButtons() {\r\n    document.getElementById("btnStart").onclick = () => {\r\n      console.log("startbtn clisk");\r\n      this.isAlgComleted = false;\r\n      if (this.currentAlgorithm === null) {\r\n        this.currentAlgorithm = (speed = this.speed) => {\r\n          this.clearGrid();\r\n          bfs(\r\n            this.graph.nodes,\r\n            this.graph.startNode,\r\n            this.graph.endNode,\r\n            this.nodeUpdate.bind(this),\r\n            this.drawPath.bind(this),\r\n            speed\r\n          );\r\n        };\r\n      }\r\n      this.currentAlgorithm();\r\n    };\r\n\r\n    document.getElementById("btnClear").onclick = () => {\r\n      this.isAlgComleted = false;\r\n      this.clearGrid();\r\n    };\r\n\r\n    document.getElementById("btnClearWalls").onclick = () => {\r\n      this.isAlgComleted = false;\r\n      this.clearWalls();\r\n    };\r\n\r\n    document.getElementById("btnClearWeights").onclick = () => {\r\n      this.isAlgComleted = false;\r\n      this.clearWeights();\r\n    };\r\n\r\n    document.getElementById("instantSpeed").onclick = () => (this.speed = 0);\r\n\r\n    document.getElementById("fastSpeed").onclick = () => (this.speed = 1);\r\n\r\n    document.getElementById("mediumSpeed").onclick = () => (this.speed = 30);\r\n\r\n    document.getElementById("slowSpeed").onclick = () => (this.speed = 100);\r\n\r\n    document.getElementById("bfsAlgBtn").onclick = () => {\r\n      this.currentAlgorithm = (speed = this.speed) => {\r\n        this.clearGrid();\r\n        bfs(\r\n          this.graph.nodes,\r\n          this.graph.startNode,\r\n          this.graph.endNode,\r\n          this.nodeUpdate.bind(this),\r\n          this.drawPath.bind(this),\r\n          speed\r\n        );\r\n      };\r\n    };\r\n\r\n    document.getElementById("dfsAlgBtn").onclick = () => {\r\n      this.currentAlgorithm = (speed = this.speed) => {\r\n        this.clearGrid();\r\n        dfs(\r\n          this.graph.nodes,\r\n          this.graph.startNode,\r\n          this.graph.endNode,\r\n          this.nodeUpdate.bind(this),\r\n          this.drawPath.bind(this),\r\n          speed\r\n        );\r\n      };\r\n    };\r\n    document.getElementById("astarAlgBtn").onclick = () => {\r\n      this.currentAlgorithm = (speed = this.speed) => {\r\n        this.clearGrid();\r\n        astar(\r\n          this.graph.nodes,\r\n          this.graph.startNode,\r\n          this.graph.endNode,\r\n          this.nodeUpdate.bind(this),\r\n          this.drawPath.bind(this),\r\n          speed\r\n        );\r\n      };\r\n    };\r\n\r\n    document.getElementById("dijkstraAlgBtn").onclick = () => {\r\n      this.clearGrid();\r\n      this.currentAlgorithm = (speed = this.speed) => {\r\n        this.clearGrid();\r\n        dijkstra(\r\n          this.graph.nodes,\r\n          this.graph.startNode,\r\n          this.graph.endNode,\r\n          this.nodeUpdate.bind(this),\r\n          this.drawPath.bind(this),\r\n          speed\r\n        );\r\n      };\r\n    };\r\n  }\r\n}\r\n\r\nmodule.exports = Grid;\r\n\n\n//# sourceURL=webpack://require/./grid.js?'
        );

        /***/
      },

    /***/ "./index.js":
      /*!******************!*\
  !*** ./index.js ***!
  \******************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(
          'const Grid = __webpack_require__(/*! ../../../../../grid.js */ "./grid.js");\r\n\r\nconst newGrid = new Grid(28, 62);\r\nnewGrid.initialize();\r\n\n\n//# sourceURL=webpack://require/./index.js?'
        );

        /***/
      },

    /***/ "./utils/PriorityQueue.js":
      /*!********************************!*\
  !*** ./utils/PriorityQueue.js ***!
  \********************************/
      /***/ (module) => {
        eval(
          "class QueueElement {\r\n  constructor(element, priority) {\r\n    this.element = element;\r\n    this.priority = priority;\r\n  }\r\n}\r\n\r\nclass PriorityQueue {\r\n  constructor() {\r\n    this.items = [];\r\n  }\r\n\r\n  insert(element, priority) {\r\n    let queueElement = new QueueElement(element, priority);\r\n\r\n    let added = false;\r\n    for (let i = 0; i < this.items.length; i++) {\r\n      if (queueElement.priority < this.items[i].priority) {\r\n        this.items.splice(i, 0, queueElement);\r\n        added = true;\r\n        break;\r\n      }\r\n    }\r\n\r\n    if (!added) {\r\n      this.items.push(queueElement);\r\n    }\r\n  }\r\n\r\n  extract_minimum() {\r\n    return this.items.shift().element;\r\n  }\r\n\r\n  isEmpty() {\r\n    return this.items.length == 0;\r\n  }\r\n}\r\n\r\nmodule.exports = PriorityQueue;\r\n\n\n//# sourceURL=webpack://require/./utils/PriorityQueue.js?"
        );

        /***/
      },

    /***/ "./utils/sleep.js":
      /*!************************!*\
  !*** ./utils/sleep.js ***!
  \************************/
      /***/ (module) => {
        eval(
          "function sleep(ms) {\r\n  if (ms === 0) return;\r\n  return new Promise((resolve) => setTimeout(resolve, ms));\r\n}\r\nmodule.exports = sleep;\r\n\n\n//# sourceURL=webpack://require/./utils/sleep.js?"
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./index.js");
  /******/
  /******/
})();
