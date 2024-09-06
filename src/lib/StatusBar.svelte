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
  class="status-bar px-2 items-center flex absolute w-full flex-grow-0 transition-all"
  style="font-size: 12px;  background: var(--app-statusbar-background); bottom: 0; left: 0; color: #606060; border-top: 1px solid var(--app-statusbar-border); height: {$fullScreen ? '45px' : '34px'};"
>
  <div class="flex-grow flex items-center">nvAux v0.1.5-20240906-005</div>
  <div>
    <button on:click={() => $fullScreen = !$fullScreen} style="margin-right: 10px; color: {!$fullScreen ? '#ed0178' : '#818181'}" class="bg-transparent flex items-center outline-none transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize">
        {#if $fullScreen}
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
        {:else}
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
        {/if}
      </svg>
    </button>
  </div>
  {#if $showClock}
    <div class="flex items-center">{format(time, 'hh:mm:ss a')}</div>
  {/if}
</div>


<style>
 @media screen and (max-width: 768px) {
    .status-bar {
      align-items: start;
      padding-top: 10px;
    }
  }

  @media screen and (min-width: 769px) {
    .status-bar {
      align-items: center;
    }
  }
</style>
