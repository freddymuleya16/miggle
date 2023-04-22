import MainLayout from "@/components/MainLayout";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Container>
        <Row className="my-4">
          <Col>
            <h1>About Us</h1>
            <p>
              We are Mingle, a dating site that connects people from all over
              the world. Our goal is to create a safe and enjoyable space where
              people can find their perfect match.
            </p>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={6}>
            <h2>Our Mission</h2>
            <p>
              Our mission is to create a dating site that is inclusive, fun, and
              easy to use. We want to help people find love, companionship, and
              meaningful connections.
            </p>
          </Col>
          <Col md={6}>
            <h2>Our Vision</h2>
            <p>
              Our vision is to become the most trusted and respected dating site
              in the world. We want to be known for our innovative features,
              exceptional customer service, and commitment to our users.
            </p>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h2>Our Team</h2>
            <p>
              We are a team of experienced developers, designers, and dating
              experts who are passionate about helping people find love. Our
              team is dedicated to providing the best possible experience for
              our users.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
