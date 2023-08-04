<script>
  export let wrapperWidth;
  export let wrapperHeight;

	import Canvas from './Canvas.svelte'
	import Palette from './Palette.svelte'

	const colors = [
		'#334169',
		'#72354d',
		'#4fa9cc',
		'#3f8d27',
	]
	const background = '#1d1f21';

	let color = colors[0]
	const paletteColor = color;

  $: console.log('wrapperHeight @@@@@@@@@@@@@ ', wrapperHeight);
</script>

<main>
	<Canvas {color} {background} {wrapperWidth} {wrapperHeight} />
	<Palette
    {paletteColor}
    {colors}
    {background}
    on:color="{({ detail }) => {
      color = detail.color
    }}"
  />
</main>

<style>
	:global(.visually-hidden:not(:focus):not(:active)) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
	}
	main {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem 0;
	}
	main :global(canvas) {
		align-self: center;
	}
</style>
