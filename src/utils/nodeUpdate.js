async function nodeUpdate(nodeId, speed) {
  let node = document.getElementById(`${nodeId}`);
  if (
    node.className === "start" ||
    node.className === "end" ||
    node.className === "wall"
  )
    return;
  if (node.className === "weight" || node.className === "visited-weight") {
    node.className = "visited-weight";
    return;
  }
  if (speed === 0) {
    node.className = "instant-visit";
    return;
  }
  node.className = "visited";
}
module.exports = nodeUpdate;
