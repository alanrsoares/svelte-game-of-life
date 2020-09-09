<script lang="ts">
  import { createGrid, createRandomGrid } from "./lib/utils";
  import { nextState } from "./lib/game";
  import { GRID_SIZE, sizes } from "./lib/config";

  import Grid from "./components/Grid.svelte";
  import Profiler from "./components/Profiler.svelte";
  import Controls from "./components/Controls.svelte";

  export let gridSize: number = 0;

  $: grid = createRandomGrid(sizes[gridSize].cells);

  let isPlaying = false;
  let rafId: number | undefined;
  let frames = 0;
  let startedPlayingAt: number | undefined;

  function handleReset() {
    grid = createGrid(GRID_SIZE);
  }

  function handleRandom() {
    grid = createRandomGrid(GRID_SIZE);
  }

  function handleNext() {
    grid = nextState(grid);
  }

  function handleToggleAtuplay() {
    if (isPlaying) {
      cancelAnimationFrame(rafId);
      isPlaying = false;
      frames = 0;
      startedPlayingAt = undefined;
      return;
    }
    isPlaying = true;
    startedPlayingAt = Date.now();
    step();
  }

  function step() {
    grid = nextState(grid);

    if (isPlaying) {
      frames++;
      rafId = requestAnimationFrame(step);
    }
  }

  const actions = {
    reset: handleReset,
    random: handleRandom,
    next: handleNext,
    toggleAutoPlay: handleToggleAtuplay,
  };
</script>

<style>
  :root {
    font-size: 16px;
  }

  main {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #3a3f4a;
    height: 100vh;
    padding: 2rem 0;
  }

  h1 {
    color: white;
  }

  .size-selector {
    margin-top: 1.5rem;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
  }

  .size-selector > button {
    background: #333;
    color: #eee;
    border: none;
    border-radius: 0.75rem;
    margin: 0 0.5rem;
    padding: 0.5rem;
  }
</style>

<main>
  <h1>Svelte Game of Life</h1>
  <Controls {actions} {isPlaying} bind:gridSize />

  <Grid sizeIndex={gridSize} rows={grid} />
  <Profiler {frames} {startedPlayingAt} />
</main>
