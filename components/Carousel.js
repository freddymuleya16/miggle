import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';

const Carousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative">
             <Image
    src={images[activeIndex]}
    alt="Carousel Image"
    className="mx-auto object-cover h-full"
    layout="fixed"
    width={500} // Set a preferred width here
    height={300} // Set a preferred height here
  /> 

           

            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="flex">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-10 h-3 mx-1 rounded-md ${index === activeIndex ? 'bg-gray-800' : 'bg-gray-400'
                                }`}
                            onClick={() => setActiveIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                <button
                    className="p-2   text-white rounded-full  focus:outline-none"
                    onClick={handlePrevious}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className='text-3xl text-gray-800  hover:text-gray-700'/> 
                </button>
            </div>

            <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                <button
                    className="p-2   text-white rounded-full  focus:outline-none"
                    onClick={handleNext}
                >
                   
                   <FontAwesomeIcon icon={faChevronRight} className='text-3xl text-gray-800  hover:text-gray-700'/> 
                </button>
            </div>
        </div>
    );
};

export default Carousel;
