<script>
  import OmniBar from './lib/OmniBar.svelte';
  import NoteList from './lib/NoteList.svelte';
  import ResizeHandle from './lib/ResizeHandle.svelte';
  import NoteDetail from './lib/NoteDetail.svelte';
</script>

<main class="w-screen h-screen flex justify-center flex-col">
  <OmniBar />
  <NoteList />
  <ResizeHandle />
  <NoteDetail />
</main>
