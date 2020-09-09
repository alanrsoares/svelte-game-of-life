<script lang="ts">
  import { getRainbowHSL } from "../lib/colors";
  import type { Point } from "../lib/types";
  import Cell from "./Cell.svelte";

  export let rows: boolean[][] = [];

  const handleMouseEvent = ({ y, x }: Point) => (e: MouseEvent) => {
    if (e.button === 0 && e.buttons === 1) {
      rows[y][x] = !rows[y][x];
    }
  };
</script>

<style>
  .container {
    border: solid 0.25rem #222;
    border-radius: 0.75rem;
    padding: 0.125rem;
    margin: auto;
  }

  .row {
    flex: 1;
    display: flex;
  }
</style>

<div class="container">
  {#each rows as cells, y}
    <div class="row">
      {#each cells as cell, x}
        <Cell
          isAlive={cell}
          on:mouseover={handleMouseEvent({ y, x })}
          on:mousedown={handleMouseEvent({ y, x })}
          bg={getRainbowHSL(y, x)} />
      {/each}
    </div>
  {/each}
</div>
