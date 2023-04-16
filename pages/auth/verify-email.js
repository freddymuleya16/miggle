import React, { useEffect } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '@/components/Auth-Layout';
import { toast } from 'react-toastify';
import { logout, sendVerificationEmail } from '@/actions/authActions';
import FullscreenLoading from '@/components/FullscreenLoading';
import { withAuth } from '@/utils/withAuth';
import { Col, Row } from 'react-bootstrap';

const VerifyEmail = () => {
  const auth = getAuth();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

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
         <div>
      <h1>Verify Your Email</h1>
      <p>A verification email has been sent to {user?.email}. Please follow the instructions in the email to verify your email address.</p>
      <Row>
        <Col>
        <button onClick={handleSignout} className='btn btn-info mr-2' >Cancel</button>
       <button onClick={handleSendEmailVerification} className='btn btn-info'>Resend Verification Email</button>
      
        </Col>
       
      </Row>
      </div>
    </AuthLayout>
   
  );
};

export default withAuth(VerifyEmail);
