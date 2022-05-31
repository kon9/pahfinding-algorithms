function randomMaze(nodes) {
  for (let i = 1; i < nodes.length; i++) {
    addWall(nodes[i][1]);
    addWall(nodes[i][0]);
  }
  addWall(nodes.length - 1);
  for (let i = 1; i < nodes.length; i++) {
    let direction = getRandomInt(1, 4);
    removeWall(nodes[i][direction]);
  }
  function addWall(nodeId) {
    let currentNode = document.getElementById(`${nodeId}`);
    if (!currentNode) return;
    if (currentNode.className === "wall") return;
    if (currentNode.className !== "start" && currentNode.className !== "end") {
      nodes[nodeId].isWall = true;
      currentNode.className = "wall";
    }
  }
  function removeWall(nodeId) {
    let currentNode = document.getElementById(`${nodeId}`);
    if (!currentNode) return;
    if (currentNode.className !== "start" && currentNode.className !== "end") {
      nodes[nodeId].isWall = false;
      currentNode.className = "unvisited";
    }
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.exports = randomMaze;
