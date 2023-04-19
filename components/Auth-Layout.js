import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import backgroundImage from "../public/img/login-bg.jpg";

function AuthLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div
      className="bg-image"
      style={
        isMobile
          ? { backgroundColor: "#fff" }
          : { backgroundImage: `url(${backgroundImage.src})` }
      }
    >
      <Container className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <div
            className={
              !isMobile ? "col-lg-4 col-md-6 col-sm-8 col-10" : "col-12"
            }
          >
            <div
              className="login-box content fade-in"
              style={isMobile ? { boxShadow: "none" } : null}
            >
              {children}
            </div>
          </div>
        </Row> 
      </Container>
    </div>
  );
}

export default AuthLayout;
