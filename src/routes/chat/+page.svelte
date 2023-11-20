<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { io } from '$lib/webSocketConnection';
	import { goto } from '$app/navigation';
    import { username } from '../../stores';
  
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

<h1>Waiting Room</h1>
<p>Hello user {$username}</p>
<p>We are assigning you a partner.</p>
<a href="/">Cancel</a>
