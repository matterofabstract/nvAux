<script>
  import { noteListHeight } from './store';

  let dragging = false;
  let start, initial = null;
  let y;

  $: height = 100;

  // const startResize = () => (dragging = true);
  const startResize = (type, event) => {
    event.preventDefault();
    dragging = true;
    start = event.pageY;
    initial = { y, height };
  };

  // const stopResize = () => (dragging = false);
  const stopResize = () => {
    dragging = false;
    start = null;
    initial = null;
  };

  const handleResize = (event) => {
    event.preventDefault();
    if (!dragging) return;
    const delta = start - event.pageY;
    height = initial.height - delta;
    $noteListHeight = height;
    return;
  };
</script>

<svelte:window on:mouseup={stopResize} on:mousemove={handleResize} on:mouseup={stopResize} />

<div
  on:mousedown={startResize.bind(this, 'left')}
  class="w-full resize-bar select-none row-resize"
  style="background: var(--app-resizer-background); height: 15px;"
  role="button"
  aria-label="Resize Note List"
  tabindex="-1"
/>
