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
  allowMessage?: (arg1: string) => boolean;
  processMessage?: (arg1: string) => string | Promise<string>;
}
