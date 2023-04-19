import Link from "next/link";

import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import NavItems from "./NavItems";

const Topbar = () => {
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
    <Navbar expand="md" bg="transparent" variant="dark" fixed="top" color='white' style={{background:'linear-gradient(180deg, black, transparent)'}}>
      <Container>
        <Navbar.Brand href="/">Mingle</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        <Navbar.Collapse  className="justify-content-end">
          {isMobile &&<NavItems/>}
          <Navbar.Text>
              <Link href="#login">Freddy Muleya</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
