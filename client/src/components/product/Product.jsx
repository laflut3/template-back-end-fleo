import React from 'react'

/**
 * Le composant Product permet d'afficher les produits
 * @param {*} id - L'identifiant du produit
 * @param {*} name - Le nom du produit
 * @param {*} price - Le prix du produit
 * @param {*} moneyType - Le type de monnaie
 * @returns 
 */
function Product({ id, name, price, moneyType }) {
    return (
        <>
            <li className='flex items-center justify-between w-full' key={id}>
                <h2>{name}</h2>
                <p className='text-sm font-normal'>{price} {moneyType}</p>
            </li>
        </>
    )
}

export default Product;
