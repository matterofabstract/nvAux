<script>
  import { onMount } from 'svelte';
  import { format } from 'date-fns';
  import { fullScreen } from './store';

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
  style="font-size: 12px; height: 35px; background: #181a1c; bottom: 0; left: 0; color: #606060; "
>
  <div class="flex-grow">nvAux v0.1.5</div>
  <div>
    <button on:click={() => $fullScreen = !$fullScreen} style="margin-right: 10px; color: #ed0178" class="bg-transparent">
      [&nbsp;{$fullScreen ? '*' : ' '}&nbsp;]
    </button>
  </div>
  <div>{format(time, 'hh:mm:ss a')}</div>
</div>
