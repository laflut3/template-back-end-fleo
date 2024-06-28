import React, { useState, useEffect } from 'react';
import BubbleComponent from '../BubbleComponent';

const SecondSectionComponent = ({ serverData }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    //console.log('Données récupérées avec succès:', serverData);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="bg-blue-100 p-4 min-h-[120vh] second-section">
            <h2 className="text-center text-4xl text-white p-4 relative">
                <span className="absolute inset-0 -z-1 text-black opacity-50 mt-3.5 ml-1.5">
                    Second Section
                </span>
                <span className="relative">Second Section</span>
            </h2>
            <hr className="border-2 border-white w-1/4 mx-auto mb-4" />
            {serverData.length > 0 ? (
                <div className="space-y-4 pt-6 h-[25vh]">
                    <div className={`flex ${windowWidth < 680 ? 'flex-col items-center justify-center' : 'justify-evenly items-center'}`}>
                        {serverData.map((user, index) => (
                            <BubbleComponent key={index} username={user.username} id={index} />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center text-white">Loading...</p>
            )}
        </div>
    );
};

export default SecondSectionComponent;
