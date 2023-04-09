import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, signup } from '@/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
//import { login } from '../actions/authActions';
import Head from 'next/head'
import Link from 'next/link'


import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import backgroundImage from '../../public/img/login-bg.jpg';

function Signup() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const handleSignup = (e) => {
    e.preventDefault();
    if(password ==confirmPassword){
      
    dispatch(signup(email, password));
    }else{
      error.message = "Password don't match"
    }
  }

 return (
  <div className="bg-image" style={{ backgroundImage: `url(${backgroundImage.src})` }} >

    <Container className="h-100">

        <Row className="justify-content-center align-items-center h-100">
            <Col xs={10} sm={8} md={6} lg={4}>
                <div className="login-box">
                    <h2 className='text-dark'>Sign up</h2>
                  
                    <Form  onSubmit={handleSignup}>
                        <Form.Group className="mb-3 text-left" controlId="formEmail">
                            <Form.Label className='text-dark'>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 text-left" controlId="formPassword">
                            <Form.Label className='text-dark'>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 text-left" controlId="formPassword">
                            <Form.Label className='text-dark'>Confirm Password:</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>

                        <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            disabled={isLoading}
                        >Sign up
                        </Button> 
                        <p className='card-text mt-2 text-dark'>Already have an account? <Link className='text-info' href='/auth/login'>Login</Link></p>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
</div>
 );

  // return (
  //   <div>
  //     <h1>Sign Up</h1>
  //     {error && <p>{error}</p>}
  //     <form onSubmit={handleSignup}>
  //       <label>
  //         Email
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={(event) => setEmail(event.target.value)}
  //         />
  //       </label>
  //       <label>
  //         Password
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(event) => setPassword(event.target.value)}
  //         />
  //       </label>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //   </div>
  // );
}

export default Signup;
