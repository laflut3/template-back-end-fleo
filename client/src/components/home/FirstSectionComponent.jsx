import React from 'react';

import DomainSearchComponent from './DomainSearchComponent';
import TestimonialsSlider from '../TestimonialsSlider';

const FirstSectionComponent = () => {
    const testimonialsData = [
        { name: 'John Doe' },
        { name: 'Jane Smith' },
        { name: 'Michael Brown' },
        { name: 'Emily Davis' },
        { name: 'Chris Johnson' },
        { name: 'Jessica Martinez' },
        { name: 'David Thompson' },
        { name: 'Olivia Wilson' },
        { name: 'Daniel Lee' },
        { name: 'Sophia White' },
    ];


    return (
        <div className="bg-blue-300 p-4 h-[120vh] first-section">
            <div className="partie1 mb-[15vh]">
                <h1 className="text-center text-4xl text-white p-4 relative">
                    <span className="absolute inset-0 -z-1 text-black opacity-50 mt-3.5 ml-1.5">
                        First Section
                    </span>
                    <span className="relative">First Section</span>
                </h1>
                <p className="text-center text-white mt-4">Contenu de la première section (image)...</p>
            </div>
            <TestimonialsSlider testimonials={testimonialsData} />
            <DomainSearchComponent />
        </div>
    );
};

export default FirstSectionComponent;

//https://www.dropbox.com/