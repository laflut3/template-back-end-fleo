import React from 'react'
import { IoHome } from 'react-icons/io5';
import logoWeb from "../assets/images/logoSite.png";

export default function Error_page() {
    return (
        <div className="bg-gray-800 text-white h-screen flex flex-col items-center justify-center">
            <img src={logoWeb} alt="logo fleo-web" className="w-20 h-20 mb-4" />
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Page non trouvée</p>
            <a href="/" className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded text-white">
                <IoHome className="mr-2" size={20} />Retour à l'accueil
            </a>
        </div>
    )
}


