import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { login } from '../actions/authActions';

import { Form, Button } from "react-bootstrap";
import AuthLayout from "@/components/Auth-Layout";
import { forgotPassword, signup } from "@/actions/authActions";
import FullscreenLoading from "@/components/FullscreenLoading";

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
      <h2 className="text-dark">Forgot Password</h2>
      <Form onSubmit={handleForgotPassword}>
        <Form.Group className="mb-3 text-left" controlId="formEmail">
          <Form.Label className="text-dark">Email:</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="d-flex justify-content-end small text-danger">
            {errors?.email}
          </span>
        </Form.Group>

        <Button
          className="btn-fill pull-right"
          type="submit"
          variant="info"
          disabled={isLoading}
        >
          Send
        </Button>
      </Form>
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
