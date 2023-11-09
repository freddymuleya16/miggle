import { setIsPremiumModelOpen } from '@/reducers/modelSlice';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PremiumModal = ({ isOpen, }) => {
  const isPremiumModelOpen = useSelector((state) => state.model.isPremiumModelOpen);
  const router = useRouter()
  const dispatch = useDispatch()
  const onUpgrade = () => {
    router.push('/subscribe')
  }
  function onClose() {
    dispatch(setIsPremiumModelOpen(false))
  }
  if (isPremiumModelOpen) return (
    <div
      className={`fixed inset-0 flex items-center justify-center  z-50 ${isPremiumModelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-30"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Upgrade to Premium</p>
            <button
              className="modal-close p-2 -mt-2 -mr-2 hover:text-black"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <p className="text-gray-700">
            Unlock exclusive features and enhance your experience with Premium membership:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Enjoy unlimited likes and matches.</li>
            <li>Upload a minimum of 10 pictures.</li>
            <li>Send videos in direct messages.</li>
            <li>Create 30-second video bio posts.</li>
            <li>Record voice notes with a maximum duration of 2 minutes.</li>
            <li>Access an exclusive premium sticker.</li>
            <li>Get unlimited daily matches.</li> 
            <li>Receive priority customer support.</li>
          </ul>
          <div className="mt-4">
            <button
              className="modal-close px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
              onClick={onUpgrade}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return <></>
};

export default PremiumModal;
