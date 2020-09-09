<script lang="ts">
  export let isAlive: boolean = false;
  export let bg: string = "#222";
</script>

<style>
  :root {
    --cell-bg: #222;
    --cell-size: 7px;
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
    style="--bg:{bg}"
    on:mouseover
    on:mousedown />
</template>
