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

export const getNeighbors = (grid: Grid, position: Point): number =>
  combinePositions(position).map(getIn(grid)).filter(Boolean).length;

export type WillLivePredicate = (
  isAlive: boolean,
  neighbors: number
) => boolean;

export const willLiveFactory = (
  rules: PresetRules,
  mutation: number
): WillLivePredicate => {
  return (alive: boolean, liveNeighbors: number) => {
    const survived = rules.survive(liveNeighbors);
    const spawned = rules.spawn(liveNeighbors);
    const mutate = Math.random() < mutation;
    const died = !survived;

    if (alive) {
      return !(died || (!spawned && mutate));
    } else {
      return spawned || (survived && mutate);
    }
  };
};

export const nextState = (grid: Grid, willLive: WillLivePredicate): Grid =>
  grid.map((row, y) =>
    row.map((column, x) =>
      willLive(Boolean(column), getNeighbors(grid, { y, x }))
    )
  );

export const toggle = ({ y, x }, current: boolean, grid: Grid): Grid => {
  const $grid = grid.slice();
  grid[y][x] = !current;
  return $grid;
};

type LabelledPredicate<T extends (x: number) => boolean> = T & {
  label: string;
};

type PresetRulePredicate = LabelledPredicate<(neighbors: number) => boolean>;

export type PresetRules = {
  spawn: PresetRulePredicate;
  survive: PresetRulePredicate;
};

export type Preset = {
  description: string;
  rules: PresetRules;
  gridFillPercentage: number;
  mutation?: number;
};

const isEqualTo = <T>(x: T) => {
  const inner = (y: T) => x === y;
  inner.label = String(x);
  return inner;
};

const isOneOf = <T>(xs: T[]) => {
  const inner = (y: T) => xs.includes(y);
  inner.label = xs.join("");
  return inner;
};

const isBetween = (min: number, max: number) => {
  const inner = (y: number) => y >= min && y <= max;
  inner.label = "";
  for (let i = min; i < max; i++) {
    inner.label = inner.label + String(i);
  }
  return inner;
};

export const presets: Preset[] = [
  {
    description: "Normal life",
    rules: {
      spawn: isEqualTo(3),
      survive: isOneOf([2, 3]),
    },
    gridFillPercentage: 0.2,
    mutation: 0.0002,
  },
  {
    description: "Inverted colors",
    rules: {
      spawn: isOneOf([0, 1, 2, 3, 4, 7, 8]),
      survive: isOneOf([0, 1, 2, 3, 4, 6, 7, 8]),
    },
    gridFillPercentage: 0.8,
    mutation: 0.0002,
  },
  {
    description: "High life",
    rules: {
      spawn: isOneOf([3, 6]),
      survive: isOneOf([2, 3]),
    },
    gridFillPercentage: 0.1,
    mutation: 0.0002,
  },
  {
    description: "Maze",
    rules: {
      spawn: isEqualTo(3),
      survive: isBetween(1, 5),
    },
    gridFillPercentage: 0.05,
    mutation: 0,
  },
  {
    description: "Mist",
    rules: {
      spawn: isOneOf([3, 4, 5, 8]),
      survive: isOneOf([0, 5, 6, 7, 8]),
    },
    gridFillPercentage: 0.175,
    mutation: 0.00005,
  },
  {
    description: "Growing cells",
    rules: {
      spawn: isOneOf([4, 5]),
      survive: isBetween(2, 5),
    },
    gridFillPercentage: 0.15,
    mutation: 0.0003,
  },
  {
    description: "Growing cells inverted colors",
    rules: {
      spawn: isOneOf([0, 1, 2, 7, 8]),
      survive: isOneOf([0, 1, 2, 5, 6, 7, 8]),
    },
    gridFillPercentage: 0.85,
    mutation: 0.0003,
  },
];

export const defaultPreset = presets[0];
