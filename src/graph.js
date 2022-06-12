class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(value, x, y) {
    this.nodes[value] = [];
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

  removeWall(node) {
    this.nodes[node].isWall = false;
  }

  addWeight(node) {
    this.nodes[node].isWeight = true;
  }

  removeWeight(node) {
    this.nodes[node].isWeight = false;
  }
}

module.exports = Graph;
