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
    })
</script>

<h1>We have named you</h1>
<p>{$username}</p>
<p>We are assigning you a partner.</p>
<a href="/">Cancel</a>
