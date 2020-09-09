<script lang="ts">
  import FaSync from "svelte-icons/fa/FaSync.svelte";
  import FaRandom from "svelte-icons/fa/FaRandom.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import FaPause from "svelte-icons/fa/FaPause.svelte";
  import FaStepForward from "svelte-icons/fa/FaStepForward.svelte";

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
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    width: 20rem;
  }
</style>

<main>
  <h1>Svelte Game of Life</h1>
  <div class="controls">
    <Button color="darkslateblue" label="reset" on:click={handleReset}>
      <FaSync />
    </Button>
    <Button color="darkslategray" label="random" on:click={handleRandom}>
      <FaRandom />
    </Button>
    <Button
      color="teal"
      disabled={isPlaying}
      label="next"
      on:click={handleNext}>
      <FaStepForward />
    </Button>
    <Button
      color={isPlaying ? 'darkred' : 'darkgreen'}
      label={isPlaying ? 'pause' : 'play'}
      on:click={handleToggleAtuplay}>
      <svelte:component this={isPlaying ? FaPause : FaPlay} />
    </Button>
  </div>
  <Grid rows={grid} />
  <Profiler {frames} {startedPlayingAt} />
</main>
