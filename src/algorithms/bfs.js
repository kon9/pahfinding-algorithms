const sleep = require("../utils/sleep.js");

async function bfs(nodes, startNode, endNode, nodeUpdate, drawPath, speed) {
  let queue = [startNode];
  let visited = { [startNode]: 1 };
  let distance = { [startNode]: 0 };
  let steps = { [startNode]: null };
  function handleNode(node) {
    nodeUpdate(node);
    let neighboursList = nodes[node].slice(0, 5);
    neighboursList.forEach((neighbour) => {
      if (!visited[neighbour]) {
        visited[neighbour] = 1;
        queue.push(neighbour);
        steps[neighbour] = node;
        distance[neighbour] = distance[node] + 1;
      }
    });
  }
  while (queue.length) {
    await sleep(speed);
    let activeNode = queue.shift();
    if (nodes[activeNode].isWall) continue;
    handleNode(activeNode);
    if (activeNode === endNode) break;
  }
  drawPath(steps, speed);
}

module.exports = bfs;
