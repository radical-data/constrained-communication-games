<script lang="ts">
	import { io } from '$lib/webSocketConnection.js';
	import { onMount } from 'svelte';
	import { users } from '../../stores';
	import type { Message } from '../../types';

	let textfield = '';
	let username;

	let messages: Message[] = [];

	function formatTime(dateTime: Date) {
		return new Date(dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
	}

	onMount(() => {
		io.on('message', (message) => {
			messages = [...messages, message];
		});
		io.on('name', (name) => {
			username = name;
		});
	});

	function sendMessage() {
		const message = textfield.trim();
		if (!message) return;

		textfield = '';
		io.emit('message', message);
	}
</script>

<h1>Chat</h1>
You are in a chatroom with: {$users}
<ul>
	{#each $users as user}
		<li>
			<p>{user}</p>
		</li>
	{/each}
</ul>

{#each messages as message}
	<div>
		<span>
			<b>{message.from}</b>
			<i>{formatTime(message.time)}</i>
		</span>
		{message.message}
	</div>
{/each}

<form action="#" on:submit|preventDefault={sendMessage}>
	<input type="text" bind:value={textfield} placeholder="Type something..." />
	<button type="submit">Send</button>
</form>
