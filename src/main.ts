import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    gridSize: 2,
  },
});

export default app;
