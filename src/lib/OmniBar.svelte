<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import IconXcircle from './IconXcircle.svelte';

  import { omniMode, omniText, selectedNote, db, bodyText } from './store';

  let omniInput;

  onMount(() => omniInput.focus());

  const clearSelection = (e) => {
    if (e.keyCode === 27) {
      omniText.set('');
      bodyText.set('');
      omniInput.focus();
    }
  };

  const handleTitleEnter = (e) => {
    if ($omniText === '') return;
    e.keyCode === 13 && addNote();
  };

  const addNote = async () => {
    const db$ = await db();
    await db$.notes.findOne({ selector: { name: $omniText } }).exec().then((note) => {
      omniMode.set('edit');
      if (note) {
        console.log('note found so lets edit it note: ', note);
        selectedNote.set(note);
        omniText.set(note.name);
        bodyText.set(note.body);
        return;
      } else {
        console.log('no note found so lets create one');
        db$.notes
          .insert({
            guid: uuidv4(),
            name: $omniText,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          })
          .then((note) => {
            selectedNote.set(note);
            omniMode.set('edit');
            bodyText.set('');
          });
        return;
      }
    }).then(
      setTimeout(() => {
        document.getElementById('body-editor')?.focus();
      }, 50),
    );
  };
</script>

<svelte:window on:keydown={clearSelection} />

<div
  class="omnibar flex items-center border-box"
  style="background-color: var(--app-omni-background); height: 42px; padding-left: 10px;"
>
  <div class="input-wrapper flex-grow flex items-center">
    <input
      id="omni-input"
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
        type="button"
        aria-label="Clear Search"
        class="bg-transparent flex items-center px-2 leading-none outline-none"
        on:click={() => {
          $omniText = '';
          $selectedNote = '';
          document.getElementById('omni-input').focus();
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
  button[type="button"] {
    color: #404856;
  }
  button[type="button"]:hover {
    color: #ffffff7d;
  }
</style>
