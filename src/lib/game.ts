import type { Grid, Point } from "./types";

const newKey = (size: number) => (key: number) => {
  if (key === -1) {
    return size - 1;
  }
  if (key === size) {
    return 0;
  }
  return key;
};

const newKeys = (size: number, keys: number[]) => keys.map(newKey(size));

const combinePositions = ({ y, x }: Point): number[][] =>
  [-1, 0, 1].reduce(
    (acc, $y, _, offset) =>
      offset.reduce((b, $x) => ($x || $y ? [...b, [y + $y, x + $x]] : b), acc),
    []
  );

const getIn = (grid: Grid) => (position: number[]) =>
  (([y, x]) => grid[y][x])(newKeys(grid.length, position));

export const getNeighbours = (grid: Grid, position: Point): number =>
  combinePositions(position).map(getIn(grid)).filter(Boolean).length;

export type WillLive = (isAlive: boolean, neighbours: number) => boolean

export const willLiveFactory = (rules: string, mutation: number): WillLive => {
  const match = rules.match(/^B(\d+)\/S(\d+)$/)
  if (!match) return () => false
  let [, birthNums, survivalNums] = match

  const includedIn = (digits: string) => (liveNeighbors: number) =>
    digits.split("").includes(`${liveNeighbors}`)

  const shouldBeBorn = includedIn(birthNums)
  const shouldSurvive = includedIn(survivalNums)

  return (alive: boolean, liveNeighbors: number) => {
    const survived = shouldSurvive(liveNeighbors)
    const born = shouldBeBorn(liveNeighbors)
    const mutate = Math.random() < mutation
    const died = !survived

    if (alive) {
      return !(died || !born && mutate)
    } else {
      return born || survived && mutate
    }
  }
}

export const nextState = (grid: Grid, willLive: WillLive): Grid =>
  grid.map((row, y) =>
    row.map((column, x) =>
      willLive(Boolean(column), getNeighbours(grid, { y, x }))
    )
  );

export const toggle = ({ y, x }, current: boolean, grid: Grid): Grid => {
  const $grid = grid.slice();
  grid[y][x] = !current;
  return $grid;
};

export type Preset = {
  description: string
  rules: string
  gridFillPercentage: number
  mutation?: number
}

export const presets: Preset[] = [
  { description: "Default rules", rules: "B3/S23", gridFillPercentage: 0.2 },
  { description: "Inverted colors", rules: "B0123478/S01234678", gridFillPercentage: 0.8 },
  { description: "Growing cells", rules: "B45/S2345", gridFillPercentage: 0.15, mutation: 0.0003 },
  { description: "Growing cells inverted colors", rules: "B28/S5678", gridFillPercentage: 0.92, mutation: 0.0003 },
]
