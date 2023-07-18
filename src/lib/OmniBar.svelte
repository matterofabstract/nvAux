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

  let omniInput, showMenu;

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

  const toggleMenu = () => {
    showMenu = !showMenu;
  };
</script>

<svelte:window on:keydown={clearSelection} />

<div
  class="omnibar flex items-center border-box border-b"
  style="border-color: #2e3338; background-color: #181a1c; height: 42px"
>
  <!-- <ImportNotesZip />
  <DownloadNotesZip /> -->
  <div class="relative" style="padding: 0 4px 0 8px;">
    <button on:click={toggleMenu} class="bg-transparent flex items-center" style="color: #444953;">
      <IconSettings />
    </button>
    {#if showMenu}
      <ul
        class="absolute"
        style="min-width: 180px; border: 1px solid rgba(255,255,255,0.1); z-index: 9999; border-radius: 6px; background: #0e0f11c4; top: 33px; left: 10px; color: white; list-style-type: none; margin: 0; padding: 0; -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);"
      >
        <li><div style="width: 10spx;" /> About nvAux</li>
        <li><div style="width: 10spx;" /> Leave Feedback...</li>
        <li class="break" />

        <li><div style="width: 10spx;" /> Import</li>
        <li><div style="width: 10spx;" /> Export (.zip)</li>
        <li class="break" />
        <li><div style="width: 10spx;" /> Reset Database</li>
      </ul>
    {/if}
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
    font-size: 14px;
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

  li {
    height: 30px;
    display: flex;
    align-items: center;
    padding: 6px 10px;
    margin-bottom: 1px;
    box-sizing: border-box;
    color: #adadad;
  }
  li.break {
    height: 1px; padding: 0; margin: 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  }
</style>
