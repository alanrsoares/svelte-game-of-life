<script lang="ts">
  import FaSync from "svelte-icons/fa/FaSync.svelte";
  import FaRandom from "svelte-icons/fa/FaRandom.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import FaPause from "svelte-icons/fa/FaPause.svelte";
  import FaStepForward from "svelte-icons/fa/FaStepForward.svelte";

  import Button from "./Button.svelte";

  const NO_OP = () => {};

  export let isPlaying: boolean = false;
  export let actions = {
    reset: NO_OP,
    random: NO_OP,
    next: NO_OP,
    toggleAutoPlay: NO_OP,
  };
</script>

<style>
  .controls {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    width: 20rem;
  }
</style>

<template>
  <div class="controls">
    <Button bg="darkslateblue" label="reset" on:click={actions.reset}>
      <FaSync />
    </Button>
    <Button bg="darkslategray" label="random" on:click={actions.random}>
      <FaRandom />
    </Button>
    <Button bg="teal" disabled={isPlaying} label="next" on:click={actions.next}>
      <FaStepForward />
    </Button>
    <Button
      bg={isPlaying ? 'darkred' : 'darkgreen'}
      label={isPlaying ? 'pause' : 'play'}
      on:click={actions.toggleAutoPlay}>
      <svelte:component this={isPlaying ? FaPause : FaPlay} />
    </Button>
  </div>
</template>
