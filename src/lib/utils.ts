import type { Grid } from "./types";

export const range = (to: number) =>
  [...new Array(to)].map((_, i) => Boolean(i));

export const createGrid = (size: number): Grid =>
  range(size)
    .fill(false)
    .map((_x, _i, row) => row.slice());

export const createRandomGrid = (size: number) =>
  createGrid(size).map((row) => row.map(() => Math.random() >= 0.8));

export const calculateFrameRate = (
  ticks = 0,
  startedAt = Date.now(),
  now = Date.now()
) => (startedAt ? Math.ceil(ticks / ((now - startedAt) / 1000)) : null);
