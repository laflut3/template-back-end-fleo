document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/auth/user-info');
        if (!response.ok) {
            throw new Error('Not authenticated');
        }
        const user = await response.json();

        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;
        document.getElementById('firstName').textContent = user.firstName;
        document.getElementById('lastName').textContent = user.lastName;

        const profileImage = document.getElementById('profileImage');
        const profileInitials = document.getElementById('profileInitials');

        if (user.profileImage) {
            profileImage.src = `data:image/jpeg;base64,${btoa(
                new Uint8Array(user.profileImage.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}`;
            profileImage.style.display = 'block';
            profileInitials.style.display = 'none';
        } else {
            profileInitials.textContent = getInitials(user.firstName, user.lastName);
            profileImage.style.display = 'none';
            profileInitials.style.display = 'block';
        }

        document.getElementById('logout-btn').addEventListener('click', async () => {
            const logoutResponse = await fetch('/auth/logout', { method: 'POST' });
            if (logoutResponse.ok) {
                window.location.href = '/';
            } else {
                alert('Erreur lors de la déconnexion');
            }
        });

        document.getElementById('uploadForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData();
            const fileInput = document.getElementById('profileImageInput');
            formData.append('profileImage', fileInput.files[0]);

            const uploadResponse = await fetch('/auth/update-profile-image', {
                method: 'POST',
                body: formData
            });

            if (uploadResponse.ok) {
                window.location.reload(); // Recharger la page pour voir la nouvelle image
            } else {
                alert('Erreur lors de la mise à jour de l\'image de profil');
            }
        });
    } catch (error) {
        console.error('Error fetching user info:', error.message);
        window.location.href = '/login'; // Rediriger vers la page de connexion si non authentifié
    }
});

function getInitials(firstName, lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
}
