<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import IconXcircle from './IconXcircle.svelte';

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
</script>

<svelte:window on:keydown={clearSelection} />

<div
  class="omnibar flex items-center border-box"
  style="background-color: #181a1c; height: 42px; padding-left: 10px;"
>
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
    color: #88959f;
  }
</style>
