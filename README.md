# README

## Projet : Site E-Commerce

Bienvenue dans le projet de site e-commerce géré par la boîte **FLEO-web**. Ce projet utilise les technologies Node.js, React, HTML et CSS. Il est administré par une équipe composée de développeurs full stack, scrum masters, product owners et d'autres membres clés.

## Table des matières
- [Installation](#installation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Structure du Projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Équipe](#équipe)
- [Licence](#licence)

## Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

### Étapes d'installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/FLEO-web/ecommerce-project.git
    cd ecommerce-project
    ```

2. Installez les dépendances pour le backend et le frontend :
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

3. Configurez les variables d'environnement nécessaires (voir `backend/.env.example` et `frontend/.env.example`).

4. Démarrez le serveur backend :
    ```bash
    cd backend
    npm start
    ```

5. Démarrez le serveur frontend :
    ```bash
    cd ../frontend
    npm start
    ```

Votre application devrait maintenant être accessible à l'adresse `http://localhost:3000`.

## Fonctionnalités

- **Authentification des utilisateurs** : Inscription, connexion et gestion de session.
- **Gestion des produits** : Ajout, modification et suppression de produits.
- **Panier d'achat** : Ajout de produits au panier, mise à jour des quantités et suppression.
- **Passation de commandes** : Processus de paiement et confirmation de commande.
- **Tableau de bord administrateur** : Gestion des utilisateurs, des commandes et des produits.

## Technologies Utilisées

- **Backend** : Node.js, Express, MongoDB
- **Frontend** : React, Redux, HTML, CSS
- **Autres** : Docker, Jest (pour les tests)

## Structure du Projet

```plaintext
ecommerce-project/
├── backend/        # Code source du backend
│   ├── src/
│   ├── .env.example
│   └── package.json
├── frontend/       # Code source du frontend
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Commitez vos changements (`git commit -m 'Ajout d'une fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

Veuillez vous assurer que votre code suit les normes de codage du projet et qu'il est bien documenté.

## Équipe

- **Léo Torres** : Full Stack Developer, Scrum Master
- **Florian Filloux** : Back end Developer, ProductPath Owner
- **Dorian Blanchet** : Frontend Developer
- **FLEO-web** : Société de développement

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Merci d'utiliser notre solution e-commerce. Si vous avez des questions, n'hésitez pas à contacter notre équipe de support.
