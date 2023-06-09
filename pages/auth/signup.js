import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { login, signup } from "@/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
//import { login } from '../actions/authActions';
import Head from "next/head";
import Link from "next/link";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import backgroundImage from "../../public/img/login-bg.jpg";
import AuthLayout from "@/components/Auth-Layout";
import { toast } from "react-toastify";
import { withoutAuth } from "@/utils/withAuth";
import OverLayLoading from "@/components/OverLayLoading";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {    
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(email, password, confirmPassword);
    setErrors(validationErrors);
    setSubmitted(true); // set submitted to true after form validation
  };
  
  useEffect(() => {
    if (submitted && errors === null) {
      dispatch(signup(email, password));
    } else {
      //console.log(errors);
    }
  }, [submitted, errors]);
  
  return (
    <AuthLayout>
    {isLoading && <OverLayLoading />}
    <h2 className="text-3xl mb-3 font-bold text-rose-500 bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent text-center uppercase">
      Sign up</h2>
    <form onSubmit={handleSignup}>
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
        <span className="d-flex justify-end small text-danger">
          {errors?.email}
        </span>
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="formPassword" className="text-dark">Password:</label>
        <input
          type="password"
          id="formPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <span className="d-flex justify-end small text-danger">
          {errors?.password}
        </span>
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="formCPassword" className="text-dark">Confirm Password:</label>
        <input
          type="password"
          id="formCPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
        />
        <span className="d-flex justify-end small text-danger">
          {errors?.confirmPassword}
        </span>
      </div>
  
      <button
        className="btn-fill bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md mb-4 mx-auto block"
        type="submit"
        disabled={isLoading}
      >
        Sign up
      </button>
  
      <p className="card-text mt-2 text-dark text-center">
        Already have an account?{" "}
        <Link href="/auth/login">
          <span className="text-info">Login</span>
        </Link>
      </p>
    </form>
  </AuthLayout>
  
  );
}

function validateForm(email, password, confirmPassword) {
  const errors = {};

  // Check for email
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  // Check for password
  if (!password) {
    errors.password = "Password is required";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
    errors.password =
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long";
  }

  // Check for confirm password
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length === 0) {
    return null;
  }

  return errors;
}

export default withoutAuth(Signup);
