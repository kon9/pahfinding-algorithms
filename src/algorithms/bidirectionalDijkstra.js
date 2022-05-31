const sleep = require("../utils/sleep.js");
const PriorityQueue = require("../utils/PriorityQueue");

async function bidirectionalDijkstra(
  nodes,
  startNode,
  endNode,
  nodeUpdate,
  drawPath,
  speed
) {
  const firstQueue = new PriorityQueue();
  const secondQueue = new PriorityQueue();
  let firstDistances = {};
  let secondDistances = {};
  let visited = {};
  let firstSteps = {};
  let secondSteps = {};
  let middleNode = {};
  let nodesKeys = Object.keys(nodes);
  nodesKeys.forEach((node) => {
    firstDistances[node] = Infinity;
    secondDistances[node] = Infinity;
    firstSteps[node] = null;
    secondSteps[node] = null;
    visited[node] = false;
  });
  firstDistances[startNode] = 0;
  secondDistances[endNode] = 0;
  firstQueue.insert(startNode, 1);
  secondQueue.insert(endNode, 1);

  function handleNode(node, queue, distances, steps) {
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
        queue.insert(neighbourNode, activeNodeDistance);
      }
    });
    visited[node] = true;
  }

  while (!firstQueue.isEmpty() && !secondQueue.isEmpty()) {
    let currentNodeFromStart = firstQueue.extract_minimum();
    let currentNodeFromEnd = secondQueue.extract_minimum();
    if (visited[currentNodeFromStart]) {
      middleNode = firstSteps[currentNodeFromStart];
      handleNode(currentNodeFromStart, firstQueue, firstDistances, firstSteps);
      currentNodeFromStart = firstQueue.extract_minimum();
      handleNode(currentNodeFromStart, firstQueue, firstDistances, firstSteps);
      break;
    }
    if (visited[currentNodeFromEnd]) {
      middleNode = secondSteps[currentNodeFromEnd];
      handleNode(currentNodeFromEnd, secondQueue, secondDistances, secondSteps);
      currentNodeFromEnd = secondQueue.extract_minimum();
      handleNode(currentNodeFromEnd, secondQueue, secondDistances, secondSteps);
      break;
    }
    handleNode(currentNodeFromStart, firstQueue, firstDistances, firstSteps);
    handleNode(currentNodeFromEnd, secondQueue, secondDistances, secondSteps);
    await sleep(speed);
  }
  drawPath(firstSteps, startNode, middleNode, speed);
  drawPath(secondSteps, endNode, middleNode, speed);

  //Single queue implementation, but i don't know when to stop searching and how to draw path
  //
  // const queue = new PriorityQueue();
  // let distances = {};
  // let visited = {};
  // let steps = {};
  // let nodesKeys = Object.keys(nodes);
  // nodesKeys.forEach((node) => {
  //   distances[node] = Infinity;
  //   steps[node] = null;
  //   visited[node] = false;
  // });
  // distances[startNode] = 0;
  // distances[endNode] = 0;
  // queue.insert(startNode, 1);
  // queue.insert(endNode, 1);

  // function handleNode(node) {
  //   nodeUpdate(node);
  //   let activeNodeDistance = distances[node];

  //   let neighbours = nodes[node].slice(0, 5);
  //   neighbours.forEach((neighbourNode) => {
  //     let currentNeighbourDistance = distances[neighbourNode];
  //     let newNeighbourDistance;
  //     if (!nodes[node].isWall) {
  //       if (nodes[node].isWeight) {
  //         newNeighbourDistance = activeNodeDistance + 5;
  //       } else {
  //         newNeighbourDistance = activeNodeDistance + 1;
  //       }
  //     } else newNeighbourDistance = Infinity;
  //     if (newNeighbourDistance < currentNeighbourDistance) {
  //       distances[neighbourNode] = newNeighbourDistance;
  //       steps[neighbourNode] = node;
  //       if (!visited[neighbourNode]) {
  //         queue.insert(neighbourNode, activeNodeDistance);
  //         visited[neighbourNode] = true;
  //       }
  //     }
  //     visited[node] = true;
  //   });
  // }

  // while (!queue.isEmpty()) {
  //   let currentNode = queue.extract_minimum();
  //   await sleep(speed);

  //   handleNode(currentNode);
  //   if (currentNode === 6) break;
  // }
}

module.exports = bidirectionalDijkstra;
