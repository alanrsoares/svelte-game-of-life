import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    gridSize: 4,
  },
});

export default app;
