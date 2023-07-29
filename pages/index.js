import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';

import { withAuth } from '@/utils/withAuth';
import Messages from "@/components/Message/Messages";
import MatchCard from '@/components/MatchCard';
import UserNav from '@/components/UserNav';
import Profile from "./profile";

function Home({ user }) {
  const [currentMatch, setCurrentMatch] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeBar, setActiveBar] = useState('home');

  const handleBarClick = (bar) => {
    setActiveBar(bar);
  };

  const handleMatchClick = (match) => {
    setCurrentMatch(match);
    setProfileOpen(false);
  };

  const handleProfileClick = () => {
    setProfileOpen((prev) => !prev);
    setCurrentMatch(null);
  };

  const renderContent = () => {
    if (profileOpen) {
      return <div className={`basis-full sm:basis-3/4 ${!profileOpen && 'sm:flex'}`}>
        <Profile edit={true} setProfileOpen={setProfileOpen} />
      </div>;
    }

    if (currentMatch) {
      return (
        <div className={`basis-full sm:basis-3/4 ${!profileOpen && 'sm:flex'}`}>
          <div className="basis-full sm:flex">
            <Messages
              receiverId={currentMatch.id}
              matchDate={currentMatch.matchDate}
              updateCurrentMatch={handleMatchClick}
              user={user}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`${activeBar != 'match' && 'hidden'} basis-full sm:basis-3/4 ${!profileOpen && 'sm:flex'}`}>
        <div className={`${activeBar != 'match' ? 'hidden sm:contents' : "basis-full flex "}`}>

          <MatchCard user={user} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white px-0 flex">
      <div className={`${activeBar != 'home' && activeBar != 'notifications' && activeBar != 'settings' || currentMatch || profileOpen ? 'hidden sm:block' : "sm:block"} basis-full sm:basis-1/4`}>
        <UserNav
          setProfileOpen={handleProfileClick}
          user={user}
          setCurrentMatch={handleMatchClick}
          handleBarClick={handleBarClick}
          activeBar={activeBar}
          profileOpen={profileOpen}
        />
      </div>

      {renderContent()}

      {!currentMatch && !profileOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white sm:hidden h-[6vh] sm:h-0  shadow-md hover:shadow-lg transition-shadow">
          <nav className="flex justify-between px-4 py-2 border-t-2">
            <a href="#" onClick={() => handleBarClick('home')} className={`flex flex-col items-center w-1/3 ${activeBar === 'home' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FontAwesomeIcon icon={faHome} className="text-xl" />
              <span className="text-xs">Home</span>
            </a>
            <a href="#" onClick={() => handleBarClick('match')} className={`flex flex-col items-center w-1/3 ${activeBar === 'match' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
              <span className="text-xs">Match</span>
            </a>
            <a href="#" onClick={() => handleBarClick('notifications')} className={`flex flex-col items-center w-1/3 ${activeBar === 'notifications' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              <span className="text-xs">Notifications</span>
            </a>
            <a href="#" onClick={() => handleBarClick('settings')} className={`flex flex-col items-center w-1/3 ${activeBar === 'settings' ? 'text-rose-500 hover:text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FontAwesomeIcon icon={faCog} className="text-xl" />
              <span className="text-xs">Settings</span>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default withAuth(Home);
