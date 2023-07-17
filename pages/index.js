import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';

import { withAuth } from '@/utils/withAuth';
import Messages from "@/components/Message/Messages";
import MatchCard from '@/components/MatchCard';
import UserNav from '@/components/UserNav';
import Profile from "./profile";

function Home({ user }) {

    const [currentMatch, setCurrentMatch] = useState(null)
    const [profileOpen, setProfileOpen] = useState(false)

    const updateCurrentMatch = (match) => {
        setCurrentMatch(match);
        setToggle((tog) => !tog)
    };

    const [toggle, setToggle] = useState(false)

    const [activeBar, setActiveBar] = useState('home');

    const handleBarClick = (bar) => {
        setActiveBar(bar);
    };

    return (
        <div className="min-h-screen bg-white px-0 flex">
            <div className={`${(activeBar !== 'home' && activeBar !== 'notifications' && activeBar !== 'settings') || (!(activeBar !== 'match' && !currentMatch)) ? 'hidden sm:block basis-1/4' : 'sm:basis-1/4 basis-full  '}     h-screen bg-white`}>
                <UserNav setProfileOpen={setProfileOpen} user={user} setCurrentMatch={updateCurrentMatch} handleBarClick={handleBarClick} activeBar={activeBar} />
            </div>


            <div className={`${activeBar !== 'match' && !currentMatch ? 'hidden  basis-3/4' : 'sm:basis-3/4 basis-full  '}   sm:flex  mx-0 my-0`}>
                {!currentMatch && <MatchCard user={user} />}
                {currentMatch && (
                    <Messages
                        receiverId={currentMatch.id}
                        matchDate={currentMatch.matchDate}
                        updateCurrentMatch={updateCurrentMatch}
                        user={user}
                    />
                )}
            </div>

            <div className={`${activeBar !== 'settings' && !profileOpen ? 'hidden  basis-3/4' : 'sm:basis-3/4 basis-full  '}   sm:flex  mx-0 my-0`}>
                {/* <Profile/> */}
            </div>


            {!currentMatch && <div className="fixed bottom-0 left-0 right-0 bg-white sm:hidden h-[6vh] sm:h-0  shadow-md hover:shadow-lg transition-shadow">
                <nav className="flex justify-between px-4 py-2 border-t-2">
                    <a href="#" onClick={() => handleBarClick('home')} className={`flex flex-col items-center w-1/3 ${activeBar == 'home' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        <FontAwesomeIcon icon={faHome} className="text-xl" />
                        <span className="text-xs">Home</span>
                    </a>
                    <a href="#" onClick={() => handleBarClick('match')} className={`flex flex-col items-center w-1/3 ${activeBar == 'match' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        <FontAwesomeIcon icon={faHeart} className="text-xl" />
                        <span className="text-xs">Match</span>
                    </a>
                    <a href="#" onClick={() => handleBarClick('notifications')} className={`flex flex-col items-center w-1/3 ${activeBar == 'notifications' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        <FontAwesomeIcon icon={faBell} className="text-xl" />
                        <span className="text-xs">Notifications</span>
                    </a>
                    <a href="#" onClick={() => handleBarClick('settings')} className={`flex flex-col items-center w-1/3 ${activeBar == 'settings' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        <FontAwesomeIcon icon={faCog} className="text-xl" />
                        <span className="text-xs">Settings</span>
                    </a>
                </nav>

            </div>}
        </div>
    )
}

export default withAuth(Home);