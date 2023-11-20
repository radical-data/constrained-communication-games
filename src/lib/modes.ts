import type { Mode } from "../types";

function isOnlyEmojis(str: string): boolean {
	const emojiRegex = /[\p{Emoji}]/gu;
	const emojisOnly = str.replace(emojiRegex, '');
	return emojisOnly.length === 0;
}

const wikipediaRegex =
	/^(https?:\/\/)?(?:www\.)?(?:[a-z]{2}\.)?(?:m\.)?wikipedia\.org\/wiki\/([^#\s]+)/i;

function isWikipediaPage(message: string) {
	return wikipediaRegex.test(message);
}

function isGiphyLink(message: string): boolean {
	const giphyRegex = /^https?:\/\/giphy\.com\/gifs\/\w+-\w+-\w+/i;
	return giphyRegex.test(message);
}

async function jumbleMessage(message: string): Promise<string> {
	const words = message.split(/\s+/);
	const jumbledWords = await Promise.all(words.map(async (word) => {
		if (Math.random() < 0.5) {
			return await getRandomWord();
		}
		return word;
	}));
	return jumbledWords.join(' ');
}

async function getRandomWord(): Promise<string> {
	try {
		const response = await fetch('https://random-word-api.herokuapp.com/word');
		if (!response.ok) {
			throw new Error('Failed to fetch random word');
		}
		const data = await response.json();
		return data[0];
	} catch (error) {
		console.error('Error fetching random word:', error);
		return '';
	}
}

function isAmazonProductLink(link: string): boolean {
	const amazonRegex = /^(https?:\/\/)?(www\.)?amazon\.[a-z]{2,}\/(?:[^/]+\/)?(?:dp|gp\/product)\/\w{10}(\/)?/i;
	return amazonRegex.test(link);
}

function addProductDeclaration(message: string): string {
	const declarations = ["I want this!", "Check this out!", "Birthday present idea? ;)", "I need this!",
		"Wow, this looks cool!", "Thought of you!",
		"Adding this to my wishlist!",
		"Definitely buying this!",
		"This is on my shopping list!",
		"I've been eyeing this!",
		"Perfect gift idea!",
		"Thinking of getting this!",
		"Adding to cart right away!",
		"I've found what I wanted!"];

	const declaration = declarations[Math.floor(Math.random() * declarations.length)];
	return `${declaration} ${message}`;
}

export const modes: Mode[] = [
	{
		name: "emoji",
		description: "You can only chat through emojis.<br>You can copy-and-paste emojis from <a href='https://emojipedia.com' target='_blank'>Emojipedia</a>.",
		allowMessage: isOnlyEmojis
	},
	{
		name: "gif",
		description: "You can only chat through gifs.<br>You can copy-and-paste gifs from <a href='https://giphy.com' target='_blank'>Giphy</a>.",
		allowMessage: isGiphyLink
	},
	{
		name: "wikipedia",
		description: "You can only chat through <a href='https://wikipedia.org'>Wikipedia</a> pages.",
		allowMessage: isWikipediaPage
	},
	{
		name: "jumble",
		description: "You can write whatever you want, but half your words will be changed.",
		processMessage: jumbleMessage
	},
	{
		name: "amazon",
		description: "You can only chat through sharing links to <a href='https://amazon.nl'>Amazon</a> products.",
		allowMessage: isAmazonProductLink,
		processMessage: addProductDeclaration
	}
];