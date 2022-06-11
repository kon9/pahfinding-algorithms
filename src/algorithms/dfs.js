const sleep = require("../utils/sleep.js");
const nodeUpdate = require("../utils/nodeUpdate.js");
const drawPath = require("../utils/drawPath.js");

async function dfs(nodes, startNode, endNode, speed) {
  let stack = [startNode];
  let visited = { [startNode]: 1 };
  let steps = { [startNode]: null };
  function handleNode(node) {
    nodeUpdate(node, speed);
    let reversedNeighboursList = [...nodes[node]].reverse();
    reversedNeighboursList.forEach((neighbour) => {
      if (!visited[neighbour]) {
        steps[neighbour] = node;
        visited[neighbour] = 1;
        stack.push(neighbour);
      }
    });
  }

  while (stack.length) {
    await sleep(speed);
    let activeNode = stack.pop();
    if (nodes[activeNode].isWall) continue;
    handleNode(activeNode);
    if (activeNode === endNode) break;
  }
  drawPath(steps, startNode, endNode, speed);
}
module.exports = dfs;
