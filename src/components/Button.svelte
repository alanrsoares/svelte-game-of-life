<script lang="ts">
  import { opacify, lighten } from "polished";

  export let text: string;
  export let color = "#333";

  const background = lighten(0.05, color);
  const borderColor = opacify(-0.6, color);
</script>

<style>
  button {
    color: white;
    background-color: var(--color);
    border: none;
    width: 6rem;
    height: 4rem;
    border-radius: 12px;
    border: solid 2px var(--color);
    outline: none;
    text-transform: uppercase;
    transition: all 0.15s ease-in;
    cursor: pointer;
  }

  button:hover {
    box-shadow: 0 0 0 4px var(--border-color);
    border-width: 2px;
  }

  button:focus {
    box-shadow: 0 0 0 4px var(--border-color);
    font-weight: 600;
  }
</style>

<button on:click style="--color:{background}; --border-color:{borderColor}">
  {text}
</button>
