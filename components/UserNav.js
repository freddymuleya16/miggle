import Image from "next/image";
import React, { useEffect, useState } from "react";
import Sender from "@/components/Message/Sender";
import { collection, doc, documentId, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { getAuth } from 'firebase/auth';
import Matcher from '@/components/Matcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faCross, faHome, faHomeAlt, faHomeLg, faHomeUser, faPerson, faRightFromBracket, faTrash, faUser, faXmark, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import UseNotifications from "./Notifications";
import { logout } from "@/actions/authActions";
import { useDispatch } from "react-redux";
import MatchCard from "./MatchCard";
import SettingsItem from "./SettingsItem";
import ConfirmationModal from "./Confirmation";


export default function UserNav({ profileOpen, user, setCurrentMatch, toggle, activeBar, handleBarClick, setProfileOpen }) {
    const [activeTab, setActiveTab] = useState('matches');
    const [matches, setMatches] = useState([])
    const { notificationNumber, notification } = UseNotifications()
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleSignout = () => { 
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
                        const match = data.matches.find(obj2 => obj1.id === obj2.matchId||obj1.id === obj2.userId);
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
                    <div className="flex items-center cursor-pointer" >
                        <Image src={user.pictures[0]} width={300} height={300} alt="" className="object-cover inline-block h-12 w-12 rounded-full ring-2 ring-white bg-white" />
                        <span className="body-font font-poppins text-white mx-3">
                            {user.firstName} {user.lastName}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => handleBarClick('home')} className="sm:inline-block focus:outline-none hidden relative  p-2 text-white hover:text-xl">
                            <FontAwesomeIcon icon={faHomeLg} size='lg' />
                        </button>
                        <button onClick={(e) => handleSignout(e)} className="inline-block focus:outline-none sm:hidden relative  p-2 text-white hover:text-xl">
                            <FontAwesomeIcon icon={faRightFromBracket} size='xl' />
                        </button>
                        <button onClick={() => handleBarClick('notifications')} className="sm:inline-block focus:outline-none hidden relative  p-2 text-white hover:text-xl">
                            <FontAwesomeIcon icon={faBell} size='xl' />
                            <span className="absolute top-0 right-0 bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                {notificationNumber}
                            </span>
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
                            className={`mr-3 font-poppins px-2 font-medium focus:outline-none  border-b-4 border-rose-500 
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
                <>
                    <div className="overflow-y-auto  h-[78vh] p-3 flex  ">
                        {matches.map((match, index) => <Matcher onClick={() => {
                            setCurrentMatch(match);
                            handleTabClick('messages');
                        }} key={index} data={{ pictures: match.pictures, name: match.firstName, surname: match.lastName, id: match.id }} />)}
                    </div>
                    <div className="p-1 h-[5.3333%] bg-gradient-to-r from-rose-500 to-rose-300 ">
                        <button onClick={() => handleBarClick('settings')} className=" h-100  hover:text-lg   text-white   flex items-center justify-center w-100 focus:outline-none ">
                            <FontAwesomeIcon icon={faCog} className="mr-2" />
                            Settings
                        </button>
                    </div>

                </>}
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

            {
                activeBar == 'settings'
                &&
                <>
                    <div className="overflow-y-auto h-[78vh]">
                        <SettingsItem profileOpen={profileOpen} name="Profile Set Up" picture={'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/SystemImages%2FProfile_Picture.jpg?alt=media&token=851cdf22-4bc0-4dd9-88fe-865e4a5d1cac'} onClick={() => { setProfileOpen((prev) => !prev) }} />
                        <SettingsItem name="Security Settings" onClick={() => { }} picture={'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/SystemImages%2Fsecurity.jpg?alt=media&token=1101161b-cf67-4146-b2ed-12489efbb572'} />
                        <SettingsItem name="Communication Settings" picture={'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/SystemImages%2Fcommunication.jpg?alt=media&token=f9ffa68d-5ca9-4511-9180-66b0ce2d9226'} onClick={() => { }} />
                        <SettingsItem name="Account Management" onClick={() => { }} picture={'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/SystemImages%2FAccount.jpg?alt=media&token=d7c2be02-0adf-44a5-897d-03498bc86cf0'} />
                        <SettingsItem name="Terms and Privacy Policy" onClick={() => { }} picture={'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/SystemImages%2Fterms.jpg?alt=media&token=0320ac0b-046b-49ba-bb28-fe0566790109'} />

                    </div>
                    <div className="p-1 h-[5.3333%] bg-gradient-to-r from-rose-500 to-rose-300 hidden sm:block">
                        <button onClick={(e) => setShowModal(true)} class=" h-100  hover:text-lg   text-white   flex items-center justify-center w-100 focus:outline-none ">
                            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                            Sign out
                        </button>
                    </div>
                    <ConfirmationModal
                        isOpen={showModal}
                        title="Sign out"
                        message="Are you sure?"
                        onConfirm={() => handleSignout()}
                        onCancel={() => setShowModal(false)}
                    />
                </>
            }

        </>);
}