document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/testimonials');
        const testimonials = await response.json();

        const testimonialsList = document.getElementById('testimonialsList');
        testimonialsList.innerHTML = '';

        testimonials.forEach(testimonial => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'testimonial';
            testimonialItem.innerHTML = `
                <p>${testimonial.content}</p>
                <small>Posté par ${testimonial.user.username} le ${new Date(testimonial.createdAt).toLocaleString()}</small>
                <div class="replies">
                    ${testimonial.replies.map(reply => `
                        <div class="reply">
                            <p>${reply.content}</p>
                            <small>Répondu le ${new Date(reply.createdAt).toLocaleString()}</small>
                        </div>
                    `).join('')}
                </div>
                <button class="delete-testimonial" data-id="${testimonial._id}">Supprimer</button>
                <form class="reply-form" data-id="${testimonial._id}">
                    <textarea class="reply-content" required></textarea>
                    <button type="submit">Répondre</button>
                </form>
            `;

            testimonialsList.appendChild(testimonialItem);
        });

        document.querySelectorAll('.delete-testimonial').forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-id');
                await deleteTestimonial(id);
            });
        });

        document.querySelectorAll('.reply-form').forEach(form => {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const id = event.target.getAttribute('data-id');
                const content = event.target.querySelector('.reply-content').value;
                await addReply(id, content);
            });
        });
    } catch (error) {
        console.error('Error fetching testimonials:', error.message);
    }

    const addTestimonialForm = document.getElementById('addTestimonialForm');
    addTestimonialForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const content = document.getElementById('testimonialContent').value;
        await addTestimonial(content);
    });
});

async function addTestimonial(content) {
    try {
        const response = await fetch('/testimonials/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
        if (!response.ok) {
            throw new Error('Failed to add testimonial');
        }
        location.reload();
    } catch (error) {
        console.error('Error adding testimonial:', error.message);
    }
}

async function deleteTestimonial(id) {
    try {
        const response = await fetch(`/testimonials/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete testimonial');
        }
        location.reload();
    } catch (error) {
        console.error('Error deleting testimonial:', error.message);
    }
}

async function addReply(id, content) {
    try {
        const response = await fetch(`/testimonials/reply/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
        if (!response.ok) {
            throw new Error('Failed to add reply');
        }
        location.reload();
    } catch (error) {
        console.error('Error adding reply:', error.message);
    }
}
