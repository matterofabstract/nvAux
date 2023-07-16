<script>
  import { noteListHeight } from './store';
  import mousePosition from '../utils/mousePosition';

  let dragging = false;

  const startResize = () => (dragging = true);
  const stopResize = () => (dragging = false);

  const handleResize = () => {
    if (!dragging) return;
    noteListHeight.set($mousePosition.y >= 55 && $mousePosition.y - 55);
    // TODO now check for page size and never allow the resize bar to go past the floor!
    return;
  };
</script>

<svelte:window
  on:mouseup={stopResize}
  on:mousemove={handleResize}
  on:touchend={stopResize}
  on:touchmove={handleResize}
/>

<div
  on:mousedown={startResize}
  on:touchstart={startResize}
  class="w-full resize-bar select-none"
  role="button"
  tabindex="-1"
/>

<style>
  .resize-bar {
    height: 10px;
    cursor: row-resize;
    background: #1f1f1f;
  }
</style>
