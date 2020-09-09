<script lang="ts">
  import FaSync from "svelte-icons/fa/FaSync.svelte";
  import FaRandom from "svelte-icons/fa/FaRandom.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import FaPause from "svelte-icons/fa/FaPause.svelte";
  import FaStepForward from "svelte-icons/fa/FaStepForward.svelte";
  import FaMinus from "svelte-icons/fa/FaMinus.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";

  import { sizes } from "../lib/config";

  import Button from "./Button.svelte";

  const NO_OP = () => {};

  export let isPlaying: boolean = false;
  export let gridSize: number = 0;

  export let actions = {
    reset: NO_OP,
    random: NO_OP,
    next: NO_OP,
    toggleAutoPlay: NO_OP,
    incrementGridSize: NO_OP,
    decrementGridSize: NO_OP,
  };
</script>

<style>
  .controls {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    width: 20rem;
  }

  .control-icon {
    height: 1rem;
  }
</style>

<template>
  <div class="controls">
    <Button bg="darkslateblue" label="reset" on:click={actions.reset}>
      <div class="control-icon">
        <FaSync />
      </div>
    </Button>
    <Button bg="darkslategray" label="random" on:click={actions.random}>
      <div class="control-icon">
        <FaRandom />
      </div>
    </Button>
    <Button bg="teal" disabled={isPlaying} label="next" on:click={actions.next}>
      <div class="control-icon">
        <FaStepForward />
      </div>
    </Button>
    <Button
      bg={isPlaying ? 'darkred' : 'darkgreen'}
      label={isPlaying ? 'pause' : 'play'}
      on:click={actions.toggleAutoPlay}>
      <div class="control-icon">
        <svelte:component this={isPlaying ? FaPause : FaPlay} />
      </div>
    </Button>
  </div>
  <label class="size-selector">
    <Button
      disabled={isPlaying}
      bg="#555"
      on:click={actions.decrementGridSize}
      buttonSize="2.5rem">
      <div class="control-icon">
        <FaMinus style="transform:scale(1.5)" />
      </div>
    </Button>
    <input
      type="range"
      name="board-size"
      bind:value={gridSize}
      min={0}
      max={sizes.length - 1}
      step={1}
      disabled={isPlaying} />
    <Button
      disabled={isPlaying}
      bg="#444"
      on:click={actions.incrementGridSize}
      buttonSize="2.5rem">
      <div class="control-icon">
        <FaPlus />
      </div>
    </Button>
  </label>
</template>
