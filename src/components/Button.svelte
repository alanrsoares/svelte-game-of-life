<script lang="ts">
  import { opacify, lighten } from "polished";
  import { toCssProps } from "lib/utils";

  export let label: string;
  export let bg = "#333";
  export let disabled = false;
  export let buttonSize: string = "3.75rem";
  export let radius: "sm" | "md" | "lg" | "rd" = "rd";

  $: background = lighten(0.05, bg);
  $: borderColor = opacify(-0.6, bg);
  $: buttonRadius = (() => {
    switch (radius) {
      case "rd":
        return "50%";
      case "sm":
        return ".5rem";
      case "md":
        return ".75rem";
      case "lg":
        return "1rem";
    }
  })();

  $: style = toCssProps({
    background,
    borderColor,
    buttonSize,
    buttonRadius,
  });
</script>

<button on:click {disabled} {style} aria-label={label}>
  <slot>{label}</slot>
</button>

<style>
  :root {
    --button-radius: 50%;
  }

  button {
    color: white;
    background-color: var(--background);
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
