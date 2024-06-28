import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

// components
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import FirstSectionComponent from '../components/home/FirstSectionComponent';
import SecondSectionComponent from '../components/home/SecondSectionComponent';

const Home = () => {
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        getUsers()
            .then(response => {
                setServerData(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);

    return (
        <>
            <NavbarComponent />
            <FirstSectionComponent />
            <SecondSectionComponent serverData={serverData} />
            <FooterComponent />
        </>
    );
};

export default Home;
