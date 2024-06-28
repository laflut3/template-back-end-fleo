import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validator from 'email-validator';

function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Tentative d'enregistrement avec", { username, password, email, password2 });

    /**
     * Vérifie que tous les champs sont remplis.
     */
    if (!username || !email || !password || !password2) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    /**
     * Vérifie que le mot de passe contient au moins 8 caractères.
     */
    if (password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    /**
     * Vérifie que le nom d'utilisateur ne contient que des lettres et des chiffres.
     */
    if (!usernameRegex.test(username)) {
      alert("Le nom d'utilisateur ne doit contenir que des lettres et des chiffres");
      return;
    }

    /**
     * Vérifie que l'adresse email est valide grâce à la librairie email-validator 
     * qui verifie si l'adresse email est conforme à tout les domaines mail dispo.
     */
    if (!validator.validate(email)) {
      alert("Adresse email invalide");
      return;
    }

    /**
     * Vérifie que les mots de passe correspondent.
     */
    if (password !== password2) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-100 w-[400px]">
      <div className="bg-blue-300 p-6 rounded-md shadow-md w-[400px]">
        <h2 className="text-center text-2xl text-black mb-4">S'inscrire</h2>
        <form action="" method="post" className="w-full" onSubmit={handleRegister}>
          <label className="block mb-1" htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="block mb-1" htmlFor="email">Votre email</label>
          <input
            id="email"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mb-1" htmlFor="password">Mot de passe</label>
          <input
            id="password"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block mb-1" htmlFor="password2">Confirmer le mot de passe</label>
          <input
            id="password2"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-[#99B6DE] transition duration-300 w-full"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * 
 * Composant pour que l'utilisateur puisse s'inscrire. 
 * 
 * @param {Object} props - Le props de l'élément.
 * @param {string} props.username - L'identifiant.
 * @param {string} props.email - L'adresse email.
 * @param {string} props.password - Le mot de passe.
 * @param {string} props.password2 - La confirmation du mot de passe.
 * @returns {JSX.Element} - Le composant React Register.
 */
Register.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  password2: PropTypes.string,
};

export default Register;