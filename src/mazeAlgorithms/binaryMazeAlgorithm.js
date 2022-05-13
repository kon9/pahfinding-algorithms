require("../PriorityQueue.js");

async function binaryMaze(nodes) {
  for (let i = 1; i < nodes.length; i++) {
    addWall(nodes[i][1]);
  }
  for (let i = 1; i < nodes.length; i++) {
    //await sleep(1);
    let direction = getRandomInt(0, 2);
    console.log(direction);
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

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.export.binaryMaze;
