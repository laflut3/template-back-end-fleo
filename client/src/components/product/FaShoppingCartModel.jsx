import { FaShoppingCart } from 'react-icons/fa';
import PropTypes from 'prop-types';

/**
 *  FaShoppingCartModel est l'icone du panier remodelée pour avoir un compteur de produits.
 * @param {*} count 
 * @returns 
 */
function FaShoppingCartModel({count}) {
    return (
        <>
            <span style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: '-10px', backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontSize: '12px', color: 'white', margin: '0' }}>{count}</p>
                </div>
                <FaShoppingCart className="text-3xl text-white"style={{ marginTop: '10px' }} />
            </span>
        </>
    );
}

/**
 * Les propriétés attendues pour le composant FaShoppingCartModel.
 * 
 * @typedef {object} FaShoppingCartModelProps
 * @property {number} [count] - Nombre de produits dans le panier.
 */
FaShoppingCartModel.prototype = {
    count: PropTypes.number,
}

export default FaShoppingCartModel;
