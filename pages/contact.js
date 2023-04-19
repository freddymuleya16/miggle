import MainLayout from "@/components/MainLayout";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ContactPage = () => {
  return (
    <MainLayout>
      <Container className="my-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Contact Us</h1>
            <p>
              We are here to help you with any questions or concerns you may
              have. Please fill out the form below and we will get back to you
              as soon as possible.
            </p>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter your message"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default ContactPage;
