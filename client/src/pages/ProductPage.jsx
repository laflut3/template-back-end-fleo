import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftBar from '../components/LeftBar';
import NavbarComponent from '../components/NavbarComponent';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../services/api';

function ProductPage() {
    const { id } = useParams();
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 1030);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getProducts()
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message || 'Une erreur s\'est produite lors du chargement des produits.');
                setLoading(false);
            });
    }, []);

    const product = products.find(product => product.id === parseInt(id));

    return (
        <>
            <NavbarComponent />
            {!isMobile && <LeftBar />}
            {id ? (
                <div>
                    {product ? (
                        <>
                            <h1>Product ID: {id}</h1>
                            <ProductCard {...product} />
                        </>
                    ) : (
                        <p>Aucun produit trouvé avec l'ID {id}</p>
                    )}
                </div>
            ) : (
                <div>
                    <h1>All Products</h1>
                    {loading ? (
                        <p>Chargement en cours...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        products.length > 0 ? (
                            products.map(product => (
                                <ProductCard key={product.id} {...product} />
                            ))
                        ) : (
                            <p>Pas de produits disponibles</p>
                        )
                    )}
                </div>
            )}
        </>
    );
}

export default ProductPage;
