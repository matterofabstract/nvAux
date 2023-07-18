<script>
  import OmniBar from './lib/OmniBar.svelte';
  import NoteList from './lib/NoteList.svelte';
  import ResizeHandle from './lib/ResizeHandle.svelte';
  import NoteDetail from './lib/NoteDetail.svelte';
  import StatusBar from './lib/StatusBar.svelte';
</script>

<main class="w-screen h-screen overflow-hidden flex flex-col">
  <OmniBar />
  <NoteList />
  <ResizeHandle />
  <NoteDetail />
  <StatusBar />
</main>
