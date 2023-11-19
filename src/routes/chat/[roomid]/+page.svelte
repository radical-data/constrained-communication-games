<script lang="ts">
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, onDestroy } from 'svelte';
	import { users, username } from '../../../stores';
	import type { Message } from '../../../types';

	let textfield = '';
	let messages: Message[] = [];
	let room: string;
	function formatTime(dateTime: Date) {
		return new Date(dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
	}
	onMount(() => {
		const roomPath = window.location.pathname;
		room = roomPath.substring(roomPath.lastIndexOf('/') + 1);
		console.log(room);
		io.emit('joinChatRoom', room);
		io.on('message', (message) => {
			messages = [...messages, message];
		});
	});
	function sendMessage() {
		const message = textfield.trim();
		if (!message) return;
		textfield = '';
		io.emit('message', message, room);
	}
	onDestroy(() => {
		io.emit('leftChatRoom', "bloop");
	})
</script>

<h1>Chat</h1>
You are in room {room}.
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
<a href="../chat">New chat</a>