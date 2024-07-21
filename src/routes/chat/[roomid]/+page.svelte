<script lang="ts">
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, onDestroy } from 'svelte';
	import type { Message, Mode } from '$lib/types';
	import { goto } from '$app/navigation';
	import { convertURLsToHTML, formatTime } from '$lib/utils';
	import { modes } from '$lib/modes';
	import { writable } from 'svelte/store';

	let textfield = '';
	let messages: Message[] = [];
	let room: string;
	let partnerLeft = false;
	let selectedMode: Mode;
	let countdown = writable(10);
	let mode;
	let timer;

	function getMode(modesOptions: Mode[], modeNameOption: string | null): Mode {
		const selectedMode = modesOptions.find((m) => m.name === modeNameOption);

		if (!selectedMode || modesOptions.filter((m) => m.name === modeNameOption).length !== 1) {
			return modesOptions[0];
		}

		return selectedMode;
	}

	function getModeQueryParam(): string | null {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		return urlParams.get('mode');
	}

	onMount(() => {
		mode = getModeQueryParam();
		console.log(mode);
		selectedMode = getMode(modes, mode);

		const roomPath = window.location.pathname;
		room = roomPath.substring(roomPath.lastIndexOf('/') + 1);
		io.emit('joinChatRoom', room);
		io.on('message', (message) => {
			messages = [...messages, message];
		});
		io.on('partnerLeft', () => {
			partnerLeft = true;
			startCountdown();
		});
	});

	async function sendMessage() {
		let message = textfield.trim();
		if (!message) return;
		textfield = '';

		if (!selectedMode.allowMessage || selectedMode.allowMessage(message)) {
			if (selectedMode.processMessage) {
				try {
					message = await selectedMode.processMessage(message);
				} catch (error) {
					console.error('Error processing message:', error);
					return;
				}
			}
			io.emit('message', message, room);
		} else {
			alert(selectedMode.description);
		}
	}

	function newChat() {
		clearTimeout(timer);
		io.emit('leftChatRoom', room);
		goto('../chat');
	}

	function startCountdown() {
		let timeLeft = 10;
		countdown.set(timeLeft);

		const interval = setInterval(() => {
			timeLeft -= 1;
			countdown.set(timeLeft);
			if (timeLeft <= 0) {
				clearInterval(interval);
				goto('/');
			}
		}, 1000);

		timer = setTimeout(() => {
			goto('/');
		}, 10000); // 10 seconds
	}

	onDestroy(() => {
		clearTimeout(timer);
		io.emit('leftChatRoom', room);
	});
</script>

<h1>Room {room}</h1>
<h2>Challenge: {@html selectedMode?.name}</h2>
<p>{@html selectedMode?.description}</p>
{#each messages as message}
	<p>
		<b>{message.from}</b>
		<i>{formatTime(message.time)}</i>
		{@html convertURLsToHTML(message.message)}
	</p>
{/each}
{#if partnerLeft}
	<p>Partner left</p>
	<p>Click "New chat" or you will be returned to the home page in {$countdown} seconds.</p>
{/if}
<form action="#" on:submit|preventDefault={sendMessage} class:disabled={partnerLeft}>
	<input
		type="text"
		bind:value={textfield}
		placeholder="Type something..."
		disabled={partnerLeft}
	/>
	<button type="submit" disabled={partnerLeft}>Send</button>
</form>
<button on:click={newChat}>New chat</button>

<style>
	form {
		margin-block: 10px;
	}
	form.disabled {
		opacity: 0.5;
		pointer-events: none;
	}
	button[disabled] {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
