document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/auth/session');
        if (!response.ok) {
            throw new Error('Not authenticated');
        }
        const session = await response.json();

        const userResponse = await fetch('/auth/user-info');
        if (!userResponse.ok) {
            throw new Error('Not authenticated');
        }
        const user = await userResponse.json();

        const lienLog = document.getElementById('lienLog');
        const profile = document.getElementById('profile');
        const profileInitials = document.getElementById('profile-initials');
        const profileImage = document.getElementById('profile-image');

        lienLog.style.display = 'none';
        profile.style.display = 'flex';

        if (user.profileImage) {
            profileImage.src = `data:image/jpeg;base64,${btoa(
                new Uint8Array(user.profileImage.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}`;
            profileImage.classList.remove('hidden');
            profileInitials.classList.add('hidden');
        } else {
            profileInitials.textContent = getInitials(user.firstName, user.lastName);
            profileImage.classList.add('hidden');
            profileInitials.classList.remove('hidden');
        }

        profile.addEventListener('click', function() {
            window.location.href = '/profile';
        });
    } catch (error) {
        console.error('Error fetching user info:', error.message);
    }
});

function getInitials(firstName, lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
}
