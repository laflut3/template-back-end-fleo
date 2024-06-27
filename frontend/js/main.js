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
        const profileImage = document.getElementById('profile-image');
        const adminLink = document.getElementById('adminLink');

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

        if (user.estAdmin) {
            adminLink.style.display = 'inline';
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
