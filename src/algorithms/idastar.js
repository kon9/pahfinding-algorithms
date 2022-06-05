const nodeUpdate = require("../utils/nodeUpdate");
const drawPath = require("../utils/drawPath.js");

async function iddfs(nodes, startNode, endNode, speed) {
  let steps = {};
  Object.keys(nodes).forEach((node) => {
    steps[node] = null;
  });
  let threshold = manhattan(startNode);

  function search(node, distance, threshold) {
    nodeUpdate(node, speed);
    let f = distance + manhattan(node);
    if (f > threshold) return f;
    if (node === endNode) return true;
    let min = Infinity;
    let neighboursList = [...nodes[node]];
    let cost = 1;
    if (nodes[node].isWeight) cost = 5;
    if (nodes[node].isWeight) cost = Infinity;
    for (let i = 0; i < neighboursList.length; i++) {
      let search_result = search(neighboursList[i], distance + cost, threshold);
      steps[neighboursList[i]] = node;
      if (search_result === true) return true;
      if (search_result < min) {
        min = search_result;
      }
    }
    return min;
  }

  while (true) {
    let search_result = search(startNode, 0, threshold);
    if (search_result === true) break;
    if (search_result === null) break;
    threshold = search_result;
  }
  drawPath(steps, startNode, endNode, speed);

  function manhattan(nodeId) {
    // let d1 = Math.pow(nodes[nodeId].positionX - nodes[endNode].positionX, 2);
    // let d2 = Math.pow(nodes[nodeId].positionY - nodes[endNode].positionY, 2);
    let d1 = Math.abs(nodes[nodeId].positionX - nodes[endNode].positionX);
    let d2 = Math.abs(nodes[nodeId].positionY - nodes[endNode].positionY);
    return d1 + d2;
  }
}

module.exports = iddfs;
