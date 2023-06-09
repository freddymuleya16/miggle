import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { login } from '../actions/authActions';

import { Form, Button } from "react-bootstrap";
import AuthLayout from "@/components/Auth-Layout";
import { forgotPassword, signup } from "@/actions/authActions";
import FullscreenLoading from "@/components/FullscreenLoading";
import Link from "next/link";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(email);

    setErrors(validationErrors);
  };

  useEffect(() => {
    if (errors === null) {
      dispatch(forgotPassword(email));
    } else {
      //console.log(errors);
    }
  }, [errors]);

  if (isLoading) {
    return <FullscreenLoading />;
  }

  return (
    <AuthLayout>
    <h2 className="text-3xl mb-3 font-bold text-rose-500 bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent text-center uppercase">
      Forgot Password</h2>
    <form onSubmit={handleForgotPassword}>
      <div className="mb-3 text-left">
        <label htmlFor="formEmail" className="text-dark">Email:</label>
        <input
          type="email"
          id="formEmail"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <span className="d-flex justify-end small text-danger">
          {errors?.email}
        </span>
      </div>
  
      <button
        className="btn-fill bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md mb-4 mx-auto block"
        type="submit"
        disabled={isLoading}
      >
        Send
      </button>
    </form>
    <p className="card-text mt-2 text-dark text-center">
       Back to{" "}
        <Link href="/auth/login">
          <span className="text-info">Login</span>
        </Link>
      </p>
  </AuthLayout>
  
  );
}

function validateForm(email) {
  const errors = {};

  // Check for email
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (Object.keys(errors).length === 0) {
    return null;
  }
  return errors;
}

export default ForgotPassword;
