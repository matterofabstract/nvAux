<script>
  import { onMount } from 'svelte';
  import { formatDistanceToNow } from 'date-fns';

  import { selectedNote, bodyText, db, omniText, omniMode, noteListHeight } from './store';

  let db$;
  let isMouseDown = false;
  let noteList = [];

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

  // const deleteNote = async (note) => await note.remove();
  const formatDate = (str) => formatDistanceToNow(new Date(str).getTime(), { addSuffix: true });
  const handleSelectNoteMouseOver = (id) => isMouseDown && handleSelectNote(id);

  const handleDeleteNote = async (note) => {
    await note.remove();
    selectedNote.set({});
    omniText.set('');
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
        omniText.set(n.name);
        bodyText.set(n.body);
      });
  };
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
          tabindex="-1"
          on:dblclick={() => document.getElementById('body-editor').focus()}
        >
          {note.name}
          {#if note.body !== ''}<span style="color: #505050">—</span>{/if}
          <span class="mute" style={$selectedNote === note && 'color: #fff;'}>
            {note.body ?? ''}
          </span>
        </span>

        <span class="meta" style={$selectedNote === note && 'background: #2252a0; color: white;'}>
          {formatDate(note.updatedAt)}
          <!-- <button on:click={() => handleDeleteNote(note)}>[del]</button> -->
        </span>
      </li>
    {/each}
  {/await}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--app-omni-background);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
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
</style>
