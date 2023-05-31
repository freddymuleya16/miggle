import React, { useEffect, useState } from 'react'

import Temp from "../public/img/login-bg.jpg"
import Image from 'next/image'
import Carousel from './Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft, faBoltLightning, faCheck, faChevronLeft, faChevronRight, faHeart, faStar, faXmark } from '@fortawesome/free-solid-svg-icons'
import { db } from '@/utils/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { calculateDistance } from '@/utils/helpers'
import FullscreenLoading from './FullscreenLoading'
import { getAuth } from 'firebase/auth'

function MatchCard({ user }) {
    const [potentialMatches, setPotentialMatches] = useState([]);
    const images = [Temp, Temp]
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {

        const usersCollection = collection(db, "users");
        // Subscribe to users collection changes in Firestore
        const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => {
            const users = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })).filter((potentialMatch) => {
                
                // Check if the potential match has a location
                if (!potentialMatch.location) {
                    console.log(potentialMatch.firstName," No Location")
                    return false;

                }

                // Calculate the distance between the potential match and the current user
                const distance = calculateDistance(
                    potentialMatch.location,
                    user.location
                );

                // Check if the potential match is within the desired distance
                if (parseFloat(distance) > parseFloat(user.distance)) {
                    console.log(potentialMatch.firstName,` Too far is ${distance} away prefer ${user.distance}`)
                    return false;
                }

                // Get the potential match's age
                const age = parseInt(potentialMatch.age);

                // Check if the potential match's age is within the desired range
                const [minAge, maxAge] = user.ageRange
                    .split("-")
                    .map((value) => parseInt(value));
                if (age < minAge || age > maxAge) {
                    console.log(potentialMatch.firstName,`  is ${age} old prefer ${user.ageRange}`) 
                    return false;
                }

                // Check if the potential match's gender matches the current user's orientation
                if (user.orientation !== potentialMatch.gender) {
                    console.info(
                        `Current user (${user.gender}) is looking for ${user.orientation}, but potential match (${potentialMatch.gender}) is the same gender.`
                    );
                    return false;
                }

                // Check if the potential match has already been swiped on by the current user
                if (user.swipingHistory && user.swipingHistory[potentialMatch.id]) {
                    console.log(potentialMatch.firstName,`  ${user.swipingHistory[potentialMatch.id]} already`) 
                    return false;
                }

                // Check if the potential match is the current user
                let uid = getAuth().currentUser.uid;
                if (uid == potentialMatch.id) {
                    console.log(potentialMatch.firstName,` is me`) 
                    return false;
                }

                // If the potential match passes all filters, return true
                return true;
            });

            setPotentialMatches(users);
        });

        // Unsubscribe from Firestore listener when the component unmounts or changes
        return () => {
            unsubscribe();
        };
    }, []);

    if (potentialMatches.length == 0) {
        return <div className="basis-full bg-gray-200"><FullscreenLoading /></div>
    }


    return (
        <div className="basis-full bg-gray-200">
            <div className="flex justify-center py-5 bg-gray-200 h-screen">
                <div className="">
                    {/* <Carousel images={[Temp, Temp]} className='rounded-lg' /> */}
                    <div className="relative bg-white rounded-2xl shadow-lg p-0 h-full">
                        <Image
                            src={potentialMatches[0].pictures[activeIndex]}
                            alt="Carousel Image"
                            className="mx-auto object-cover h-5/6 rounded-t-2xl "
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
                                <FontAwesomeIcon icon={faChevronLeft} size='2xl' className='text-3xl text-white   hover:text-gray-700' />
                            </button>
                        </div>

                        <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                            <button
                                className="p-2   text-white rounded-full  focus:outline-none"
                                onClick={handleNext}
                            >

                                <FontAwesomeIcon icon={faChevronRight} className='text-3xl text-white   hover:text-gray-700' />
                            </button>
                        </div>

                        <div className=' -my-24 transform rounded-2xl  '>
                            <div className=' bg-gradient-to-t from-black to-transparent  p-2'>
                                <h2 className="text-3xl font-poppins font-extrabold    text-white">Freddy Muleya 22</h2>
                                <p className="text-xl font-poppins mt-1 text-gray-100 max-w-sm overflow-hidden line-clamp-2">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>

                            </div>
                            <hr color='white' />

                            <div className="flex justify-between items-center p-4  rounded-b-2xl bg-black ">
                                <button className="flex items-center justify-center rounded-full  border-orange-500 text-orange-500  border-2 text-xl p-4 w-16 h-16 hover:bg-orange-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faArrowRotateLeft} size="2xl" />
                                </button>
                                <button className="flex items-center justify-center rounded-full  border-red-500 text-red-500  border-2 text-xl p-4 w-20 h-20 hover:bg-red-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                                </button>
                                <button className="flex items-center justify-center rounded-full border-blue-500 text-blue-500  border-2  text-xl p-4 w-16 h-16 hover:bg-blue-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faStar} size="2xl" />
                                </button>

                                <button className="flex items-center justify-center rounded-full border-green-500 text-green-500  border-2  text-xl p-4 w-20 h-20 hover:bg-green-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faHeart} size="2xl" />
                                </button>
                                <button className="flex items-center justify-center rounded-full  border-purple-500 text-purple-500  border-2 text-xl p-4 w-16 h-16 hover:bg-purple-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faBoltLightning} size="2xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchCard