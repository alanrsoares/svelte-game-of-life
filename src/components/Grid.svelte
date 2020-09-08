<script lang="ts">
  import { getRainbowHSL } from "../lib/colors";
  import type { Point } from "../lib/types";

  export let rows = [];

  const handleMouseEvent = ({ y, x }: Point) => (e: MouseEvent) => {
    if (e.buttons !== 1) {
      return;
    }
    rows[y][x] = !rows[y][x];
  };
</script>

<style>
  :root {
    --cell-color: #222;
    --cell-size: 7px;
  }

  .container {
    border: solid 0.25rem var(--cell-color);
    border-radius: 0.75rem;
    padding: 0.125rem;
    margin: auto;
  }

  .cell {
    width: var(--cell-size);
    height: var(--cell-size);
    background-color: var(--cell-color);
    transition: background-color 0.1s ease-out;
    border-radius: 50%;
    margin: 1px;
  }

  .cell:hover {
    cursor: pointer;
  }

  .alive {
    background-color: var(--color);
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
        <div
          class="cell"
          class:alive={cell}
          on:mouseover={handleMouseEvent({ y, x })}
          on:mousedown={handleMouseEvent({ y, x })}
          style="--color:{getRainbowHSL(y, x)}" />
      {/each}
    </div>
  {/each}
</div>
