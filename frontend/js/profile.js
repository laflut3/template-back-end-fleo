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

        document.getElementById('logout-btn').addEventListener('click', async () => {
            const logoutResponse = await fetch('/auth/logout', { method: 'POST' });
            if (logoutResponse.ok) {
                window.location.href = '/';
            } else {
                alert('Erreur lors de la déconnexion');
            }
        });
    } catch (error) {
        console.error('Error fetching user info:', error.message);
        window.location.href = '/login'; // Rediriger vers la page de connexion si non authentifié
    }
});
