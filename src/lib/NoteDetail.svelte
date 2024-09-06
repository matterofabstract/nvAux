<script>
  // @ts-nocheck

  import { addRxPlugin } from 'rxdb';
  import { onMount } from 'svelte';
  import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

  import { selectedNote, bodyText } from './store';

  import { debounce } from '../utils/debounce';
  import { isEmptyObject } from '../utils/isEmptyObject';

  import Settings from './Settings.svelte';

  // let innerHeight;

  onMount(async () => {
    addRxPlugin(RxDBUpdatePlugin);
  });

  const handleDebounceSave = debounce(() => updateNote(), 300);

  const updateNote = async () => {
    // @ts-ignore
    await $selectedNote?.incrementalModify((data) => {
      data.body = $bodyText;
      data.updatedAt = new Date().getTime();
      return data;
    });
  };

  let innerWidth, innerHeight;
</script>

<!-- <svelte:window bind:innerHeight /> -->

<div
  bind:clientWidth={innerWidth}
  bind:clientHeight={innerHeight}
  class="relative overflow-hidden h-full overflow-y-auto"
  style="margin-bottom: 35px; background: var(--app-notedetail-background);"
>
  {#if isEmptyObject($selectedNote)}
    <div class="relative w-full h-full flex items-center justify-center">
      <h2 style="font-size: 18px; color: #525962">No Note Selected</h2>
    </div>
  {:else if $selectedNote.guid === '00000000-0000-0000-0000-000000000000'}
    <Settings />
  {:else}
    <textarea
      id="body-editor"
      class="block w-full h-full relative no-resize border-0 outline-none border-box bg-transparent"
      bind:value={$bodyText}
      on:keyup={handleDebounceSave}
    />
  {/if}
</div>

<style>
  textarea {
    padding: 4px 13px;
    color: rgba(255, 255, 255, 0.831);
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.3;
    border-radius: none;
    height: 100%;
  }
</style>
