<script lang="ts">
  import { SIZES } from "../lib/config";

  export let isAlive: boolean = false;
  export let bg: string = "#222";
  export let sizeIndex: number = 0;

  $: cellSize = SIZES[sizeIndex].cell;
</script>

<style>
  :root {
    --cell-bg: #222;
    --cell-size: 0.25rem;
  }
  .cell {
    width: var(--cell-size);
    height: var(--cell-size);
    background-color: var(--cell-bg);
    transition: background-color 0.1s ease-out;
    border-radius: 50%;
    margin: 1px;
  }

  .cell:hover {
    cursor: pointer;
  }

  .alive {
    background-color: var(--bg);
  }
</style>

<template>
  <div
    class="cell"
    class:alive={isAlive}
    style="--bg:{bg};--cell-size:{cellSize}"
    on:mouseover
    on:mousedown />
</template>
