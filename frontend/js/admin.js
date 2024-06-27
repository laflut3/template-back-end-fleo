document.addEventListener('DOMContentLoaded', async () => {
    const addProductForm = document.getElementById('addProductForm');
    const productList = document.getElementById('productList');

    // Fonction pour afficher les produits
    async function displayProducts() {
        const response = await fetch('/products');
        const products = await response.json();

        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            const productInfo = document.createElement('div');
            productInfo.innerHTML = `
                <img src="data:image/jpeg;base64,${btoa(
                new Uint8Array(product.image.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}" alt="${product.name}">
                <div>
                    <strong>${product.name}</strong>
                    <p>${product.description}</p>
                    <p>${product.price} €</p>
                </div>
            `;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', async () => {
                await fetch(`/products/delete/${product._id}`, { method: 'DELETE' });
                displayProducts();
            });

            productItem.appendChild(productInfo);
            productItem.appendChild(deleteButton);
            productList.appendChild(productItem);
        });
    }

    // Afficher les produits lors du chargement de la page
    displayProducts();

    // Ajouter un nouveau produit
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(addProductForm);
        const response = await fetch('/products/add', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Produit ajouté avec succès');
            addProductForm.reset();
            displayProducts();
        } else {
            alert('Erreur lors de l\'ajout du produit');
        }
    });
});
