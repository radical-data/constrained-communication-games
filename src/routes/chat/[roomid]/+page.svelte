<script lang="ts">
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, onDestroy } from 'svelte';
	import type { Message } from '../../../types';
	import { goto } from '$app/navigation';

	let textfield = '';
	let messages: Message[] = [];
	let room: string;
	let partnerLeft = false;
	function formatTime(dateTime: Date) {
		return new Date(dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
	}
	onMount(() => {
		const roomPath = window.location.pathname;
		room = roomPath.substring(roomPath.lastIndexOf('/') + 1);
		io.emit('joinChatRoom', room);
		io.on('message', (message) => {
			messages = [...messages, message];
		});
		io.on('partnerLeft', () => {
			partnerLeft = true;
		});
	});
	function sendMessage() {
		const message = textfield.trim();
		if (!message) return;
		textfield = '';
		io.emit('message', message, room);
	}
	function newChat() {
		io.emit('leftChatRoom', room);
		goto('../chat');
	}
	onDestroy(() => {
		io.emit('leftChatRoom', room);
	});
</script>

<h1>Room {room}</h1>
<p>The rules</p>
{#each messages as message}
	<p>
		<b>{message.from}</b>
		<i>{formatTime(message.time)}</i>
		{message.message}
	</p>
{/each}
{#if partnerLeft}
	<p>Partner left</p>
{/if}
<form action="#" on:submit|preventDefault={sendMessage}>
	<input type="text" bind:value={textfield} placeholder="Type something..." />
	<button type="submit">Send</button>
</form>
<button on:click={newChat}>New chat</button>
