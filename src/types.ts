export interface User {
    id: string
}

export interface Room {
    id: string,
    mode: "wikipedia" | "jumble" | "amazon",
    users: string[]
}

export interface Message {
    from: string,
    message: string,
    time: Date,
    room: string
}