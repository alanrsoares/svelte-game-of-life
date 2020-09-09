<script lang="ts">
  import { getRainbowHSL } from "../lib/colors";
  import type { Point, Grid } from "../lib/types";
  import { SIZES } from "../lib/config";

  import Cell from "./Cell.svelte";

  export let grid: Grid = [];
  export let sizeIndex: number = 0;

  $: gridSize = SIZES[sizeIndex].grid;

  const handleMouseEvent = ({ y, x }: Point) => (e: MouseEvent) => {
    if (e.button === 0 && e.buttons === 1) {
      grid[y][x] = !grid[y][x];
    }
  };
</script>

<style>
  .container {
    border: solid 0.25rem #222;
    border-radius: 0.75rem;
    padding: 0.125rem;
    margin: 1.75rem auto;
  }

  .row {
    flex: 1;
    display: flex;
  }
</style>

<div class="container">
  {#each grid as cells, y}
    <div class="row">
      {#each cells as cell, x}
        <Cell
          {sizeIndex}
          isAlive={cell}
          on:mouseover={handleMouseEvent({ y, x })}
          on:mousedown={handleMouseEvent({ y, x })}
          bg={getRainbowHSL(y, x, gridSize)} />
      {/each}
    </div>
  {/each}
</div>
