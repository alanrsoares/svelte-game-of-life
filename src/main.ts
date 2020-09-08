import { GRID_SIZE } from "./lib/config";

import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    gridSize: GRID_SIZE,
  },
});

export default app;
