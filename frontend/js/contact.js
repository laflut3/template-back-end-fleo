document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        alert('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error.message);
        alert('Failed to send message');
    }
});
