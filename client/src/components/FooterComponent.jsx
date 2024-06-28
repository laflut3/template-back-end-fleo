import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

/**
 * Le composant FooterComponent permet d'afficher le pied de page
 * @returns
 */
const FooterComponent = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Fleo-WEB. Tous droits réservés.</p>
        <hr className="border-2 border-white w-1/6 mx-auto my-4" />
        <div className="flex justify-center space-x-6 my-4">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-white hover:text-blue-500">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="text-white hover:text-black">
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-white hover:text-pink-500">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
