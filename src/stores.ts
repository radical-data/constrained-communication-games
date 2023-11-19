import { writable, type Writable } from 'svelte/store';

export const users: Writable<string[]> = writable(["eggs"]);
