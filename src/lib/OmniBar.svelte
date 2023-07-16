<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import DownloadNotesZip from './DownloadNotesZip.svelte';
  import ImportNotesZip from './ImportNotesZip.svelte';
  import IconSearch from './IconSearch.svelte';
  import IconEdit from './IconEdit.svelte';
  import IconXcircle from './IconXcircle.svelte';
  import IconSettings from './IconSettings.svelte';

  import { omniMode, omniText, selectedNote, db } from './store';

  let omniInput;

  onMount(() => omniInput.focus());

  const clearSelection = (e) => {
    if (e.keyCode === 27) {
      omniText.set('');
      omniInput.focus();
    }
  };

  const handleTitleEnter = (e) => {
    if ($omniText === '') return;
    e.keyCode === 13 && addNote();
  };

  const addNote = async () => {
    const db$ = await db();
    await db$.notes
      .insert({
        guid: uuidv4(),
        name: $omniText,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      })
      .then((note) => {
        selectedNote.set(note);
        omniMode.set('edit');
      })
      .then(() => document.getElementById('body-editor').focus());
  };
</script>

<svelte:window on:keydown={clearSelection} />

<div class="omnibar flex items-center border-box border-b" style="border-color: #2e3338; background-color: #181a1c; height: 42px">
  <!-- <ImportNotesZip />
  <DownloadNotesZip /> -->
  <div class="flex items-center" style="padding: 0 4px 0 10px; color: #444953;">
    <IconSettings />
  </div>
  <!-- <div
    on:click={() => omniInput.focus()}
    on:keyup={() => omniInput.focus()}
    role="button"
    tabindex="-1"
    class="px-2"
    style="color: #444953;"
  >
    {#if $omniMode === 'search'}
      <IconSearch />
    {:else}
      <IconEdit />
    {/if}
  </div> -->

  <div class="input-wrapper flex-grow flex items-center">
    <input
      bind:this={omniInput}
      bind:value={$omniText}
      on:keydown={handleTitleEnter}
      on:focus={omniInput.select()}
      type="text"
      class="flex-grow py-0.5 px-1 flex-grow"
      placeholder="Search or Create"
    />
    {#if $omniText !== ''}
      <button
        class="bg-transparent flex items-center px-2 py-1.5"
        style="color: #404856;"
        on:click={() => {
          $omniText = '';
          $selectedNote = '';
        }}
      >
        <IconXcircle />
      </button>
    {/if}
  </div>
</div>

<style>
  input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 0px;
    font-size: 17px;
    background: transparent;
    color: white;
    height: 38px;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    color: #3e464d;
  }
</style>
