import Image from "next/image";
import React, { useEffect, useState } from "react";
import Sender from "@/components/Message/Sender";
import { collection, doc, documentId, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { getAuth } from 'firebase/auth';
import Matcher from '@/components/Matcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faCross, faRightFromBracket, faXmark, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import UseNotifications from "./Notifications";
import { logout } from "@/actions/authActions";
import { useDispatch } from "react-redux";
import MatchCard from "./MatchCard";


export default function UserNav({ user, setCurrentMatch, toggle, activeBar, handleBarClick }) {
    const [activeTab, setActiveTab] = useState('matches');
    const [matches, setMatches] = useState([])
    const { notificationNumber, notification } = UseNotifications()
    const dispatch = useDispatch();

    const handleSignout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                doc(db, `users`, getAuth().currentUser.uid),
            ),
            (querySnapshot) => {
                const data = querySnapshot.data();
                getUsers(data.matches?.map((match) => {
                    if (match.matchId) {
                        return match.matchId
                    } else if (match.userId) {
                        return match.userId
                    } else {
                        return match
                    }
                })).then((users) => {

                    const usersWitchMatchdate = users.map(obj1 => {
                        const match = data.matches.find(obj2 => obj1.id === obj2.matchId);
                        return { ...obj1, ...match };
                    });

                    setMatches([...usersWitchMatchdate])
                })
            }
        );
        return () => unsubscribe();
    }, [])

    // Get the user documents for a list of user IDs
    async function getUsers(userIds) {
        const userDocs = [];

        if (userIds && userIds.length > 0) {
            const q = query(
                collection(db, "users"),
                where(documentId(), "in", userIds)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                userDocs.push({ ...doc.data(), id: doc.id });
            });
        }

        return userDocs;
    }


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    return (
        < >
            <div className=" h-1/6">
                <div className="bg-gradient-to-r from-rose-500 to-rose-300 p-3 h-3/4 flex items-center justify-between">
                    <div className="flex items-center cursor-pointer" onClick={() => handleBarClick('home')}>
                        <Image src={user.pictures[0]} width={300} height={300} alt="" className="object-cover inline-block h-12 w-12 rounded-full ring-2 ring-white bg-white" />
                        <span className="body-font font-poppins text-white mx-3">
                            {user.firstName} {user.lastName}
                        </span>
                    </div>
                    <div className="flex items-center">

                        <button onClick={() => handleBarClick('notifications')} className="sm:inline-block hidden relative bg-white rounded-full p-3 border-2 text-rose-500 focus:bg-rose-500 hover:bg-rose-500 hover:border-rose-500">
                            <FontAwesomeIcon icon={faBell} size='xl' />
                            <span className="absolute top-0 right-0 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {notificationNumber}
                            </span>
                        </button>
                        <button onClick={(e) => handleSignout(e)} className='bg-white rounded-full ml-2 p-3 border-2 text-rose-500  focus:bg-rose-500 hover:bg-rose-500 hover:border-rose-500'>
                            <FontAwesomeIcon icon={faRightFromBracket} size='xl' />
                        </button>
                    </div>
                </div>

                {activeBar == 'home' &&
                    <div className="px-2 h-1/4 ">
                        <button
                            className={`mr-3 font-poppins p-2 font-medium focus:outline-none ${activeTab === 'matches' ? 'border-b-4 border-rose-500' : 'text-slate-700 p-2'}`}
                            onClick={() => handleTabClick('matches')}
                        >
                            Matches
                        </button>
                        <button
                            className={`mr-3 font-poppins p-2  font-medium focus:outline-none ${activeTab === 'messages' ? 'border-b-4 border-rose-500' : 'text-slate-700  p-2'}`}
                            onClick={() => handleTabClick('messages')}
                        >
                            Messages
                        </button>
                    </div>}
                {activeBar == 'settings' &&
                    <div className="px-2 h-1/4 ">
                        <button
                            className={`mr-3 font-poppins px-2 font-medium focus:outline-none  border-b-4 border-rose-500      p-2 
                                  }`}
                        >
                            Settings
                        </button>

                    </div>}
                {activeBar == 'notifications' &&
                    <div className="px-2 h-1/4 ">
                        <button
                            className={`mr-3 font-poppins px-2 font-medium focus:outline-none  border-b-4 border-rose-500      p-2 
                                  }`}
                        >
                            Notifications
                        </button>
                    </div>}


            </div>


            {
                activeTab === 'matches' && activeBar == 'home'
                &&
                <div className="overflow-y-auto  h-5/6 p-3 flex ">
                    {matches.map((match, index) => <Matcher onClick={() => {
                        setCurrentMatch(match);
                        console.log(match);
                        handleTabClick('messages');
                    }} key={index} data={{ pictures: match.pictures, name: match.firstName, surname: match.lastName, id: match.id }} />)}
                </div>}
            {
                activeTab === 'messages' && activeBar == 'home'
                &&
                <div className="overflow-y-auto   h-5/6">
                    {matches.map((match, index) => <Sender onClick={() => setCurrentMatch(match)} key={index} data={{ pictures: match.pictures, name: match.firstName, surname: match.lastName, id: match.id }} />)}
                </div>
            }
            {
                activeBar == 'notifications'
                &&
                <div className="overflow-y-auto   h-5/6">
                    {notification}
                </div>
            }


        </>);
}