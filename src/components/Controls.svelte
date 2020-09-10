<script lang="ts">
  import FaSync from "svelte-icons/fa/FaSync.svelte";
  import FaRandom from "svelte-icons/fa/FaRandom.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import FaPause from "svelte-icons/fa/FaPause.svelte";
  import FaStepForward from "svelte-icons/fa/FaStepForward.svelte";
  import FaMinus from "svelte-icons/fa/FaMinus.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";

  import { SIZES } from "../lib/config";

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

  let buttonSize = "2rem";
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

  .size-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    background-color: rgba(50, 50, 50, 0.6);
  }

  .range {
    appearance: none;
    cursor: pointer;
    border-radius: 0.75rem;
    height: 0.25rem;
    outline: none;
    margin: 0 0.5rem;
    transition: all 0.15s ease-in;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .range:focus {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
  }

  .range:disabled {
    cursor: not-allowed;
    background-color: rgba(255, 255, 255, 0.4);
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
  <label class="size-selector" for="grid-size">
    <Button
      {buttonSize}
      disabled={isPlaying || gridSize < 1}
      bg="#555"
      on:click={actions.decrementGridSize}
      label="decrease grid size">
      <div class="control-icon">
        <FaMinus style="transform:scale(1.5)" />
      </div>
    </Button>
    <input
      class="range"
      type="range"
      name="grid-size"
      bind:value={gridSize}
      min={0}
      max={SIZES.length - 1}
      step={1}
      disabled={isPlaying}
      aria-disabled={String(isPlaying)} />
    <Button
      {buttonSize}
      disabled={isPlaying || gridSize >= SIZES.length - 1}
      bg="#555"
      on:click={actions.incrementGridSize}
      label="increase grid size">
      <div class="control-icon">
        <FaPlus />
      </div>
    </Button>
  </label>
</template>
