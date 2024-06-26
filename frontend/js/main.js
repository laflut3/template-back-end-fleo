document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/auth/user-info');
        if (!response.ok) {
            throw new Error('Not authenticated');
        }
        const user = await response.json();

        const lienLog = document.getElementById('lienLog');
        const profile = document.getElementById('profile');
        const profileInitials = document.getElementById('profile-initials');

        lienLog.style.display = 'none';
        profile.style.display = 'flex';
        profileInitials.textContent = getInitials(user.firstName, user.lastName);
    } catch (error) {
        console.error('Error fetching user info:', error.message);
    }
});

function getInitials(firstName, lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
}
