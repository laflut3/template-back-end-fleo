import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import Product from './product/Product';
import FaShoppingCartModel from './product/FaShoppingCartModel';


/**
 * Le composant LeftBar permet d'afficher le panier et son contenu
 * @returns 
 */
function LeftBar() {
  /**
   * constante qui verifie si le panier est ouvert ou non
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * constante qui verifie si le panier est vide ou non
   */
  const [haveProduct, setHaveProduct] = useState(false);

  /**
   * constante qui recupere les details des produits
   */
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getProducts().then(response => {
      setDetails(response.data);
      setHaveProduct(response.data.length > 0);
    })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);


  return (
    <>
      <button
        className="fixed top-0 right-0 m-4 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Fermer' : (<FaShoppingCartModel count={details.length} />)}
      </button>
      <div
        className={`w-[250px] h-[100vh] bg-blue-200 p-[20px] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ position: 'fixed', top: 0, right: 0 }}
      >
        <h1 className="text-2xl font-bold">Panier</h1>
        <div>{haveProduct ? (
          <ul>

            <p className='text-sm font-normal mb-4 mt-4'>Vous avez {details.length} produits qui vous attendent !</p>
            {details.map((product) => (
              <Product key={product.id} name={product.name} price={product.price} moneyType={product.moneyType} />
            ))}
          </ul>
        ) : (
          'Votre panier est vide'
        )}
        </div>
      </div>
    </>
  );
}

export default LeftBar;

// https://react-icons.github.io/react-icons/