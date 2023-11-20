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

export const modes: Mode[] = [
	{
		name: "emoji",
		description: "You can only chat through emojis. ",
		allowMessage: isOnlyEmojis
	},
	{
		name: "gif",
		description: "You can only chat through gifs.",
		allowMessage: isGiphyLink
	},
	{
		name: "wikipedia",
		description: "You can only chat through Wikipedia pages.",
		allowMessage: isWikipediaPage
	},
	{
		name: "jumble",
		description: "You can write whatever you want, but half your words will be changed.",
		processMessage: jumbleMessage
	}
];