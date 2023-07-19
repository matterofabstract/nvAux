<script>
  import { db, maximumFullScreen, showClock } from './store';

  import DownloadNotesZip from './DownloadNotesZip.svelte';
  import ImportNotesZip from './ImportNotesZip.svelte';
  import AbstractlyLogo from './AbstractlyLogo.svelte';

  const handleDeleteCollection = async () => {
    const db$ = await db();
    // db$.notes.destroy();
    localStorage.clear();
    db$.notes.remove();
    location.reload();
  };
</script>

<div class="text-white h-full" style="margin-bottom: 100px; padding: 5px 15px; margin: 0;">
  <span class="font-bold">nvAux Settings</span>
  <div class="relative">
    {#await db().notes.find().exec()}
      <p>...waiting</p>
    {:then notes}
      <p><span class="text-gray-400">Total Notes:</span> {notes.length}</p>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}

    <h3 class="font-bold" style="margin-top: 25px;">General Preferences</h3>

    <div>
      <label for="showClock"><input id="showClock" type="checkbox" bind:checked={$showClock} /> Show Clock</label>
    </div>
    <div>
      <label for="maxfullscreen"><input id="maxfullscreen" type="checkbox" bind:checked={$maximumFullScreen} /> Maximum Fullscreen</label>
    </div>

    <h3 class="font-bold" style="margin-top: 25px;">Import/Export Notes</h3>
    <p class="text-gray-400">You can import (and export) a zip file full of .md and .txt files.</p>

    <ImportNotesZip />
    <DownloadNotesZip />

    <h3 class="font-bold" style="margin-top: 25px;">Dangerzone</h3>

    <button
      on:click={handleDeleteCollection}
      class="btn"
      style="background: #b41111;">Reset Database</button
    >
  </div>

  <p style="margin-top: 100px;">
    Designed and Built by
    <span class="relative" style="display: inline-block; height: 30px; width: 80px; top: 13px;"><a href="https://abstractly.io" target="_blank">
      <AbstractlyLogo />
    </a></span> The Human Interface Company.
  </p>
  <p style="margin-top: 10px;">Hack on
    <a href="https://github.com/matterofabstract/nvaux" target="_blank" style="color: #ed0078; text-decoration: underline;">
      nvAux @ GitHub
    </a>
  </p>
</div>
