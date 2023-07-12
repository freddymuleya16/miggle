import React, { useEffect, useState } from 'react'

import Temp from "../public/img/login-bg.jpg"
import Image from 'next/image'
import Carousel from './Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft, faBoltLightning, faCheck, faChevronLeft, faChevronRight, faHeart, faSadTear, faStar, faXmark } from '@fortawesome/free-solid-svg-icons'
import { db } from '@/utils/firebase'
import { collection, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { calculateDistance } from '@/utils/helpers'
import FullscreenLoading from './FullscreenLoading'
import { getAuth } from 'firebase/auth'
import { addNotification } from '@/actions/notificationActions'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

function MatchCard({ user }) {
    const dispatch = useDispatch()
    const [potentialMatches, setPotentialMatches] = useState([]);
    const [images, setImages] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [noMatches, setNoMatches] = useState(false);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    useEffect(() => {
        setImages([...potentialMatches[0]?.pictures ?? []])
        setActiveIndex(0)
        console.log("Current match", potentialMatches[0])
        if (potentialMatches.length == 0) {
            setNoMatches(true);
        }
    }, [potentialMatches])

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
                    console.log(potentialMatch.firstName, " No Location")
                    return false;

                }

                // Check if the potential match is blocked by the current user
                if (user.blockedUsers && user.blockedUsers.includes(potentialMatch.id)) {
                    console.log(potentialMatch.firstName, ` is blocked by current user`);
                    return false;
                }

                // Calculate the distance between the potential match and the current user
                const distance = calculateDistance(
                    potentialMatch.location,
                    user.location
                );

                // Check if the potential match is within the desired distance
                if (parseFloat(distance) > parseFloat(user.distance)) {
                    console.log(potentialMatch.firstName, ` Too far is ${distance} away prefer ${user.distance}`)
                    return false;
                }

                // Get the potential match's age
                const age = parseInt(potentialMatch.age);

                // Check if the potential match's age is within the desired range
                const [minAge, maxAge] = user.ageRange
                    .split("-")
                    .map((value) => parseInt(value));
                if (age < minAge || age > maxAge) {
                    console.log(potentialMatch.firstName, `  is ${age} old prefer ${user.ageRange}`)
                    return false;
                }

                // Check if the potential match's gender matches the current user's orientation
                if (user.orientation !== potentialMatch.gender && user.orientation !== 'both') {
                    console.info(
                        `Current user (${user.gender}) is looking for ${user.orientation}, but potential match (${potentialMatch.gender}) is the same gender.`
                    );
                    return false;
                }

                // Check if the potential match has already been swiped on by the current user
                if (user.swipingHistory && user.swipingHistory[potentialMatch.id]) {
                    console.log(potentialMatch.firstName, `  ${user.swipingHistory[potentialMatch.id]} already`)
                    return false;
                }

                // Check if the potential match is the current user
                let uid = getAuth().currentUser.uid;
                if (uid == potentialMatch.id) {
                    console.log(potentialMatch.firstName, ` is me`)
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
        if (noMatches) {
            return (<div className="basis-full bg-gray-200">
                <div className="bg-image h-screen">
                    <div className="align-items-center flex h-screen justify-center welcome-screen">
                        <FontAwesomeIcon icon={faSadTear} size='2xl' className='text-rose-500 mr-2' />
                        <h2 className='text-rose-500 mr-2 text-xl font-bold font-poppins'>No matches found.</h2>
                    </div>
                </div>
            </div>)
        }
        return <div className="basis-full bg-gray-200"><FullscreenLoading /></div>
    }

    const handleSwipe = async (swipe, matchId) => {
        // Get user document and update swiping history
        const usersCollection = collection(db, "users");
        const userId = getAuth().currentUser.uid;
        const userDoc = doc(usersCollection, userId);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();

        const updatedData = {
            swipingHistory: {
                [matchId]: swipe,
                ...(userData.swipingHistory || {}),
            },
        };

        user.swipingHistory = updatedData.swipingHistory

        await updateDoc(userDoc, updatedData);

        // Check if the user swiped right and the match also swiped right
        if (swipe === "like") {
            const matchDoc = doc(usersCollection, matchId);
            const matchDocSnapshot = await getDoc(matchDoc);
            const matchDocData = matchDocSnapshot.data();
            if (
                matchDocData.swipingHistory &&
                matchDocData.swipingHistory[userId] === "like"
            ) {
                // Update both users' matches arrays
                const userMatches = userData.matches
                    ? [...userData.matches, { matchId, matchDate: new Date() }]
                    : [{ matchId, matchDate: new Date() }];
                const matchMatches = matchDocData.matches
                    ? [...matchDocData.matches, { userId, matchDate: new Date() }]
                    : [{ userId, matchDate: new Date() }];
                const updatedUserData = { matches: userMatches };
                const updatedMatchData = { matches: matchMatches };

                await updateDoc(userDoc, updatedUserData);
                await updateDoc(matchDoc, updatedMatchData);

                // Display match success message
                const fullName = `${matchDocData.firstName} ${matchDocData.lastName}`;
                toast.success(`Matched with ${fullName}`);
                dispatch(
                    addNotification(matchId, "New Match", `You matched with ${userData.firstName} ${userData.lastName}`)
                );
                dispatch(
                    addNotification(userId, "New Match", `You matched with ${fullName}`)
                );
            }
            // Remove match from potential matches and display next match (if available)
            setPotentialMatches((matches) => {
                const remainingMatches = matches.filter((match) => match.id !== matchId);
                return remainingMatches;
            });
        }

    }

    return (
        <div className="basis-full bg-gray-200">
            <div className="flex justify-center  sm:py-5 bg-gray-200 sm:h-screen h-[96vh]">
                <div className="w-100 sm:max-w-md">
                    {/* <Carousel images={[Temp, Temp]} className='rounded-lg' /> */}
                    <div className="relative sm:rounded-2xl  p-0 h-full">
                        <Image
                            src={images[activeIndex]}
                            alt="Carousel Image"
                            className="w-100 sm:w-[unset] mx-auto object-cover h-5/6 sm:rounded-t-2xl shadow-2xl"
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
                                <h2 className="text-3xl font-poppins font-extrabold    text-white">{potentialMatches[0].firstName} {potentialMatches[0].lastName} {potentialMatches[0].age}</h2>
                                <p className="text-xl font-poppins mt-1 text-gray-100 max-w-sm overflow-hidden line-clamp-2">
                                    {potentialMatches[0].aboutMe}
                                </p>

                            </div>
                            <hr color='white' />

                            <div className="flex justify-between items-center p-4  sm:rounded-b-2xl bg-black ">
                                <button className="flex items-center justify-center rounded-full  border-orange-500 text-orange-500  border-2 text-xl p-4 w-16 h-16 hover:bg-orange-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faArrowRotateLeft} size="2xl" />
                                </button>
                                <button onClick={() => handleSwipe('dislike', potentialMatches[0].id)} className="flex items-center justify-center rounded-full  border-red-500 text-red-500  border-2 text-xl p-4 w-20 h-20 hover:bg-red-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                                </button>
                                <button className="flex items-center justify-center rounded-full border-blue-500 text-blue-500  border-2  text-xl p-4 w-16 h-16 hover:bg-blue-500 hover:text-white hover:text-2xl">
                                    <FontAwesomeIcon icon={faStar} size="2xl" />
                                </button>

                                <button onClick={() => handleSwipe('like', potentialMatches[0].id)} className="flex items-center justify-center rounded-full border-green-500 text-green-500  border-2  text-xl p-4 w-20 h-20 hover:bg-green-500 hover:text-white hover:text-2xl">
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