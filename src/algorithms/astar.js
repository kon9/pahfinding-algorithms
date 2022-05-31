const sleep = require("../utils/sleep.js");
const PriorityQueue = require("../utils/PriorityQueue");

async function astar(nodes, startNode, endNode, nodeUpdate, drawPath, speed) {
  const queue = new PriorityQueue();
  let distances = {};
  let visited = {};
  let steps = {};
  let heuristic = {};
  let nodesKeys = Object.keys(nodes);
  nodesKeys.forEach((node) => {
    distances[node] = Infinity;
    steps[node] = null;
    heuristic[node] = Infinity;
    visited[node] = false;
  });
  heuristic[startNode] = manhattan(startNode);
  distances[startNode] = 0;
  queue.insert(startNode, manhattan(startNode));

  function handleNode(node) {
    nodeUpdate(node);
    let activeNodeDistance = distances[node];

    let neighbours = nodes[node].slice(0, 5);
    neighbours.forEach((neighbourNode) => {
      let currentNeighbourDistance = distances[neighbourNode];
      let newNeighbourDistance;
      if (!nodes[node].isWall) {
        if (nodes[node].isWeight) {
          heuristic[neighbourNode] = manhattan(neighbourNode) + 5;
          newNeighbourDistance = activeNodeDistance + 5;
        } else {
          heuristic[neighbourNode] = manhattan(neighbourNode);
          newNeighbourDistance = activeNodeDistance + 1;
        }
      } else newNeighbourDistance = Infinity;
      if (newNeighbourDistance < currentNeighbourDistance) {
        distances[neighbourNode] = newNeighbourDistance;
        steps[neighbourNode] = node;
        if (!visited[neighbourNode]) {
          queue.insert(neighbourNode, heuristic[neighbourNode]);
          visited[neighbourNode] = true;
        }
      }
    });
    visited[node] = true;
  }

  while (!queue.isEmpty()) {
    let currentNode = queue.extract_minimum();

    if (currentNode === endNode) {
      break;
    }
    await sleep(speed);

    handleNode(currentNode);
  }

  function manhattan(nodeId) {
    // let d1 = Math.pow(nodes[nodeId].positionX - nodes[endNode].positionX, 2);
    // let d2 = Math.pow(nodes[nodeId].positionY - nodes[endNode].positionY, 2);
    let d1 = Math.abs(nodes[nodeId].positionX - nodes[endNode].positionX);
    let d2 = Math.abs(nodes[nodeId].positionY - nodes[endNode].positionY);
    return d1 + d2;
  }
  drawPath(steps, startNode, endNode, speed);
}
module.exports = astar;
