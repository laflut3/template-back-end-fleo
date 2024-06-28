document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/cart');
        const cart = await response.json();

        const cartList = document.getElementById('cartList');
        cartList.innerHTML = '';

        if (!cart || cart.items.length === 0) {
            cartList.innerHTML = '<p>Votre panier est vide</p>';
            return;
        }

        cart.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <img src="data:image/png;base64,${btoa(
                new Uint8Array(item.product.image.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}" alt="${item.product.name}">
                <div>
                    <strong>${item.product.name}</strong>
                    <p>Prix: €${item.product.price}</p>
                    <p>Quantité: ${item.quantity}</p>
                    <button class="remove-from-cart" data-product-id="${item.product._id}">Retirer</button>
                </div>
            `;

            cartList.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', async (event) => {
                const productId = event.target.getAttribute('data-product-id');
                await removeFromCart(productId);
            });
        });
    } catch (error) {
        console.error('Error fetching cart:', error.message);
    }
});

async function removeFromCart(productId) {
    try {
        const response = await fetch('/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        });
        if (!response.ok) {
            throw new Error('Failed to remove product from cart');
        }
        alert('Product removed from cart');
        location.reload();
    } catch (error) {
        console.error('Error removing product from cart:', error.message);
    }
}
