import type { Grid } from "./types";

let withColors = false;

export const range = (to: number) =>
  [...new Array(to)].map((_, i) => Boolean(i));

export const createGrid = (size: number): Grid => {
  return range(size)
    .fill(withColors = !withColors)
    .map((_x, _i, row) => row.slice());
}

export const createRandomGrid = (size: number, fillPercentage: number = Math.random()): Grid => {
  return createGrid(size).map((row) => row.map(() => Math.random() <= fillPercentage));
}

export const calculateFrameRate = (
  ticks = 0,
  startedAt = Date.now(),
  now = Date.now()
) => (startedAt ? Math.ceil(ticks / ((now - startedAt) / 1000)) : null);

export const camelToSnakeCase = (s: string) =>
  s.replace(/([A-Z])/g, (x) => `-${x.toLocaleLowerCase()}`);

/**
 * converts a key-value object into a custom css properties
 *
 * @param obj
 * { foo: "bar", bar: "baz"}
 *
 * @example
 *  toCssProps({ color: "white", background: "black", fontSize: 10 });
 *  // "--color:white;--background:black;--font-size:10"
 */
export const toCssProps = (obj: Record<string, string | number>) =>
  Object.entries(obj)
    .map(([k, v]) => `--${camelToSnakeCase(k)}:${v}`)
    .join(";");
