export interface User {
  id: string;
}

export interface Room {
  id: string;
  mode: 'wikipedia' | 'jumble' | 'amazon' | 'free';
  users: string[];
}

export interface Message {
  from: string;
  message: string;
  time: Date;
  room: string;
}

export interface Mode {
  name: string;
  description: string;
  allowMessage?: (message: string) => boolean;
  processMessage?: (message: string) => Promise<string> | string;
  helper?: string;
}
