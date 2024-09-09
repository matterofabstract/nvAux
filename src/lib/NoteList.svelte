<script>
  import { onMount, onDestroy } from 'svelte';
  import { formatDistanceToNow } from 'date-fns';

  import { selectedNote, bodyText, db, omniText, omniMode, noteListHeight } from './store';
  import FileListItemContextMenu from './FileListItemContextMenu.svelte';
  import { mousePosition } from '../utils/mousePosition';

  let db$;
  let isMouseDown = false;
  let noteList = [];

  let showContextMenu = false;
  let contextMenuNote = null;
  let contextMenuX = 0;
  let contextMenuY = 0;

  function handleClickOutside(event) {
    if (showContextMenu && !event.target.closest('.context-menu')) {
      handleCloseContextMenu();
    }
  }

  onMount(() => {
    const getNoteList = async () => {
      db$ = await db();
      db$.notes
        .find({
          selector: {
            $or: [{ name: { $regex: `.*${$omniText}.*` } }, { body: { $regex: `.*${$omniText}.*` } }],
          },
          sort: [{ updatedAt: 'desc' }],
        })
        .$.subscribe((notes) => (noteList = notes));
    };
    getNoteList();
  });

  $: omniText.subscribe((v) => {
    db$ &&
      !$selectedNote &&
      db$.notes
        .find({
          selector: {
            $or: [{ name: { $regex: `.*${v}.*` } }, { body: { $regex: `.*${v}.*` } }],
          },
          sort: [{ updatedAt: 'desc' }],
        })
        .$.subscribe((notes) => (noteList = notes));
  });

  const formatDate = (str) => formatDistanceToNow(new Date(str).getTime(), { addSuffix: true });
  const handleSelectNoteMouseOver = (id) => isMouseDown && handleSelectNote(id);

  const handleDeleteNote = async (event) => {
    const noteToDelete = event.detail;
    const db$ = await db();
    await db$.notes.findOne({ selector: { guid: noteToDelete.guid } }).remove();
    notes = notes.filter(n => n.guid !== noteToDelete.guid);
  };

  const handleSelectNote = (note) => {
    selectedNote.set(note);
    db$.notes
      .findOne({
        selector: {
          name: $selectedNote.name,
        },
      })
      .exec()
      .then((n) => {
        omniMode.set('edit');
        omniText.set(n?.name);
        bodyText.set(n?.body);
      });
  };

  function handleContextMenu(event, note) {
    event.preventDefault();
    showContextMenu = true;
    contextMenuNote = note;
    contextMenuX = event.clientX;
    contextMenuY = event.clientY;
  }

  function handleCloseContextMenu() {
    showContextMenu = false;
    contextMenuNote = null;
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<ul
  id="noteList"
  on:mousedown={() => (isMouseDown = true)}
  on:mouseup={() => (isMouseDown = false)}
  style="height: {$noteListHeight}px;"
>
  {#await noteList}
    Loading Notes...
  {:then results}
    {#each results as note}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <li
        on:click={() => handleSelectNote(note)}
        on:keydown={() => handleSelectNote(note)}
        on:mouseover={() => handleSelectNoteMouseOver(note)}
        style={$selectedNote === note && 'background: #2252a0; color: white;'}
      >
        <span
          class="elipsis"
          role="button"
          aria-label="Note Preview"
          tabindex="-1"
          on:dblclick={() => {
            const bodyEditor = document.getElementById('body-editor');
            if (bodyEditor instanceof HTMLTextAreaElement) {
              bodyEditor.focus();
              const len = bodyEditor.value.length;
              bodyEditor.setSelectionRange(len, len);
            }
          }}
        >
          {note.name}
          {#if note.body !== ''}<span style="color: #505050">—</span>{/if}
          <span class="mute" style={$selectedNote === note && 'color: #fff;'}>
            {note.body ?? ''}
          </span>
        </span>

        <span class="meta flex items-center" style={$selectedNote === note && 'background: #2252a0; color: white;'}>
          {formatDate(note.updatedAt)}
          <button 
            on:click|stopPropagation={(event) => handleContextMenu(event, note)} 
            class="bg-transparent flex items-center" 
            style="margin-left: 5px; color: {$selectedNote === note ? '#ffffff42' : '#7e848c66'};"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </span>
      </li>
    {/each}
  {/await}
</ul>

{#if showContextMenu}
  <FileListItemContextMenu
    note={contextMenuNote}
    x={contextMenuX}
    y={contextMenuY}
    on:delete={handleDeleteNote}
    on:close={() => showContextMenu = false}
  />
{/if}

<style>
  ul {
    margin: 0 6px 3px 6px;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--app-omni-background);
    border-radius: 8px;
    box-sizing: border-box;
  }
  li {
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 35px;
    padding: 10px;
    justify-content: space-between;
    font-family: Helvetica, sans-serif;
    user-select: none;
    box-sizing: border-box;
    color: rgb(205, 205, 205);
  }
  li:nth-child(odd) {
    background: var(--app-notelist-odd-background);
  }
  li:nth-child(even) {
    background: var(--app-notelist-even-background);
  }
  .meta {
    color: #43484f;
    white-space: nowrap;
    text-align: right;
    font-size: 13px;
  }
  .mute {
    color: #65676c;
  }
  .context-menu-wrapper {
    position: absolute;
    z-index: 1000;
  }
</style>
