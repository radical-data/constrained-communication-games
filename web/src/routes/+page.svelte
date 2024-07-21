<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import wavingHandApple from '$lib/assets/waving-hand_1f44b.png';

  // Define the type for the writable store
  const fontSize = writable(600);
  let helloText: HTMLSpanElement;

  // Function to dynamically adjust the font size based on "Hello"
  function resizeTextToFit() {
    const parentWidth = window.innerWidth;
    let tempFontSize = 600; // Starting font size in px

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
  <span bind:this={helloText}>H<span class="regular">e</span>llo</span>
  <br />
  user<span class="regular">.</span>
</h1>
<a href="chat" class="clickable-box">Play</a>

<div class="wave">
  <img src={wavingHandApple} alt="Waving Hand Sign" />
</div>

<style>
  h1 {
    font-family: 'Fairfax SM Italic';
    line-height: 65%;
    margin: 0;
  }
  .regular {
    font-family: 'Fairfax SM';
  }
  a.clickable-box {
    display: inline-block;
    align-self: center;
    text-decoration: none;
    color: inherit;
    border: 2px solid rgb(255, 255, 255);
    padding: 10px;
  }

  .wave {
    position: fixed;
    bottom: 0px;
    right: 0px;
    z-index: -1;
  }
  .wave img {
    width: 40vw;
    height: auto;
  }
</style>
