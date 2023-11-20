export function formatTime(dateTime: Date) {
    return new Date(dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}