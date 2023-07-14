<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import DownloadNotesZip from './DownloadNotesZip.svelte';
  import ImportNotesZip from './ImportNotesZip.svelte';
  import IconSearch from './IconSearch.svelte';
  import IconXcircle from './IconXcircle.svelte';

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

<div class="omnibar">
  <ImportNotesZip />
  <DownloadNotesZip />
  <div class="input-wrapper">
    <div class="icon left" >
      {#if $omniMode === 'search'}
        <IconSearch />
      {:else}
        [E]
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
    class="flex-grow py-0.5 px-1 m-1.5"
    placeholder="Search or Create"
  />
  </div>
</div>

<style>
  .omnibar {
    box-sizing: border-box;
    padding: 4px 3px 0 3px;
    height: 56px;
    border-bottom: 1px solid #8b8b8b;
    background: linear-gradient(0deg, rgba(206, 206, 207, 1) 0%, rgba(228, 227, 229, 1) 100%);
  }
  .input-wrapper {
    position: relative;
    padding: 5px;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #474747;
    border-radius: 5px;
    padding: 2px 4px 2px 20px;
  }
  .icon {
    position: absolute;
    color: #585858;
  }
  .left {
    top: 7px;
    left: 10px;
    width: 12px;
    height: 12px;
  }
  .right {
    color: #adadad;
    top: 8px;
    right: 9px;
    cursor: pointer;
    width: 14px;
    height: 14px;
  }
  .right:hover {
    color: #9b9b9b;
  }
</style>
