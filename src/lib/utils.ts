export function formatTime(dateTime: Date) {
    return new Date(dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function convertURLsToHTML(text: string): string {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
}