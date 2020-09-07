<script lang="ts">
  import { createGrid, createRandomGrid } from "./lib/utils";
  import { nextState } from "./lib/game";
  import { GRID_SIZE } from "./lib/config";

  import Grid from "./components/Grid.svelte";
  import Button from "./components/Button.svelte";
  import Profiler from "./components/Profiler.svelte";

  export let gridSize: number = 0;

  let grid = createRandomGrid(gridSize);
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
    background-color: #333;
    height: 100vh;
  }

  h1 {
    color: white;
  }

  .controls {
    margin: 0.75rem;
    display: flex;
    justify-content: space-around;
    width: 360px;
  }
</style>

<main>
  <h1>Svelte Game of Life</h1>
  <div class="controls">
    <Button color="darkslateblue" text="reset" on:click={handleReset} />
    <Button text="random" on:click={handleRandom} />
    <Button
      color={isPlaying ? 'darkred' : 'darkgreen'}
      text={isPlaying ? 'pause' : 'play'}
      on:click={handleToggleAtuplay} />
  </div>
  <Grid rows={grid} />
  <Profiler {frames} {startedPlayingAt} />
</main>
