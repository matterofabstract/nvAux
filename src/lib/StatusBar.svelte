<script>
  import { onMount } from 'svelte';
  import { format } from 'date-fns';
  import { fullScreen, showClock } from './store';

  let time = new Date();

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div
  class="px-2 flex items-center absolute w-full flex-grow-0"
  style="font-size: 12px; height: 35px; background: var(--app-statusbar-background); bottom: 0; left: 0; color: #606060; border-top: 1px solid var(--app-statusbar-border);"
>
  <div class="flex-grow">nvAux v0.1.5-20230719-001</div>
  <div>
    <button on:click={() => $fullScreen = !$fullScreen} style="margin-right: 10px; color: #ed0178" class="bg-transparent flex items-center outline-none">
      {#if $fullScreen}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
      {/if}
    </button>
  </div>
  {#if $showClock}
     <div>{format(time, 'hh:mm:ss a')}</div>
  {/if}
</div>
