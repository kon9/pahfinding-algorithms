const sleep = require("../utils/sleep.js");
async function dfs(nodes, startNode, endNode, nodeUpdate, drawPath, speed) {
  let stack = [startNode];
  let visited = { [startNode]: 1 };
  let steps = { [startNode]: null };
  function handleNode(node) {
    nodeUpdate(node);

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
  drawPath(steps, speed);
}
module.exports = dfs;
