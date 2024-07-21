<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Define the type for the writable store
	const fontSize = writable(500);
	let helloText: HTMLSpanElement;

	// Function to dynamically adjust the font size based on "Hello"
	function resizeTextToFit() {
		const parentWidth = window.innerWidth;
		let tempFontSize = 500; // Starting font size in px

		if (helloText) {
			helloText.style.fontSize = `${tempFontSize}px`;

			while (helloText.scrollWidth > parentWidth && tempFontSize > 0) {
				tempFontSize -= 1;
				helloText.style.fontSize = `${tempFontSize}px`;
			}

			fontSize.set(tempFontSize);
		}
	}

	// Resize text on load and resize events
	onMount(() => {
		resizeTextToFit();
		window.addEventListener('resize', resizeTextToFit);

		return () => {
			window.removeEventListener('resize', resizeTextToFit);
		};
	});
</script>

<h1 style="font-size: {$fontSize}px;">
	<span bind:this={helloText}>Hello</span>
	<br />
	user<span class="full-stop">.</span>
</h1>
<a href="chat" class="clickable-box">Play</a>

<style>
	h1 {
		font-family: 'Fairfax SM Italic';
		line-height: 65%;
		margin: 0;
	}
	h1 > .full-stop {
		font-family: 'Fairfax SM';
	}
	a.clickable-box {
		display: inline-block;
		text-decoration: none;
		color: inherit;
		border: 2px solid rgb(255, 255, 255);
		padding: 10px;
	}
</style>
