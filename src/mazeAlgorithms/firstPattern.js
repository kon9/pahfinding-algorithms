function firstPattern(nodes, rowCount, colCount) {
  let nodeId = 1;
  for (let i = 1; i <= rowCount; i++) {
    for (let j = 1; j <= colCount; j++) {
      if (nodeId % 10 === 1) {
        addWall(nodeId);
      }
      if (nodeId % 14 === 3) {
        addWall(nodeId);
      }
      if (i % 2 === 0) {
        nodeId++;
        continue;
      }
      if (j % 3 === 0) {
        nodeId++;
        continue;
      }

      addWall(nodeId);
      nodeId++;
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
module.exports = firstPattern;
