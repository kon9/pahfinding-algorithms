class Graph {
  constructor() {
    this.nodes = [];
    this.startNode = 710;
    this.endNode = 719;
  }

  addNode(value, x, y) {
    this.nodes[value] = [];
    this.nodes[value].isEnd = false;
    this.nodes[value].isWall = false;
    this.nodes[value].isWeight = false;
    this.nodes[value].positionX = x;
    this.nodes[value].positionY = y;
  }

  addEdge(node1, node2) {
    this.nodes[node2].push(node1);
    this.nodes[node1].push(node2);
  }

  addWall(node) {
    this.nodes[node].isWall = true;
  }

  addWeight(node) {
    this.nodes[node].isWeight = true;
  }

  removeWeight(node) {
    this.nodes[node].isWeight = false;
  }

  removeWall(node) {
    this.nodes[node].isWall = false;
  }

  setStartNode(value) {
    this.startNode = value;
  }

  setEndNode(value) {
    this.endNode = value;
  }

  changeNodeStartState(value) {
    this.nodes[value][0].isStart = !this.nodes[value][0].isStart;
  }

  changeNodeEndState(value) {
    this.nodes[value][1] = !this.nodes[value][1];
  }
}

module.exports = Graph;
