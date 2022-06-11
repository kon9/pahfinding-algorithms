const sleep = require("../utils/sleep.js");
const nodeUpdate = require("../utils/nodeUpdate.js");
const drawPath = require("../utils/drawPath.js");

async function bfs(nodes, startNode, endNode, speed) {
  let queue = [startNode];
  let visited = { [startNode]: 1 };
  let distance = { [startNode]: 0 };
  let steps = { [startNode]: null };
  function handleNode(node) {
    nodeUpdate(node, speed);
    let neighboursList = nodes[node];
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
  drawPath(steps, startNode, endNode, speed);
}

module.exports = bfs;
