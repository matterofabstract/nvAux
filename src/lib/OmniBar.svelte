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
    await db$.notes.insert({
      guid: uuidv4(),
      name: $omniText,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }).then((note) => {
      selectedNote.set(note)
      omniMode.set('edit');
    }).then(() => document.getElementById('body-editor').focus());
  };
</script>

<svelte:window on:keydown={clearSelection}/>

<div class="omnibar flex items-center">
  <!-- <ImportNotesZip />
  <DownloadNotesZip /> -->
  <div class="input-wrapper flex-grow">
    <div class="icon left" >
      {#if $omniMode === 'search'}
        <IconSearch />
      {:else}
        <IconEdit />
      {/if}
    </div>
    {#if $omniText !== ''}
      <button
        class="icon right"
        on:click={() => {
          $omniText = '';
          $selectedNote = '';
        }}
      >
        <IconXcircle />
      </button>
    {/if}


  <input
    bind:this={omniInput}
    bind:value={$omniText}
    on:keydown={handleTitleEnter}
    on:focus={omniInput.select()}
    type="text"
    class="flex-grow py-0.5 px-1"
    placeholder="Search or Create"
  />
  </div>
  <div class="flex items-center" style="margin: 0 3px">
    <IconSettings />
  </div>
</div>

<style>
  .omnibar {
    box-sizing: border-box;
    padding-right: 3px;
    border-bottom: 1px solid #959595;
    background: linear-gradient(0deg, rgba(206, 206, 207, 1) 0%, rgba(228, 227, 229, 1) 100%);
  }
  .input-wrapper {
    position: relative;
    padding: 5px;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #747474;
    border-radius: 5px;
    padding: 2px 4px 2px 20px;
  }
  .icon {
    position: absolute;
    color: #4b4b4b;
  }
  .left {
    top: 8px;
    left: 10px;
  }
  .right {
    top: 13.5px;
    right: 3px;
    background: transparent;
    cursor: pointer;
  }
  .right:hover {
    color: #202020;
  }
</style>
