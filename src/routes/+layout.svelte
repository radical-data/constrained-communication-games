<script>
	import { onMount } from 'svelte';
	import { io } from '$lib/webSocketConnection';
	import { username } from '$lib/stores';
	import '../style.css';
	onMount(() => {
		io.on('name', (name) => {
			username.set(name);
		});
	});
</script>

<slot />
