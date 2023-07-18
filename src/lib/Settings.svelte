<script>
  import { db } from './store';

  import DownloadNotesZip from './DownloadNotesZip.svelte';
  import ImportNotesZip from './ImportNotesZip.svelte';

  const handleDeleteCollection = async () => {
    const db$ = await db();
    // db$.notes.destroy();
    db$.notes.remove();
  };
</script>

<div class="px-2 text-white">
  <h2 style="font-size: 20px; line-height: 0;">nvAux Settings</h2>
  <div class="relative">
    {#await db().notes.find().exec()}
      <p>...waiting</p>
    {:then notes}
      <p><span class="text-gray-600">Total Notes: </span>{notes.length}</p>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}

    <ImportNotesZip />
    <DownloadNotesZip />
    <button
      on:click={handleDeleteCollection}
      class="btn"
      style="background: #b41111;">Reset Database</button
    >
  </div>
</div>
