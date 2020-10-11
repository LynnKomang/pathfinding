const MAX_F = Number.MAX_SAFE_INTEGER;

export const initiateMap = (height, width, walls) => {
  const map = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      f: MAX_F,
      g: MAX_F,
      h: MAX_F,
      parent: null,
    }))
  );

  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      map[row][col].pos = { row, col };
      map[row][col].isWall = walls.has(row * width + col);
    }
  }

  return map;
};

const isValid = (map, row, col) => {
  return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
};

const calcDistance = (q, successor) => {
  return q.pos.row === successor.pos.row || q.pos.col === successor.pos.col ? 1 : Math.SQRT2;
};

const calcH = (successor, goal) => {
  return Math.sqrt(
    (successor.pos.col - goal.pos.col) ** 2 + (successor.pos.row - goal.pos.row) ** 2
  );
};

const tracePath = (goal) => {
  const path = [];

  while (goal.parent != goal) {
    path.push(goal.pos);
    goal = goal.parent;
  }

  path.push(goal.pos);

  return path;
};

const checkSuccessor = (map, goal, open, closed, q, rowAdd, colAdd) => {
  let wasFound = false;
  const coords = q.pos;

  if (isValid(map, coords.row + rowAdd, coords.col + colAdd)) {
    // A valid neighbor was found
    const successor = map[coords.row + rowAdd][coords.col + colAdd];

    if (successor === goal) {
      successor.parent = q;
      console.log('GOAL FOUND!');
      wasFound = true;
    } else if (!closed.has(successor) && !successor.isWall) {
      const newG = q.g + calcDistance(q, successor);
      const newH = calcH(successor, goal);
      const newF = newG + newH;

      if (successor.f === MAX_F || successor.f > newF) {
        open.add(successor);
        successor.f = newF;
        successor.h = newH;
        successor.g = newG;
        successor.parent = q;
      }
    }
  }

  return wasFound;
};

export const findPath = (map, start, goal) => {
  const open = new Set();
  const closed = new Set();

  start.parent = start;
  start.f = 0;
  start.g = 0;
  start.h = 0;

  open.add(start);

  let wasFound = false;

  while (open.size > 0 && !wasFound) {
    const q = open.values().next().value;
    open.delete(q);
    closed.add(q);

    // Generate all the neighbors of the current node
    for (let row = -1; row <= 1 && !wasFound; ++row) {
      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, 1, 0);
      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, -1, 0);
      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, 0, 1);
      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, 0, -1);

      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, 1, 1);
      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, -1, -1);
      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, -1, 1);
      wasFound = wasFound || checkSuccessor(map, goal, open, closed, q, 1, -1);
    }
  }

  if (!wasFound) {
    console.log('Unable to find path...');

    return [];
  }

  return tracePath(goal);
};

// const width = 10;
// const height = 10;

// const map = initiateMap(height, width);

// console.table(
//   findPath(
//     map,
//     map[Math.floor(Math.random() * map.length)][Math.floor(Math.random() * map[0].length)],
//     map[Math.floor(Math.random() * map.length)][Math.floor(Math.random() * map[0].length)]
//   )
// );
