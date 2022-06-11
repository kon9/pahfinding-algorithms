const sleep = require("./sleep.js");

async function drawPath(steps, start, end, speed) {
  let currentNode = end;
  let node = document.getElementById(`${end}`);
  node.className = "end";
  while (parseInt(currentNode) !== start) {
    await sleep(speed);
    currentNode = steps[currentNode];
    let node = document.getElementById(`${currentNode}`);
    if (speed === 0) {
      if (
        node.className === "weight" ||
        node.className === "visited-weight" ||
        node.className === "instant-weight-path"
      )
        node.className = "instant-weight-path";
      else node.className = "instant-path";
    } else {
      if (
        node.className === "weight" ||
        node.className === "visited-weight" ||
        node.className === "instant-weight-path"
      )
        node.className = "weight-path";
      else node.className = "path";
    }
  }
  node = document.getElementById(`${start}`);
  node.className = "start";
  node = document.getElementById(`${end}`);
  node.className = "end";
}
module.exports = drawPath;
