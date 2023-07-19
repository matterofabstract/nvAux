<script>
  import { addRxPlugin } from 'rxdb';
  import { onMount } from 'svelte';
  import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

  import { db, selectedNote, bodyText } from './store';

  import { debounce } from '../utils/debounce';
  import { isEmptyObject } from '../utils/isEmptyObject';

  import Settings from './Settings.svelte';

  let innerHeight;
  let db$;

  onMount(async () => {
    addRxPlugin(RxDBUpdatePlugin);
    db$ = await db();
    db$.notes.findOne($selectedNote.guid).exec();
  });

  const handleDebounceSave = debounce(() => !isEmptyObject($selectedNote) && updateNote(), 500);

  const updateNote = async () => {
    await $selectedNote.update({
      $set: {
        body: $bodyText,
        updatedAt: new Date().getTime(),
      },
    });
  };
</script>

<svelte:window bind:innerHeight />

<div class="relative overflow-hidden h-full overflow-y-auto" style="margin-bottom: 35px; background: var(--app-notedetail-background);">
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
      on:keydown={handleDebounceSave}
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
