<script lang="ts">
  import { DEAD_CELL_COLOR, SIZES } from "lib/config";
  import { toCssProps } from "lib/utils";

  export let isAlive: boolean = false;
  export let bg: string = DEAD_CELL_COLOR;
  export let sizeIndex: number = 0;

  $: cellSize = SIZES[sizeIndex].cell;

  $: style = toCssProps({ bg, cellSize });
</script>

<div class:alive={isAlive} {style} on:mouseover on:mousedown />

<style>
  :root {
    --cell-size: 0.25rem;
  }
  div {
    width: var(--cell-size);
    height: var(--cell-size);
    background-color: var(--bg);
    transition: background-color 0.1s ease-out;
    border-radius: 50%;
    margin: 1px;
  }

  div:hover {
    cursor: pointer;
  }

  .alive {
    background-color: var(--bg);
  }
</style>
