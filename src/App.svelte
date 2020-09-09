<script lang="ts">
  import { createGrid, createRandomGrid } from "./lib/utils";
  import { nextState } from "./lib/game";
  import { SIZES } from "./lib/config";

  import Grid from "./components/Grid.svelte";
  import Profiler from "./components/Profiler.svelte";
  import Controls from "./components/Controls.svelte";

  export let gridSize: number = 0;

  let isPlaying = false;
  let rafId: number | undefined;
  let frames = 0;
  let startedPlayingAt: number | undefined;

  $: cells = SIZES[gridSize].grid;
  $: grid = createRandomGrid(cells);

  const actions = {
    reset() {
      grid = createGrid(cells);
    },
    random() {
      grid = createRandomGrid(cells);
    },
    next() {
      grid = nextState(grid);
    },
    play() {
      actions.next();

      if (isPlaying) {
        frames++;
        rafId = requestAnimationFrame(actions.play);
      }
    },
    incrementGridSize() {
      gridSize++;
    },
    decrementGridSize() {
      gridSize--;
    },
    toggleAutoPlay() {
      if (isPlaying) {
        cancelAnimationFrame(rafId);
        isPlaying = false;
        frames = 0;
        startedPlayingAt = undefined;
        return;
      }
      isPlaying = true;
      startedPlayingAt = Date.now();
      actions.play();
    },
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
</style>

<main>
  <h1>Svelte Game of Life</h1>
  <Controls {actions} {isPlaying} bind:gridSize />
  <Grid sizeIndex={gridSize} {grid} />
  <Profiler {frames} {startedPlayingAt} />
</main>
