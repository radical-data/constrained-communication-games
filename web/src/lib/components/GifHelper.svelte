<script lang="ts">
  import { GiphyFetch } from '@giphy/js-fetch-api';
  import { writable } from 'svelte/store';

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  let searchQuery = '';
  let gifs = writable([]);
  let loading = writable(false);

  async function searchGifs() {
    loading.set(true);
    try {
      const { data } = await gf.search(searchQuery, { limit: 10 });
      gifs.set(data);
    } catch (error) {
      console.error('Error fetching gifs:', error);
    } finally {
      loading.set(false);
    }
  }

  function copyGifUrl(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert('Gif URL copied to clipboard!');
    });
  }
</script>

<input type="text" bind:value={searchQuery} placeholder="Search for gifs..." />
<button on:click={searchGifs}>Search</button>

{#if $loading}
  <p>Loading...</p>
{/if}

<div class="gif-container">
  {#each $gifs as gif}
    <img
      src={gif.images.fixed_height.url}
      alt={gif.title}
      class="gif-item"
      on:click={() => copyGifUrl(gif.images.fixed_height.url)}
    />
  {/each}
</div>

<style>
  .gif-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .gif-item {
    cursor: pointer;
  }
</style>
