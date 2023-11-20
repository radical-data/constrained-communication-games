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

export const modes: Mode[] = [
	{
		name: "emoji",
		description: "You can only chat through emojis. ",
		restrictMessage: isOnlyEmojis
	},
	{
		name: "gif",
		description: "You can only chat through gifs.",
		restrictMessage: isGiphyLink
	},
	{
		name: "wikipedia",
		description: "You can only chat through Wikipedia pages.",
		restrictMessage: isWikipediaPage
	}
];