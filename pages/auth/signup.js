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
      {isLoading && <OverLayLoading/>}

      <h2 className="text-dark">Sign up</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3 text-left" controlId="formEmail">
          <Form.Label className="text-dark">Email:</Form.Label>
          <Form.Control
            type="email"
            error="fredd"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="d-flex justify-content-end small text-danger">
            {errors?.email}
          </span>
        </Form.Group>
        <Form.Group className="mb-3 text-left" controlId="formPassword">
          <Form.Label className="text-dark">Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="d-flex justify-content-end small text-danger">
            {errors?.password}
          </span>
        </Form.Group>
        <Form.Group className="mb-3 text-left" controlId="formCPassword">
          <Form.Label className="text-dark">Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="d-flex justify-content-end small text-danger">
            {errors?.confirmPassword}
          </span>
        </Form.Group>

        <Button
          className="btn-fill pull-right"
          type="submit"
          variant="info"
          disabled={isLoading}
        >
          Sign up
        </Button>
        <p className="card-text mt-2 text-dark">
          Already have an account?{" "}
          <Link className="text-info" href="/auth/login">
            Login
          </Link>
        </p>
      </Form>
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
