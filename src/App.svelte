<script>
  import OmniBar from './lib/OmniBar.svelte';
  import NoteList from './lib/NoteList.svelte';
  import ResizeHandle from './lib/ResizeHandle.svelte';
  import NoteDetail from './lib/NoteDetail.svelte';
  import StatusBar from './lib/StatusBar.svelte';

  import { fullScreen, maximumFullScreen } from './lib/store';
</script>

<div class="h-screen w-screen overflow-hidden flex flex-col justify-center items-center {$fullScreen ? '' : 'p-2'}">
  {#if !$fullScreen}
    <div class="absolute text-center" style="top: 10px; opacity: 0.7">
      <h1>nvAux</h1>
      <p>Capture and retrieve ideas at the speed of thought with nvAux, the in-the-zone, aint-nobody-stopping-me note-taking app for creative professionals.</p>
    </div>
  {/if}
  <main
    class="{$fullScreen ? 'fullscreen' : 'windowed'} relative overflow-hidden flex flex-col transition-all"
    style="{$fullScreen ? $maximumFullScreen ? 'height: 100%; width: 100%;' : 'height: calc(100vh - 8px); width: calc(100vw - 8px); border-radius: 8px;' : ''} background-color: var(--app-background);"
  >
    <OmniBar />
    <NoteList />
    <ResizeHandle />
    <NoteDetail />
    <StatusBar />
  </main>
</div>

<style>
  h1 {
    font-size: 60px;
    font-weight: 600;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 0;
  }
  p {
    max-width: 500px;
    margin-bottom: 60px;
    font-size: 16px;
    line-height: 24px;
  }
  main.fullscreen {
    max-width: 100%;
    border: 1px solid rgba(0,0,0,0.0);
  }
  main.windowed {
    max-width: 690px;
    width: 100%;
    min-width: 200px;
    height: 50%;
    min-height: 300px;
    border-radius: 8px;
    border: 1px solid #3a3f412e;
    -webkit-box-shadow: 0px 36px 69px -24px rgba(0,0,0,0.75);
    box-shadow: 0px 36px 69px -24px rgba(0,0,0,0.75);
  }
</style>
