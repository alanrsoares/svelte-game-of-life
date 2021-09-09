<script lang="ts">
  import { createGrid, createRandomGrid } from "./lib/utils";
  import { defaultPreset, nextState, willLiveFactory } from "./lib/game";
  import { SIZES } from "./lib/config";

  import Profiler from "./components/Profiler.svelte";
  import Controls from "./components/Controls.svelte";
  import GridCanvas from "./components/GridCanvas.svelte";
  import GridDOM from "./components/GridDOM.svelte";

  export let gridSize: number = 0;

  let rules = defaultPreset.rules;
  let mutation = 0.0002;
  let isPlaying = false;
  let rafId: number | undefined;
  let frames = 0;
  let startedPlayingAt: number | undefined;
  let renderMode: "canvas" | "dom" = "canvas";

  $: willLive = willLiveFactory(rules, mutation);
  $: gridLength = SIZES[gridSize].grid;
  $: grid = createRandomGrid(gridLength, 0.2);
  $: GridComponent = renderMode === "canvas" ? GridCanvas : GridDOM;

  const actions = {
    reset() {
      grid = createGrid(gridLength);
    },
    random(fillPercentage: number | MouseEvent) {
      if (typeof fillPercentage === "object") {
        fillPercentage = Math.random();
      }

      grid = createRandomGrid(gridLength, fillPercentage);
    },
    next() {
      grid = nextState(grid, willLive);
    },
    play() {
      actions.next();

      if (isPlaying) {
        frames++;
        rafId = requestAnimationFrame(actions.play);
      }
    },
    incrementGridSize() {
      if (gridSize < SIZES.length - 1) {
        gridSize++;
      }
    },
    decrementGridSize() {
      if (gridSize > 0) {
        gridSize--;
      }
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
    toggleRenderMode() {
      renderMode = renderMode === "canvas" ? "dom" : "canvas";
    },
  };
</script>

<main>
  <h1>Svelte Game of Life</h1>
  <Controls
    {actions}
    bind:isPlaying
    bind:renderMode
    bind:gridSize
    bind:rules
    bind:mutation
  />
  <svelte:component this={GridComponent} sizeIndex={gridSize} {grid} />
  <Profiler {frames} {startedPlayingAt} />
</main>

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
