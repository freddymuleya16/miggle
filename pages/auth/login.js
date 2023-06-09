import { facebookSignIn, googleSignIn, login } from "@/actions/authActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { login } from '../actions/authActions';
import Link from "next/link";

import { Form, Button } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { withoutAuth } from "../../utils/withAuth";
import AuthLayout from "@/components/Auth-Layout";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverLayLoading from "@/components/OverLayLoading";

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
    dispatch(facebookSignIn())
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignIn())
  };

  return (
    <AuthLayout>
      {isLoading && <OverLayLoading/>}
      <h2 className="text-3xl mb-3 font-bold text-rose-500 bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent text-center uppercase">
        Log in
      </h2>


      <form onSubmit={handleSubmit}>
        <div className="flex-col justify-center">
          <div className="mb-3 text-left">
            <label htmlFor="formEmail" className="text-dark">Email:</label>
            <input
              type="email"
              id="formEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3 text-left  w-full">
            <label htmlFor="formPassword" className="text-dark">Password:</label>
            <input
              type="password"
              id="formPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <Link href="/auth/forgot-password">
              <span className="text-info d-flex justify-end text-sm">Forgot password</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="btn-fill bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md mb-4"
            type="submit"
            disabled={isLoading}
          >
            Log in
          </button>
        </div>

        <p className="card-text mt-2 text-dark text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup">
            <span className="text-info">Sign Up</span>
          </Link>
        </p>
      </form>

      <hr className="w-full border-gray-300 my-4" />

      <div className="flex justify-center ">
        <Link onClick={handleFacebookSignin} href="#" className="h-fit w-fit fill-current text-blue-500  mr-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" height="6em" viewBox="0 0 512 512"> <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg>
        </Link>
          <Link onClick={handleGoogleSignIn} href="#" className="h-fit w-fit fill-current text-red-500 ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="6em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
        </Link>  
      </div>

    </AuthLayout> 
  );
};
export default withoutAuth(Login);
