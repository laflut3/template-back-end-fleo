import React, { useRef, useEffect } from 'react';
import '../styles/TestimonialsSlider.css';

const Card = ({ testimonial }) => {
    return (
        <div className="scroller__item flex-none rounded-lg overflow-hidden shadow-lg max-w-2">
            <div className="p-6">
                <div className="style__Card-sc-1rjgh7-0 iViTZb">
                    <div className="style__CardPhoto-sc-1rjgh7-2 jmpiaX">
                        <picture>
                            <img
                                src={testimonial.photoUrl}
                                alt={`${testimonial.name}'s Photo`}
                                height="110"
                                width="110"
                                loading="lazy"
                            />
                        </picture>
                    </div>
                    <p>{testimonial.content}</p>
                    <div className="style__CardLogo-sc-1rjgh7-1 kvZOOX">
                        <strong>{testimonial.name}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TestimonialsSlider = ({ testimonials }) => {
    return (
        <div className="overflow-hidden bg-white mt-4">
            <div className="flex space-x-4 p-4 testimonials-slider">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSlider;
