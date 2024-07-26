<script lang="ts">
  import { onMount } from 'svelte';
  import { createPicker } from 'picmo';

  function copyToClipboard(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          console.log('Copied to clipboard');
        },
        (err) => {
          console.error('Failed to copy: ', err);
        }
      );
    } else {
      console.warn('Clipboard API not available');
    }
  }

  onMount(() => {
    const rootElement = document.getElementById('pickerContainer');

    const picker = createPicker({
      rootElement
    });

    picker.addEventListener('emoji:select', (event) => {
      const emoji = event.emoji;
      copyToClipboard(emoji);
    });

    return () => {
      picker.destroy();
    };
  });
</script>

<div id="pickerContainer"></div>

<style>
  #pickerContainer {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
</style>
