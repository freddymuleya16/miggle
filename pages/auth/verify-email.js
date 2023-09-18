import React, { useEffect, useState } from 'react';
import { getAuth, sendEmailVerification, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '@/components/Auth-Layout';
import { toast } from 'react-toastify';
import { logout, sendVerificationEmail } from '@/actions/authActions';
import FullscreenLoading from '@/components/FullscreenLoading';
import { withAuth } from '@/utils/withAuth';
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';

const MAX_TRIES = 10;
const VERIFY_INTERVAL = 10000;

const VerifyEmail = () => {
  const auth = getAuth();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const router = useRouter()
  const [tries, setTries] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const user = getAuth().currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(intervalId);
          router.push('/')
        } else {
          setTries((prevTries) => prevTries + 1);
          if (tries >= MAX_TRIES) {
            dispatch(signOut())
          }
        }
      }
    }, VERIFY_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dispatch, router, tries]);


  useEffect(() => {    
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleSendEmailVerification = () => {
    dispatch(sendVerificationEmail())
  };
  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  if(isLoading){
    return <FullscreenLoading/>
  }

  return (
    <AuthLayout>
  <div className="text-center">
  <h2 className="text-3xl mb-3 font-bold text-rose-500 bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent text-center uppercase">
      Verify Your Email</h2>
    <p>A verification email has been sent to {user?.email}. Please follow the instructions in the email to verify your email address.</p>
    <div className="flex justify-center mt-4">
      <button onClick={handleSignout}  className="focus:outline-none btn-fill bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md mb-4 mx-auto block"
        >
        Cancel
      </button>
      <button onClick={handleSendEmailVerification} className="focus:outline-none btn-fill bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md mb-4 mx-auto block"
        >
        Resend 
      </button>
    </div>
  </div>
</AuthLayout>

   
  );
};

export default withAuth(VerifyEmail);
