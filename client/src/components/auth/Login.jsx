import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des images utilisées pour les icônes
import funnyIconHidden from '../../assets/images/login/funny-icon-hidden.jpg';
import funnyIconDefault from '../../assets/images/login/funny-icon-default.jpg';
import unIcon from '../../assets/images/login/un.jpg';
import deuxIcon from '../../assets/images/login/deux.jpg';
import troisIcon from '../../assets/images/login/trois.jpg';
import quatreIcon from '../../assets/images/login/quatre.jpg';
import cinqIcon from '../../assets/images/login/cinq.jpg';
import sixIcon from '../../assets/images/login/six.jpg';
import septIcon from '../../assets/images/login/sept.jpg';
import basIcon from '../../assets/images/login/bas.jpg';


/**
 * Composant de connexion permettant aux utilisateurs de se connecter avec un nom d'utilisateur et un mot de passe.
 *
 * @component
 */
function Login(props) {
    /**
     * constante pour le nom d'utilisateur 
     */
    const [username, setUsername] = useState('');

    /**
     * constante pour le mot de passe
     */
    const [password, setPassword] = useState('');

    /**
     * constante pour montrer le mot de passe
     */
    const [showPassword, setShowPassword] = useState(false);

    /**
     * constante pour l'image d'animation
     */
    const [funnyImage, setFunnyImage] = useState(null);

    const images = [
        unIcon, deuxIcon, troisIcon, quatreIcon, cinqIcon, sixIcon, septIcon, basIcon
    ];

    /**
     * Gère la tentative de connexion en console et devrait inclure la logique de connexion réelle.
     */
    const handleLogin = () => {
        console.log('Tentative de connexion avec', { username, password });
        // mettre la logique de connexion ici
    };

    /**
     * Met à jour l'image d'utilisateur en fonction des actions de l'utilisateur comme la saisie de l'username ou la modification du mot de passe.
     */
    const handleUserAction = () => {
        if (showPassword) {
            setFunnyImage(funnyIconHidden);
        } else if (username.length === 0) {
            setFunnyImage(funnyIconDefault);
        } else if (username.length > images.length) {
            setFunnyImage(basIcon);
        } else {
            const index = Math.min(username.length, images.length) - 1;
            setFunnyImage(images[index]);
        }
    };

    /**
     * Met à jour l'image d'utilisateur lors de la saisie de l'username ou de la modification du mot de passe.
     */
    useEffect(() => {
        handleUserAction();
    }, [showPassword, username, handleUserAction]);

    return (
        <div className="flex justify-center items-center h-[100vh] bg-gray-100">
            <div className="bg-blue-300 p-6 rounded-md shadow-md w-[400px]">
                <h2 className="text-center text-2xl text-black mb-4">Connexion</h2>
                <div className="flex justify-center mb-4">
                    <div className="flex justify-center items-start">
                        {funnyImage && <img className="iconFunny" src={funnyImage} alt="User Image" />}
                        {!funnyImage && (
                            <img
                                className="iconFunny"
                                src={funnyIconDefault}
                                alt="default funny icon"
                            />
                        )}
                    </div>
                </div>
                <form action="" className="w-full" onSubmit={handleLogin}>
                    <label className="block mb-1 font-bold" htmlFor="username">Nom d'utilisateur</label>
                    <input
                        id="username"
                        className="p-2 border border-gray-300 rounded-md w-full mb-4"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            handleUserAction();
                        }}
                        autoComplete="off"
                    />
                    <div className="flex-label flex justify-between items-center">
                        <label className="block mb-1 font-bold" htmlFor="password">Mot de passe</label>
                        <label className="flex items-center text-sm">
                            Montrer
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={(e) => {
                                    setShowPassword(e.target.checked);
                                    handleUserAction();
                                }}
                                className="mr-2 special-checkbox"
                            />
                        </label>
                    </div>
                    <input
                        id="password"
                        className="p-2 border border-gray-300 rounded-md w-full mb-4"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-[#99B6DE] transition duration-300 w-full"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}

/**
 * Propriétés attendues pour le composant Login.
 * 
 * @typedef {object} LoginProps
 * @property {string} [username] - Nom d'utilisateur.
 * @property {string} [password] - Mot de passe.
 */

/**
 * Les propriétés du composant Login.
 * 
 * @type {LoginProps}
 */

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
};

export default Login;
