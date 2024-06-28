import React from 'react';

/**
 * Component for displaying product details with image and description.
 * @param {*} props - Product properties (id, name, price, moneyType, description, image)
 * @returns {JSX.Element}
 */
function ProductCard({ id, name, price, moneyType, description, image }) {
    moneyType = moneyType || '€';
    return (
        <div
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-md"
            style={{ width: '190px' }}
            key={id}
        >
            <div className="flex items-center justify-center w-full border-1 border-black">
                <img src={image} alt={name} className="object-cover" />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-2 text-center">{name}</h2>
                <hr className="mb-2" />
                <p className="text-xs text-gray-600 mb-2 w-full">
                    description:
                    <br />
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-normal text-gray-800 w-full">Prix : <strong>{price} {moneyType}</strong></p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
