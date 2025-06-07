import { sleep, getNeighbors } from './utils.js';

export async function dijkstra(gridObj, speed) {
  const start = gridObj.startNode;
  const end = gridObj.endNode;
  const grid = gridObj.grid;

  if (!start || !end) return;

  start.distance = 0;
  const unvisited = [];

  for (let row of grid) {
    for (let node of row) {
      unvisited.push(node);
    }
  }

  while (unvisited.length > 0) {
    unvisited.sort((a, b) => a.distance - b.distance);
    const closest = unvisited.shift();

    if (closest.isWall) continue;
    if (closest.distance === Infinity) break;

    closest.visited = true;
    const cell = document.getElementById(closest.getId());
    if (!closest.isStart && !closest.isEnd) {
      cell.classList.add('visited');
      await sleep(speed);
    }

    if (closest === end) {
      reconstructPath(end);
      return;
    }

    for (let neighbor of getNeighbors(grid, closest)) {
      const alt = closest.distance + neighbor.weight;
      if (alt < neighbor.distance) {
        neighbor.distance = alt;
        neighbor.previous = closest;
      }
    }
  }
}

async function reconstructPath(end) {
  let current = end.previous;
  const path = [];
  while (current && !current.isStart) {
    path.push(current);
    current = current.previous;
  }
  for (let node of path.reverse()) {
    document.getElementById(node.getId()).classList.add('path');
    await sleep(50);
  }
}
