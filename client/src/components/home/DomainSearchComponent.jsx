import React, { useState, useEffect } from 'react';

/**
 * Composant barre de recherche de domaine
 * @returns {JSX.Element} Composant DomainSearchComponent
 */
const DomainSearchComponent = () => {

    /**
     * Constante pour la largeur de la fenêtre
     * @type {[number, function]} windowWidth
     * @returns {number} windowWidth[0] - La largeur de la fenêtre
     */
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    /**
     * Constante pour savoir si l'utilisateur est sur mobile
     * @type {[boolean, function]} isMobile
     */
    const isMobile = windowWidth < 455;

    /**
     * Constante pour la chaîne de recherche
     * @type {[string, function]} searchString
     * @returns {string} searchString[0] - La chaîne de recherche
     */
    const [searchString, setSearchString] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    /**
     * Cette fonction gère les propositions de recherche 
     * en fonction de ce que l'user saisie
     * @param {*} e 
     */
    const handleSearchProposition = (e) => {
        var { value } = e.target;
        setSearchString(value);

        // Simuler des propositions de recherche basées sur le texte saisi
        const filteredResults = mockSearchResults.filter(result =>
            result.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    /**
     * Cette fonction gère la soumission du formulaire
     * @returns {void} Soumet le formulaire 
     */
    const handleSubmit = () => {
        console.log('Recherche de:', searchString);
    };

    /**
     * Exemple de résultats de recherche simulés
     */
    const mockSearchResults = [
        'Technologie',
        'Finance',
        'Santé',
        'Art',
        'Education',
        'Design',
        'Musique',
        'Sport',
        'Actualités',
    ];

    /**
     * Met à jour la largeur de la fenêtre lors du redimensionnement
     * @returns {void} Met à jour la largeur de la fenêtre
     */
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /**
     * Permet de quitter le menu déroulant en cliquant sur echap
     * @param {*} e 
     */
    const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            setSearchString('');
            setSearchResults([]);
        }
    };

    return (
        <section className="bg-blue-300 p-4 mt-[15vh]">
            <p className="text-center text-2xl text-black p-4">
                Vous recherchez quelque chose de spécifique ?
            </p>
            <div className="flex flex-col items-center">
                <form
                    action=""
                    method="get"
                    target="_blank"
                    className={`flex ${isMobile ? 'flex-col' : 'items-center'} w-full max-w-4xl`}
                    onSubmit={handleSubmit}
                >
                    <div className={`flex items-center w-full ${isMobile ? 'flex-col' : 'justify-between'}`}>
                        <input
                            className={`p-2 border border-gray-300 rounded-md ${isMobile ? 'w-full mb-2' : 'flex-grow'}`}
                            type="text"
                            name="query"
                            required
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            placeholder="Rechercher un domaine"
                            value={searchString}
                            onChange={handleSearchProposition}
                            onKeyDown={handleEscapeKey}
                        />
                    </div>
                    {!isMobile ? (
                        <button
                            className="bg-gray-800 text-white py-2 px-4 rounded-md ml-2 hover:bg-[#99B6DE] transition duration-300"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Rechercher
                        </button>
                    ) : (
                        <button
                            className="bg-gray-800 text-white py-2 px-4 rounded-md mt-2 hover:bg-[#99B6DE] transition duration-300 w-full"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Rechercher
                        </button>
                    )}
                </form>
                <div className="mt-4 w-full max-w-4xl relative z-50">
                    {searchResults.length > 0 && (
                        <ul className="bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto absolute w-full">
                            {searchResults.map((result, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setSearchString(result);
                                        setSearchResults([]);
                                    }}
                                >
                                    {result}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <p className="mt-4 text-center w-full relative z-10">
                    <a
                        className="text-gray-800 underline"
                        href="https://domains.squarespace.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        En savoir plus sur nos pages
                    </a>
                </p>
            </div>
        </section>
    );
};


DomainSearchComponent.propTypes = {

};

export default DomainSearchComponent;
