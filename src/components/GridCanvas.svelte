<script lang="ts">
  import { onMount } from "svelte";

  import { DEAD_CELL_COLOR, SIZES } from "lib/config";
  import type { Grid } from "lib/types";
  import { getRainbowHSL } from "lib/colors";

  export let grid: Grid = [];
  export let sizeIndex: number = 0;

  let canvas: HTMLCanvasElement | undefined;
  let ctx: CanvasRenderingContext2D | undefined;

  $: cellSizeStr = SIZES[sizeIndex].cell;
  $: gridSize = SIZES[sizeIndex].grid;

  $: cellSize = Number(cellSizeStr.replace("rem", "")) * 16;

  $: if (ctx && grid) {
    draw(ctx, grid);
  }

  $: cellRadius = cellSize / 2;

  const offset = (n: number) => n * (cellSize + 2) + cellRadius + 1;

  function draw(ctx: CanvasRenderingContext2D, grid: Grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grid.forEach((row, y) => {
      row.forEach((isAlive, x) => {
        const cellColor = isAlive
          ? getRainbowHSL(y, x, gridSize)
          : DEAD_CELL_COLOR;

        ctx.fillStyle = cellColor;
        ctx.beginPath();
        ctx.arc(offset(x), offset(y), cellRadius, 0, 2 * Math.PI, false);
        ctx.fill();
      });
    });
  }

  $: if (canvas && gridSize && cellSize) {
    const length = gridSize * (cellSize + 2);

    if (length && length !== canvas.height) {
      canvas.height = length;
      canvas.width = length;
      draw(ctx, grid);
    }
  }

  onMount(() => {
    ctx = canvas.getContext("2d");
  });
</script>

<style>
  canvas {
    border: solid 0.25rem #222;
    border-radius: 0.75rem;
    padding: 0.125rem;
    margin: 1.75rem auto;
  }
</style>

<canvas bind:this={canvas} />
