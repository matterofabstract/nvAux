<script>
  import { createEventDispatcher } from 'svelte';

  export let note;
  export let x = 0;
  export let y = 0;

  const dispatch = createEventDispatcher();

  function handleDelete() {
    dispatch('delete', note);
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<div 
  class="context-menu" 
  style="position: fixed; left: {x}px; top: {y}px;"
>
  <button on:click={handleDelete}>Delete</button>
  <button on:click={handleClose}>Close</button>
</div>

<style>
  .context-menu {
    background: var(--app-omni-background);
    border: 1px solid var(--app-statusbar-border);
    border-radius: 4px;
    padding: 5px;
    z-index: 1000;
  }

  button {
    display: block;
    width: 100%;
    padding: 5px 10px;
    text-align: left;
    background: transparent;
    border: none;
    color: var(--text-color);
    cursor: pointer;
  }

  button:hover {
    background: var(--app-notelist-odd-background);
  }
</style>
