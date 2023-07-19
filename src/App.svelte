<script>
  import OmniBar from './lib/OmniBar.svelte';
  import NoteList from './lib/NoteList.svelte';
  import ResizeHandle from './lib/ResizeHandle.svelte';
  import NoteDetail from './lib/NoteDetail.svelte';
  import StatusBar from './lib/StatusBar.svelte';

  import { fullScreen } from './lib/store';
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center {$fullScreen ? '' : 'p-2'}">
  {#if !$fullScreen}
    <div style="text-align: center;">
      <h1 style=" font-size: 40px; font-weight: 600">nvAux</h1>
      <p style="max-width: 500px; margin-bottom: 60px;">Capture and retrieve ideas at the speed of thought with nvAux, the in-the-zone, aint-nobody-stopping-me note-taking app for creative professionals.</p>
    </div>
  {/if}
  <main class="relative overflow-hidden flex flex-col" style="transition: all 0.5s ease-in-out; {$fullScreen ? 'height: 100%; width: 100%; border-color: transparent;' : 'width: 690px; min-width: 320px; height: 50%; min-height: 400px; border-color: #2d2f30; border-radius: 8px; -webkit-box-shadow: 0px 36px 69px -24px rgba(0,0,0,0.75); -moz-box-shadow: 0px 36px 69px -24px rgba(0,0,0,0.75); box-shadow: 0px 36px 69px -24px rgba(0,0,0,0.75);'} background-color: #181a1c; border: 1px solid; overflow: hidden;">
    <OmniBar />
    <NoteList />
    <ResizeHandle />
    <NoteDetail />
    <StatusBar />
  </main>
</div>
