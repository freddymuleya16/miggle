import { login } from "@/actions/authActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { login } from '../actions/authActions';
import Link from "next/link";

import { Form, Button } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { withoutAuth } from "../../utils/withAuth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import AuthLayout from "@/components/Auth-Layout";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleFacebookSignin = () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

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
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <AuthLayout>
      <h2 className="text-dark">Log in</h2>
      <Button className="btns-facebook" onClick={handleFacebookSignin}>
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
          <Form.Label className="text-dark">Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 text-left" controlId="formPassword">
          <Form.Label className="text-dark">Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            className="text-info d-flex justify-content-end small "
            href="/auth/forgot-password"
          >
            Forgot password
          </Link>
        </Form.Group>

        <Button
          className="btn-fill pull-right"
          type="submit"
          variant="info"
          disabled={isLoading}
        >
          Log in
        </Button>
        <p className="card-text mt-2 text-dark">
          Don&apos;t have an account?{" "}
          <Link className="text-info" href="/auth/signup">
            Sign Up
          </Link>
        </p>
      </Form>
    </AuthLayout>
  );
};
export default withoutAuth(Login);
