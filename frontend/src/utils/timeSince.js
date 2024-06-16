function timeSince(postgresTimestamp) {
    const now = new Date();
    const postedDate = new Date(postgresTimestamp);
    const diffInSeconds = (now - postedDate) / 1000;

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes} minutes ago`;
    } else if (diffInSeconds < secondsInDay) {
        return `${postedDate.getHours()}:${postedDate.getMinutes().toString().padStart(2, '0')}`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return days === 1 ? 'Yesterday' : `${days} days ago`;
    } else {
        const weeks = Math.floor(diffInSeconds / secondsInWeek);
        return `${weeks} weeks ago`;
    }
}

// Example usage:
const postgresTimestamp = '2024-06-15T14:48:00.000Z';
console.log(timeSince(postgresTimestamp));
