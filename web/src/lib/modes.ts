import type { Mode } from './types';
import emojiRegex from 'emoji-regex';
import { GiphyFetch } from '@giphy/js-fetch-api';

function isOnlyEmojis(str: string): boolean {
  const regex = emojiRegex();
  const emojisOnly = str.replace(regex, '');
  return emojisOnly.length === 0;
}

export function isGiphyLink(message: string): boolean {
  const giphyRegex =
    /^https?:\/\/(?:giphy\.com\/gifs\/\w+-\w+-\w+|media\d*\.giphy\.com\/media\/\w+\/\w+\.(gif|mp4)\?cid=\w+&ep=v1_gifs_search&rid=\w+\.(gif|mp4)&ct=g)/i;
  return giphyRegex.test(message);
}

const gf = new GiphyFetch("w8rOzHITsWrh8vSvSypYKq6p1ChTdtUZ");

async function getGiphyGifUrl(searchQuery: string): Promise<string> {
  const { data: gifs } = await gf.search(searchQuery, { limit: 1 });
  if (gifs.length > 0) {
    console.log(gifs);
    return gifs[0].images.original.url;
  } else {
    throw new Error('No GIFs found');
  }
}

async function jumbleMessage(message: string): Promise<string> {
  const words = message.split(/\s+/);
  const jumbledWords = await Promise.all(
    words.map(async (word) => {
      if (Math.random() < 0.5) {
        return await getRandomWord();
      }
      return word;
    })
  );
  return jumbledWords.join(' ');
}

async function getRandomWord(): Promise<string> {
  try {
    const response = await fetch(
      'https://random-word.ryanrk.com/api/en/word/random'
    );
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
    name: 'emoji',
    description:
      'You can only chat through emojis.<br>You can copy-and-paste emojis from the picker.',
    allowMessage: isOnlyEmojis,
    helper: 'EmojiHelper'
  },
  {
    name: 'gif',
    description:
      'You can only chat through gifs.<br>Type your phrase and we will assign a gif for you.',
    processMessage: async (message: string) => {
      try {
        const gifUrl = await getGiphyGifUrl(message);
        return gifUrl;
      } catch (error) {
        return 'No GIFs found for your search.';
      }
    }
  },
  {
    name: 'jumble',
    description:
      'You can write whatever you want, but half your words will be changed.',
    processMessage: jumbleMessage
  }
];
