<script lang="ts">
  import { calculateFrameRate } from "../lib/utils";

  export let frames = 0;
  export let startedPlayingAt = Date.now();

  $: frameRate = calculateFrameRate(frames, startedPlayingAt, Date.now());
  $: color =
    frameRate < 24 ? "crimson" : frameRate < 48 ? "orange" : "darkgreen";

  $: opacity = Number(Boolean(frameRate && !isNaN(frameRate)));
</script>

<style>
  div {
    margin: 1em;
    border: solid 0.2em var(--color);
    background-color: var(--color);
    border-radius: 50%;
    color: white;
    width: 4em;
    text-align: center;
    transition: all 0.3s ease-in;
    height: 4em;
    width: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    text-shadow: 0.1em 0.1em 0.1em #333;
    opacity: var(--opacity);
  }
</style>

<div style="--color:{color};--opacity:{opacity}">{frameRate}fps</div>
