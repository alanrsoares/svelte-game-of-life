<script lang="ts">
  import { getRainbowHSL } from "lib/colors";
  import type { Point, Grid } from "lib/types";
  import { DEAD_CELL_COLOR, SIZES } from "lib/config";

  import Cell from "./Cell.svelte";
  import GridContainer from "./GridContainer.svelte";

  export let grid: Grid = [];
  export let sizeIndex: number = 0;

  $: gridSize = SIZES[sizeIndex].grid;

  const handleMouseEvent = ({ y, x }: Point) => (e: MouseEvent) => {
    if (e.button === 0 && e.buttons === 1) {
      grid[y][x] = !grid[y][x];
    }
  };
</script>

<GridContainer>
  {#each grid as cells, y}
    <div class="row">
      {#each cells as isAlive, x}
        <Cell
          {sizeIndex}
          {isAlive}
          on:mouseover={handleMouseEvent({ y, x })}
          on:mousedown={handleMouseEvent({ y, x })}
          bg={isAlive ? getRainbowHSL(y, x, gridSize) : DEAD_CELL_COLOR}
        />
      {/each}
    </div>
  {/each}
</GridContainer>

<style>
  .row {
    flex: 1;
    display: flex;
  }
</style>
