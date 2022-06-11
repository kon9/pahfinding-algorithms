const sleep = require("../utils/sleep.js");
const nodeUpdate = require("../utils/nodeUpdate.js");
const drawPath = require("../utils/drawPath.js");
const PriorityQueue = require("../utils/PriorityQueue");

async function dijkstra(nodes, startNode, endNode, speed) {
  const queue = new PriorityQueue();
  let distances = {};
  let steps = {};
  Object.keys(nodes).forEach((node) => {
    distances[node] = Infinity;
    steps[node] = null;
  });
  distances[startNode] = 0;
  queue.insert(startNode, 1);

  function handleNode(node) {
    nodeUpdate(node, speed);
    let activeNodeDistance = distances[node];
    let neighbours = nodes[node];
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
        queue.insert(neighbourNode, activeNodeDistance);
      }
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
