import React, { useEffect, useState } from "react";
import backgroundImage from "../public/img/couple-2.jpg";
import MingleNavbar from "./Topbar";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import Topbar from "./Topbar";
import Head from "next/head";

function MainLayout(props) {
  const [activeTab, setActiveTab] = useState("#");
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
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Head>
        <title>Mingle - Find Your Match</title>
        <meta
          name="description"
          content="Mingle - the best dating app to find your perfect match"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="bg-image"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <Topbar user={props.user} />
        <Container fluid className="h-100">
          <Row className="align-content-around h-100">
            <Col xs={12} className="p-3">
              {props.children}
            </Col>
          </Row>
        </Container>
        {props?.handleTabClick && (
          <BottomNav handleTabClick={props.handleTabClick} />
        )}
      </div>
    </>
  );
}

export default MainLayout;
