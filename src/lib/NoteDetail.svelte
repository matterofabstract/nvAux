<script>
  import { addRxPlugin } from 'rxdb';
  import { onMount } from 'svelte';
  import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

  import { selectedNote, bodyText, noteListHeight } from './store';

  import { debounce } from '../utils/debounce';
  import { isEmptyObject } from '../utils/isEmptyObject';

  let innerHeight;

  onMount(() => addRxPlugin(RxDBUpdatePlugin));

  const handleDebounceSave = debounce(() => !isEmptyObject($selectedNote) && updateNote(), 230);

  const updateNote = async () => {
    await $selectedNote.update({
      $set: {
        body: $bodyText,
        updatedAt: new Date().getTime(),
      },
    });
  };

  $: noteEditorHeightOffset = 80 + $noteListHeight;
</script>

<svelte:window bind:innerHeight />

<div class="relative overflow-hidden" >
  {#if !isEmptyObject($selectedNote)}
    <textarea
      id="body-editor"
      class="block w-full h-full relative no-resize border-0 outline-none border-box"
      bind:value={$bodyText}
      on:keydown={handleDebounceSave}
    />
  {:else}
    <div class="placeholder relative">
      <h2>No Note Selected</h2>
    </div>
  {/if}
</div>

<style>
  h2 {
    font-size: 18px;
    color: #808080;
  }
  textarea {
    padding: 6px;
    background: #1a1a1a;
    color: rgba(255, 255, 255, 0.831);
    font-size: 16px;
    border-radius: none;
    height: 100%;
  }
  .placeholder {
    top: -20%;
  }
</style>
