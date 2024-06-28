import React from 'react'
import { useParams } from 'react-router-dom';
import LeftBar from '../components/LeftBar'

function ProductPage() {
  /**
   * Constante qui permet de récupérer l'identifiant du produit
   */
  const { id } = useParams();


  return (
    <>
      {/* <!-- Product --> */}
      <LeftBar />
      {id ? (
        <div>
          <h1>Product ID: {id}</h1>
        </div>
      ) : (
        <div>
          <h1>All Products</h1>
        </div>
      )}
    </>
  );
}

export default ProductPage;




//https://blog.hubspot.com/marketing/product-pages-love-list  