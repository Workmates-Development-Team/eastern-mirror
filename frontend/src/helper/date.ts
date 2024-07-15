export function getCurrentFormattedDate() {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday"
    ];

    const now = new Date();

    const dayOfWeek = days[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    return `${dayOfWeek.toUpperCase()}, ${month.toUpperCase()} ${day < 10 ? '0' : ''}${day}, ${year}`;
}