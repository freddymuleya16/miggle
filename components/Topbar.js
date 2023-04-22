import Link from "next/link";

import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logout } from "@/actions/authActions";

const Topbar = (props) => {
  const dispatch = useDispatch();
  
  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Navbar
    bg="transparent"
    variant="dark"
    fixed="top"
    color="white"
    style={{ background: "linear-gradient(180deg, black, transparent)" }}
  >
    <Container>
      <Navbar.Brand href="/">Mingle</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown
            title={
              <>
                {props.user.firstName} {props.user.lastName}{" "}
                <Image
                  src={props.user.pictures[0]}
                  width={25}
                  height={25}
                  alt=""
                  className="rounded-circle"
                />
              </>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#" onClick={handleSignout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Topbar;
