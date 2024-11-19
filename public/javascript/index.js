//alert("js is loaded");
// Function to show a window
function showWindow(windowId) {
    const window = document.getElementById(windowId);
    window.classList.remove('hidden'); // Make the window visible
}

// Function to close the window
function closeWindow(windowId) {
    console.log(`Closing window: ${windowId}`);
    const window = document.getElementById(windowId);
    window.classList.add('hidden'); // Hide the window by adding the 'hidden' class
}

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    // Open user profile window when profile button is clicked
    document.getElementById('profileBtn').addEventListener('click', function () {
        showWindow('userProfile');
    });

    // Open ticket purchase window when ticket button is clicked
    document.getElementById('ticketBtn').addEventListener('click', function () {
        showWindow('createTickets');
    });

    // Close user profile window when close button is clicked
    document.querySelectorAll('.closeBtn').forEach(button => {
        button.addEventListener('click', function () {
            const window = button.closest('.window');
            window.classList.add('hidden'); // Hide the closest window element
        });
    });
});
