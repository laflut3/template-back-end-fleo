document.addEventListener('DOMContentLoaded', async () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewContent = document.getElementById('reviewContent');
    const reviewsContainer = document.getElementById('reviews');

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const content = reviewContent.value;
        const productId = 'ID_DU_PRODUIT'; // Remplacez par l'ID du produit
        if (!content) return;

        const response = await fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, content }),
        });

        if (response.ok) {
            alert('Avis ajouté avec succès');
            reviewContent.value = '';
            loadReviews(productId);
        } else {
            alert('Erreur lors de l\'ajout de l\'avis');
        }
    });

    async function loadReviews(productId) {
        const response = await fetch(`/reviews/${productId}`);
        const reviews = await response.json();

        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <p class="review-content">${review.content}</p>
                <p class="review-author">- ${review.user.username}</p>
                ${review.response ? `<div class="review-response">${review.response}</div>` : ''}
            `;
            if (estAdmin) {
                const buttons = document.createElement('div');
                buttons.className = 'review-buttons';
                buttons.innerHTML = `
                    <button class="delete-review" data-review-id="${review._id}">Supprimer</button>
                    <button class="respond-review" data-review-id="${review._id}">Répondre</button>
                `;
                reviewElement.appendChild(buttons);
            }
            reviewsContainer.appendChild(reviewElement);
        });

        document.querySelectorAll('.delete-review').forEach(button => {
            button.addEventListener('click', async (event) => {
                const reviewId = event.target.getAttribute('data-review-id');
                const response = await fetch(`/reviews/${reviewId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Avis supprimé avec succès');
                    loadReviews(productId);
                } else {
                    alert('Erreur lors de la suppression de l\'avis');
                }
            });
        });

        document.querySelectorAll('.respond-review').forEach(button => {
            button.addEventListener('click', async (event) => {
                const reviewId = event.target.getAttribute('data-review-id');
                const response = prompt('Entrez votre réponse :');
                if (response) {
                    const res = await fetch(`/reviews/${reviewId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ response }),
                    });
                    if (res.ok) {
                        alert('Réponse ajoutée avec succès');
                        loadReviews(productId);
                    } else {
                        alert('Erreur lors de l\'ajout de la réponse');
                    }
                }
            });
        });
    }

    // Chargez les avis au chargement de la page
    loadReviews('ID_DU_PRODUIT'); // Remplacez par l'ID du produit
});
