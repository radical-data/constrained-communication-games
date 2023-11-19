<script>
	import { onMount } from 'svelte';
	import { io } from '$lib/webSocketConnection';
	import { username } from '../stores';
	onMount(() => {
		io.on('name', (name) => {
			username.set(name);
		});
	});
</script>

<slot />

<style>
	@import '/src/style.css';
</style>
