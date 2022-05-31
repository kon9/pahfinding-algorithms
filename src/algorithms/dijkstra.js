const sleep = require("../utils/sleep.js");
const PriorityQueue = require("../utils/PriorityQueue");

async function dijkstra(
  nodes,
  startNode,
  endNode,
  nodeUpdate,
  drawPath,
  speed
) {
  const queue = new PriorityQueue();
  let distances = {};
  let visited = {};
  let steps = {};
  let nodesKeys = Object.keys(nodes);
  nodesKeys.forEach((node) => {
    distances[node] = Infinity;
    steps[node] = null;
    visited[node] = false;
  });
  distances[startNode] = 0;
  queue.insert(startNode, 1);

  function handleNode(node) {
    nodeUpdate(node);
    let activeNodeDistance = distances[node];

    let neighbours = nodes[node].slice(0, 5);
    neighbours.forEach((neighbourNode) => {
      let currentNeighbourDistance = distances[neighbourNode];
      let newNeighbourDistance;
      if (!nodes[node].isWall) {
        if (nodes[node].isWeight) {
          newNeighbourDistance = activeNodeDistance + 5;
        } else {
          newNeighbourDistance = activeNodeDistance + 1;
        }
      } else newNeighbourDistance = Infinity;
      if (newNeighbourDistance < currentNeighbourDistance) {
        distances[neighbourNode] = newNeighbourDistance;
        steps[neighbourNode] = node;
        if (!visited[neighbourNode]) {
          queue.insert(neighbourNode, activeNodeDistance);
          visited[neighbourNode] = true;
        }
      }
      visited[node] = true;
    });
  }

  while (!queue.isEmpty()) {
    let currentNode = queue.extract_minimum();
    if (currentNode === endNode) {
      break;
    }
    await sleep(speed);

    handleNode(currentNode);
  }
  drawPath(steps, startNode, endNode, speed);
}

module.exports = dijkstra;
