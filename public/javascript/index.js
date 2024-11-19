//alert("js is loaded");
// Function to show a window
function showWindow(windowId) {
    const window = document.getElementById(windowId);
    window.classList.remove('hidden'); // Make the window visible
}

// Function to close the window
function closeWindow(windowId) {
    const window = document.getElementById(windowId);
    window.classList.add('hidden'); // Hide the window by adding the 'hidden' class
}

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    // Open user profile window when profile button is clicked
    document.getElementById('profileBtn').addEventListener('click', function () {
        showWindow('userProfile');
    });

    // Open tickets window when ticket button is clicked
    document.getElementById('ticketBtn').addEventListener('click', function () {
        showWindow('createTickets');
    });

    // Close window when close button is clicked
    document.querySelectorAll('.closeBtn').forEach(button => {
        button.addEventListener('click', function () {
            const window = button.closest('.window');
            window.classList.add('hidden'); // Hide the closest window element
        });
    });
});

// Function to show the messages div and hide the tickets history div
function showMessages() {
    document.getElementById('messages').style.display = 'block';
    document.getElementById('tickets-history').style.display = 'none';
  }

  // Function to show the tickets history div and hide the messages div
  function showTicketsHistory() {
    document.getElementById('tickets-history').style.display = 'block';
    document.getElementById('messages').style.display = 'none';
  }
  // Show messages by default when the page loads
  window.onload = function() {
    showMessages(); // Call to show messages when the page is first loaded
  };
