function logResponse(method: string, response: Response, timeTaken: number) {
    // Define a color for each HTTP status code category
    const statusColors: { [key: number]: string } = {
        2: '\x1b[32m', // Green for 2xx 'Success' status codes
        3: '\x1b[36m', // Cyan for 3xx 'Redirection' status codes
        4: '\x1b[33m', // Yellow for 4xx 'Client error' status codes
        5: '\x1b[31m', // Red for 5xx 'Server error' status codes
    };

    // Get the first digit of the status code to determine its category
    const statusCategory = Math.floor(response.status / 100);

    // Choose an emoji based on the status category
    const statusEmoji =
        statusCategory === 2
            ? '✅'
            : statusCategory === 3
              ? '🔀'
              : statusCategory === 4
                ? '⚠️'
                : '❌';

    // Log the request method, URL, and response status with color and emoji
    console.log(
        `${statusEmoji} ${method}: ${response.url} - ${statusColors[statusCategory]}${response.status} ${response.statusText}\x1b[0m  - Time: ${Number(timeTaken).toFixed(2)}ms`,
    );
}

export { logResponse };
