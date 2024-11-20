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

    document.getElementById('adminBtn').addEventListener('click', function () {
        showWindow('adminHome');
    });

    // Close window when close button is clicked
    document.querySelectorAll('.closeBtn').forEach(button => {
        button.addEventListener('click', function () {
            const window = button.closest('.window');
            window.classList.add('hidden'); // Hide the closest window element
        });
    });
});

//switch sections admin/user
function showAdminSection(sectionId) {
    // Get all the admin content divs
    const admin_sections = Array.from(document.querySelectorAll('#admin-content > div'));

    // Hide all admin sections
    admin_sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the specified admin section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

function showUserProfileSection(sectionId) {
    // Get user profile sections
    const user_profile_sections = [
        document.getElementById('messages'),
        document.getElementById('tickets-history')
    ];

    // Hide all user profile sections
    user_profile_sections.forEach(section => {
        if (section) {
            section.style.display = 'none';
        }
    });

    // Show the specified user profile section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

// Show default sections when the page loads
window.addEventListener('load', function() {
    // Show default sections for both Admin and User Profile
    showAdminSection('admin-users'); // Default admin section
    showUserProfileSection('messages'); // Default user profile section
});

// Add event listeners to buttons
document.getElementById('btn-messages').addEventListener('click', function() {
    showUserProfileSection('messages');
});

document.getElementById('btn-tickets-history').addEventListener('click', function() {
    showUserProfileSection('tickets-history');
});

document.getElementById('btn-admin-users').addEventListener('click', function() {
    showAdminSection('admin-users');
});

document.getElementById('btn-admin-events').addEventListener('click', function() {
    showAdminSection('admin-events');
});

document.getElementById('btn-admin-messages').addEventListener('click', function() {
    showAdminSection('admin-messages');
});

