import { login } from '@/actions/authActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { login } from '../actions/authActions';
import Head from 'next/head'
import Link from 'next/link'

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import backgroundImage from '../../public/img/login-bg.jpg';
import { withoutAuth } from '../../utils/withAuth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";





const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const error = useSelector(state => state.auth.error);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const handleGoogleSignIn = () => {

        const provider = new GoogleAuthProvider();

        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }


    // return(
    //   <>
    //     <Head>
    //       <title>Login</title>
    //       {/* //<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" /> */}
    //     </Head>
    //     <div className="container mt-5">
    //       <div className="row justify-content-center">
    //         <div className="col-md-6">
    //           <div className="card">
    //             <div className="card-header bg-primary text-white">Login</div>
    //             <div className="card-body">
    //               <Form onSubmit={handleSubmit}>
    //                 <Form.Group controlId="formBasicEmail">
    //                   <Form.Label>Email address</Form.Label>
    //                   <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    //                   <Form.Text className="text-muted">
    //                     We'll never share your email with anyone else.
    //                   </Form.Text>
    //                 </Form.Group>
    //                 <Form.Group controlId="formBasicPassword">
    //                   <Form.Label>Password</Form.Label>
    //                   <Form.Control type="password" placeholder="Password"value={password} onChange={(e) => setPassword(e.target.value)}  />
    //                 </Form.Group>
    //                 <Button className='mt-3' variant="primary" type="submit" block disabled={isLoading}>
    //                   Submit
    //                 </Button>
    //               </Form>
    //               {error && <p>{error.message}</p>}
    //               <hr />
    //               <Link href="/forgot-password" passHref legacyBehavior>
    //                 <a>Forgot password?</a>
    //               </Link>
    //               <br />
    //               <Link href="/auth/signup">
    //                 Don't have an account? Sign up here.
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // );
    return (
        <div className="bg-image" style={
            isMobile
                ? { backgroundColor: '#fff' }
                : { backgroundImage: `url(${backgroundImage.src})` }
        }>
            <Container className="h-100">


                <Row className="justify-content-center align-items-center h-100">
                    <div className={!isMobile ? "col-lg-4 col-md-6 col-sm-8 col-10" : ""}>
                        <div className="login-box content fade-in" style={isMobile?{boxShadow: 'none'}:null}>
                            <h2 className='text-dark'>Log in</h2>
                            <Button className="btns-facebook" >
                                <FaFacebook className="align-top me-2 mr-1 mt-1" />
                                Sign in with Facebook
                            </Button>
                            <Button className="btn-google" onClick={handleGoogleSignIn}>
                                <FaGoogle className="me-2 align-top me-2 mr-1 mt-1" />
                                Sign in with Google
                            </Button>
                            <hr />
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3 text-left" controlId="formEmail">
                                    <Form.Label className='text-dark'>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3 text-left" controlId="formPassword">
                                    <Form.Label className='text-dark'>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button
                                    className="btn-fill pull-right"
                                    type="submit"
                                    variant="info"
                                    disabled={isLoading}
                                >Log in
                                </Button>
                                <p className='card-text mt-2 text-dark'>Don&apos;t have an account? <Link className='text-info' href='/auth/signup'>Sign Up</Link></p>
                            </Form>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );

}
export default withoutAuth(Login);
