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
        const cartLink = document.getElementById('cartLink');

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

        cartLink.style.display = 'inline'; // Toujours afficher le lien du panier

        profile.addEventListener('click', function() {
            window.location.href = '/profile';
        });
    } catch (error) {
        console.error('Error fetching user info:', error.message);
    }

    // Affichage des produits
    try {
        const productList = document.getElementById('productList');
        const response = await fetch('/products');
        const products = await response.json();

        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product';

            const productInfo = document.createElement('div');
            productInfo.className = 'product-details';
            productInfo.innerHTML = `
                <img src="data:image/png;base64,${btoa(
                new Uint8Array(product.image.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}" alt="${product.name}">
                <h2 class="product-title">${product.name}</h2>
                <p class="product-price">€${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" data-product-id="${product._id}">Ajouter au panier</button>
            `;

            productItem.appendChild(productInfo);
            productList.appendChild(productItem);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async (event) => {
                const productId = event.target.getAttribute('data-product-id');
                await addToCart(productId);
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
});

async function addToCart(productId) {
    try {
        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity: 1 }),
        });
        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }
        alert('Product added to cart');
    } catch (error) {
        console.error('Error adding product to cart:', error.message);
    }
}

function getInitials(firstName, lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
}
