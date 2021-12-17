import fsInput from './input'


type Vertex = [number, number];

const range = (length: number) => Array.from({ length }).fill(0) as number[];

const isSameVertex = (positionA: Vertex, positionB: Vertex) =>
  positionA[0] === positionB[0] && positionA[1] === positionB[1];

const getShortestDistance = (values: number[][]) => {
  const distances: number[][] = range(values.length).map(() =>
    range(values.length).map(() => Infinity)
  );
  const START: Vertex = [0, 0];
  const inRange = ([x, y]: Vertex) =>
    y < values.length && x < values[0].length && y >= 0 && x >= 0;
  const getValue = ([x, y]: Vertex) => values[y][x];
  const getDistance = ([x, y]: Vertex) => distances[y][x];
  const setDistance = ([x, y]: Vertex, value: number) =>
    (distances[y][x] = value);
  const getAdjacent = ([x, y]: Vertex): Vertex[] =>
    [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ]
      .map(([dx, dy]) => [x + dx, y + dy] as Vertex)
      .filter(inRange);

  const END: Vertex = [values[0].length - 1, values.length - 1];
  let unvisited = values.flatMap((row, y) =>
    row.map((value, x) => [x, y] as Vertex)
  );

  setDistance(START, 0);
  console.time("last 1000");
  console.time("all");

  while (unvisited.length) {
    if (!(unvisited.length % 1000)) {
      console.timeEnd("last 1000");
      console.time("last 1000");
      console.log(unvisited.length + "...");
    }
    const vertex = unvisited.reduce((min, current) =>
      getDistance(min) > getDistance(current) ? current : min
    );
    const adjacent = getAdjacent(vertex).filter((a) =>
      unvisited.some((b) => isSameVertex(a, b))
    );
    adjacent.forEach((neighbour) => {
      setDistance(
        neighbour,
        Math.min(
          getDistance(neighbour),
          getDistance(vertex) + getValue(neighbour)
        )
      );
    });

    unvisited = unvisited.filter((x) => !isSameVertex(vertex, x));
  }
  console.timeEnd("all");
  return getDistance(END);
};

const partTwo = async (val: string[]) => {
  const values = val.map(s => s.split('').map(Number))

  const normalize = (value: number) => value % 9 || 9;

  const scaled: number[][] = range(5).flatMap((_, scale) =>
    values
      .map((row) =>
        range(5).flatMap((_, scale) =>
          row.map((value) => normalize(value + scale))
        )
      )
      .map((row) => row.map((x) => normalize(x + scale)))
  );

  return getShortestDistance(scaled);
};


(async () => {
  console.log({
    partTwo: await partTwo(fsInput),
  });
})()

export default partTwo
