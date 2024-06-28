import React, { useState } from 'react';

// assets
import { IoMenu } from 'react-icons/io5';
import logoWeb from "../assets/images/logoSite.png"

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gray-800 text-white">
            <nav className="container mx-auto flex items-center justify-between p-4 relative">
                <div className="flex items-center">
                    <a href="/" className="text-xl font-bold"><img src={logoWeb} alt="logo fleo-web" className="w-11 h-11" /></a>
                </div>
                <div className="lg:hidden relative">
                    <button
                        className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <IoMenu className="text-white" size={24} />
                    </button>
                    <ul className={`absolute top-full right-0 bg-gray-800 lg:hidden ${isOpen ? 'block' : 'hidden'} mt-2 py-2 px-0 border border-white`}>
                        <li className="nav-item">
                            <a href="/" className="block px-6 py-2 text-sm text-white hover:opacity-75">Page1</a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="block px-6 py-2 text-sm text-white hover:opacity-75">Page2</a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="block px-6 py-2 text-sm text-white hover:opacity-75">Page3</a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="block px-6 py-2 text-sm text-white hover:opacity-75">Page4</a>
                        </li>
                    </ul>
                </div>
                <ul className="hidden lg:flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li className="nav-item">
                        <a href="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">Page1</a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">Page2</a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">Page3</a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">Page4</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavbarComponent;
