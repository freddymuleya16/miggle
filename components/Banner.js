import { isSubscribed } from '@/utils/helpers';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const Banner = ({ user }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Automatically show the banner after 5 minutes if it was dismissed
    if (isDismissed) {
      const showBannerTimer = setTimeout(() => {
        setIsDismissed(false);
      }, 5 * 60 * 1000); // 5 minutes in milliseconds

      return () => clearTimeout(showBannerTimer);
    }
  }, [isDismissed]); // This effect runs whenever isDismissed changes

  const dismissBanner = () => {
    setIsDismissed(true);

  };

  const handleSubscribe = () => {
    router.push('/subscribe')
  }
  if (isSubscribed(user)) {
    return <></>
  }
  return (
    !isDismissed && (
      <div className={`${isDismissed ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        } transition-opacity  bg-rose-500 text-white p-2 absolute w-1/2 sm:w-1/4 shadow-lg  shadow-black  right-2 bottom-20 sm:bottom-2 z-20 rounded-md font-poppins duration-500 ease-in-out`}
      ><div className="container mx-auto">
          <div className="flex flex-col items-center justify-between">
            <p className="text-md font-semibold  text-center ">Upgrade to Premium for Exclusive Features!</p>
            <button
              className="bg-white text-rose-500 px-3 py-1 mx-2  mt-2 rounded hover:bg-blue-200"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
            <button
              className="text-white  absolute right-2 top-0 focus:outline-none"
              onClick={dismissBanner}
            >
              x
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Banner;
