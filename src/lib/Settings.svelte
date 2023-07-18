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

<div class="text-white" style="padding: 0 15px;">
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
  <p>Hack on <a href="https://github.com/matterofabstract/nvaux" target="_blank" style="color: #ed0078; text-decoration: underline;">nvAux @ GitHub</a></p>
</div>
