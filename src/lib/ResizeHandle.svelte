<script>
  import { noteListHeight } from './store';
  import mousePosition from '../utils/mousePosition';

  let dragging = false;

  const startResize = () => dragging = true;
  const stopResize = () => dragging = false;

  const handleResize = () => {
    if (!dragging) return;
    noteListHeight.set($mousePosition.y >= 55 && $mousePosition.y - 55)
    // TODO now check for page size and never allow the resize bar to go past the floor!
    return;
  };
</script>

<svelte:window on:mouseup={stopResize} on:mousemove={handleResize} />

<div on:mousedown={startResize} class="w-full resize-bar select-none" role="button" tabindex="-1" />

<style>
  .resize-bar {
    background: linear-gradient(0deg, #e0e0e0 0%, #f8f8f8 100%);
    border: 1px solid #c6c6c6;
    height: 7px;
    cursor: row-resize;
  }
</style>
