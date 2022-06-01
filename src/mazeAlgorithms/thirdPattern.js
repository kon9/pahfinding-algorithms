function thirdPattern(nodes, rowCount, colCount) {
  let nodeId = 1;
  for (let i = 1; i <= rowCount; i++) {
    for (let j = 1; j <= colCount; j++) {
      if ((j + 1000) % (i + 100) === 0) {
        addWall(nodeId);
        addWall(nodeId + 50);
        nodeId++;
        continue;
      }
      if ((j + 100) % (i + 20) === 0) {
        addWall(nodeId);
        addWall(nodeId + 7);
        nodeId++;
        continue;
      }
      if ((j + 88) % (i + 10) === 0) {
        addWeight(nodeId);
        addWeight(nodeId + 4);
        addWeight(nodeId + 60);
        addWeight(nodeId + 120);
        nodeId++;
        continue;
      }
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
module.exports = thirdPattern;
