<script lang="ts">
  import FaSync from "svelte-icons/fa/FaSync.svelte";
  import FaRandom from "svelte-icons/fa/FaRandom.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import FaPause from "svelte-icons/fa/FaPause.svelte";
  import FaStepForward from "svelte-icons/fa/FaStepForward.svelte";
  import FaMinus from "svelte-icons/fa/FaMinus.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";

  import { SIZES } from "lib/config";
  import type { Preset } from "lib/game";
  import { presets } from "lib/game";

  import Button from "./Button.svelte";

  const NO_OP = (...args: any) => {};

  export let rules = "B3/S23"
  export let mutation = 0.0002;
  export let isPlaying: boolean = false;
  export let gridSize: number = 0;
  export let renderMode: "canvas" | "dom" = "dom";

  export let actions = {
    reset: NO_OP,
    random: NO_OP,
    next: NO_OP,
    toggleAutoPlay: NO_OP,
    incrementGridSize: NO_OP,
    decrementGridSize: NO_OP,
    toggleRenderMode: NO_OP,
  };

  let buttonSize = "2rem";

  const setPreset = (preset: Preset) => _ => {
    rules = preset.rules
    actions.random(preset.gridFillPercentage)
    if (preset.mutation) mutation = preset.mutation
  }
</script>

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
    bg={isPlaying ? "darkred" : "darkgreen"}
    label={isPlaying ? "pause" : "play"}
    on:click={actions.toggleAutoPlay}
  >
    <div class="control-icon">
      <svelte:component this={isPlaying ? FaPause : FaPlay} />
    </div>
  </Button>
</div>
<div class="grid-render-controls">
  <div class="label">Grid size</div>
  <label class="size-selector">
    <Button
      {buttonSize}
      disabled={isPlaying || gridSize < 1}
      bg="#555"
      on:click={actions.decrementGridSize}
      label="decrease grid size"
    >
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
      aria-disabled={String(isPlaying)}
    />
    <Button
      {buttonSize}
      disabled={isPlaying || gridSize >= SIZES.length - 1}
      bg="#555"
      on:click={actions.incrementGridSize}
      label="increase grid size"
    >
      <div class="control-icon">
        <FaPlus />
      </div>
    </Button>
  </label>
  <div class="label">Mutation</div>
  <label class="size-selector">
    <Button
      {buttonSize}
      disabled={gridSize <= 0}
      bg="#555"
      on:click={_ => mutation -= 0.0001}
      label="decrease mutation odds"
    >
      <div class="control-icon">
        <FaMinus style="transform:scale(1.5)" />
      </div>
    </Button>
    <input
      class="range"
      type="range"
      bind:value={mutation}
      min={0}
      max={0.002}
      step={0.0001}
    />
    <Button
      {buttonSize}
      disabled={mutation >= 0.002}
      bg="#555"
      on:click={_ => mutation += 0.0001}
      label="increase mutation odds"
    >
      <div class="control-icon">
        <FaPlus />
      </div>
    </Button>
  </label>
  <div class="label">Rules</div>
  <div class="rules">
    <input
      bind:value={rules}
      pattern="^B\d+/S\d+$"
    />
    <ul class="presets">
      {#each presets as preset}
        <li on:mousedown={setPreset(preset)}>{preset.description}</li>
      {/each}
    </ul>
  </div>
  <div>
    <Button
      radius="md"
      label="render mode"
      on:click={actions.toggleRenderMode}
      bg={renderMode === "canvas" ? "darkgreen" : "darkred"}
    >
      {renderMode}
    </Button>
  </div>
</div>

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

  .grid-render-controls {
    display: flex;
    width: 320px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  div.label {
    width: 65px;
    color: #eee;
    display: flex;
    align-items: center;
  }

  .rules input {
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    height: 100%;
  }

  .rules input:focus {
    outline: none;
    border: 3px solid deepskyblue;
  }

  .rules input:invalid {
    border: 3px solid red;
  }

  .grid-render-controls > * {
    margin-bottom: 5px;
  }

  .rules {
    position: relative;
  }

  .presets {
    display: none;
    position: absolute;
    background: white;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    border-radius: 10px;
  }

  .rules input:focus + .presets {
    display: block;
  }

  .presets li {
    padding: 1rem;
    cursor: pointer;
  }

  .presets li:hover {
    background: rgba(0,0,0,0.1);
  }
</style>
