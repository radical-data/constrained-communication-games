<script lang="ts">
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, onDestroy } from 'svelte';
	import type { Message, Mode } from '../../../types';
	import { goto } from '$app/navigation';
	import { convertURLsToHTML, formatTime } from '$lib/utils';
	import { modes } from '$lib/modes';

	let textfield = '';
	let messages: Message[] = [];
	let room: string;
	let partnerLeft = false;
	let selectedMode: Mode;

	let mode: string | null;

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
		// selectedMode = modes[0];

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

	async function sendMessage() {
		let message = textfield.trim();
		if (!message) return;
		textfield = '';

		if (!selectedMode.allowMessage || selectedMode.allowMessage(message)) {
			if (selectedMode.processMessage) {
				try {
					// Call the asynchronous processMessage function
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
		io.emit('leftChatRoom', room);
		goto('../chat');
	}
	onDestroy(() => {
		io.emit('leftChatRoom', room);
	});
</script>

<h1>Room {room}</h1>
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
{/if}
<form action="#" on:submit|preventDefault={sendMessage}>
	<input type="text" bind:value={textfield} placeholder="Type something..." />
	<button type="submit">Send</button>
</form>
<button on:click={newChat}>New chat</button>
