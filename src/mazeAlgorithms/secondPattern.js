function secondPattern(nodes, rowCount, colCount) {
  let nodeId = 1;
  for (let i = 1; i <= rowCount; i++) {
    for (let j = 1; j <= colCount; j++) {
      if (nodeId % 7 === 2) {
        removeWall(nodeId);
      }
      if (nodeId % 18 === 9) {
        removeWall(nodeId);
      }
      if (nodeId % 24 === 2) {
        addWall(nodeId);
        addWall(nodeId + 5);
        addWall(nodeId + 10);
      }
      if (i % 2 === 0) {
        nodeId++;
        continue;
      }
      if (j % 3 === 0) {
        nodeId++;
        continue;
      }
      if ((j + 8) % (i + 10) === 0) {
        addWeight(nodeId);
        addWeight(nodeId + 4);
        addWeight(nodeId + 6);
        addWeight(nodeId + 60);
        addWeight(nodeId + 120);
        nodeId++;
        continue;
      }

      addWall(nodeId);
      nodeId++;
    }
  }
  function addWeight(nodeId) {
    let currentNode = document.getElementById(`${nodeId}`);
    if (!currentNode) return;
    if (currentNode.className === "wall") return;
    if (currentNode.className !== "start" && currentNode.className !== "end") {
      nodes[nodeId].isWeight = true;
      currentNode.className = "weight";
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
  function addWall(nodeId) {
    let currentNode = document.getElementById(`${nodeId}`);
    if (!currentNode) return;
    if (currentNode.className === "wall") return;
    if (currentNode.className !== "start" && currentNode.className !== "end") {
      nodes[nodeId].isWall = true;
      currentNode.className = "wall";
    }
  }
}
module.exports = secondPattern;
