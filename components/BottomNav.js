import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaRegEnvelope, FaHeart, FaBell } from 'react-icons/fa';

function BottomNav(props) {
    const [activeTab, setActiveTab] = useState("#");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    props.handleTabClick(tabName);
  };
  return (
    <Navbar fixed="bottom" bg="transparent" variant='dark'>
      <Nav className="mx-auto align-items-center" >
        <Nav.Link href="#messages" className='text-white' onClick={() => handleTabClick("messages")}>
          <FaRegEnvelope size={activeTab=='#' ?24:48} />
        </Nav.Link>
        <Nav.Link href="#" className={activeTab=='#' ?'active':'text-white'} onClick={() => handleTabClick("#")}>
          <FaHeart size={activeTab=='#' ?48:24} />
        </Nav.Link>
        {/* <Nav.Link href="#notifications" className='text-white' onClick={() => handleTabClick("notification")}>
          <FaBell size={24} />
        </Nav.Link> */}
      </Nav>
    </Navbar>
  );
}

export default BottomNav;