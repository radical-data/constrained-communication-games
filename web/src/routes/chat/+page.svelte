<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { io } from '$lib/webSocketConnection';
  import { goto } from '$app/navigation';
  import { username } from '$lib/stores';

  onMount(() => {
    io.emit('joinWaitingRoom');
    io.on('joinRoom', (roomId, mode) => {
      console.log(`Received joinRoom event for room ${roomId}`);
      goto(`chat/${roomId}?mode=${mode}`);
    });
  });
  onDestroy(() => {
    io.emit('leftWaitingRoom');
  });
</script>

<h1>We have named you <span id="name">{$username}</span>.</h1>
<p>Congratulations, it is a beautiful name.</p>
<p>(It cannot be changed.)</p>
<h2>We are assigning you a partner.</h2>
<a href="/">Cancel</a>

<style>
  h1 {
    font-size: 200px;
    line-height: 80%;
  }
  #name {
    color: #ffe500;
    word-break: break-word;
    white-space: normal;
  }
</style>
