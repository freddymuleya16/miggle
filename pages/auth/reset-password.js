import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { login, resetPassword, signup } from "@/actions/authActions";
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

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { oobCode } = useParams();

  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validateForm( password, confirmPassword);
    setErrors(validationErrors);
  };

  useEffect(() => {
    if (errors === null) {
      dispatch(resetPassword(email, oobCode));
    } else {
      console.log(errors);
    }
  }, [errors]);

  return (
    <AuthLayout>
      <h2 className="text-dark">Reset Password</h2>
      <Form onSubmit={handleSignup}>
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
        <Form.Group className="mb-3 text-left" controlId="formPassword">
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
          Reset
        </Button>
              </Form>
    </AuthLayout>
  );
}

function validateForm(password, confirmPassword) {
  const errors = {};

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

  return errors;
}



export default ResetPassword;
