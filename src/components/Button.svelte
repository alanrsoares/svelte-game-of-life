<script lang="ts">
  import { opacify, lighten } from "polished";

  export let label: string;
  export let bg = "#333";
  export let disabled: boolean;
  export let buttonSize: string = "3.75rem";

  const background = lighten(0.05, bg);
  const borderColor = opacify(-0.6, bg);
</script>

<style>
  :root {
    --button-radius: 50%;
  }

  button {
    color: white;
    background-color: var(--color);
    border: none;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: var(--button-radius);
    outline: none;
    transition: all 0.15s ease-in;
    cursor: pointer;
    padding: 0.25rem;
  }

  button:hover {
    box-shadow: 0 0 0 4px var(--border-color);
    border-width: 2px;
  }

  button:focus {
    box-shadow: 0 0 0 4px var(--border-color);
    font-weight: 600;
  }

  button:disabled {
    background-color: var(--border-color);
    box-shadow: none;
    cursor: not-allowed;
  }
</style>

<button
  on:click
  {disabled}
  style="--color:{background};--border-color:{borderColor};--button-size:{buttonSize}"
  aria-label={label}>
  <slot>{label}</slot>
</button>