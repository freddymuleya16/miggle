import React from 'react';
import { Navbar } from 'react-bootstrap';
import NavItems from './NavItems';

const Sidebar = ({ isOpen, onClose }) => {
  
  return (
    <Navbar expand="md" variant='dark' bg='transparent' color='white' className={`sidebar ${isOpen ? 'open' : ''}`} style={{background:'linear-gradient(90deg, black, transparent)'}}>
      {/* <Navbar.Toggle aria-controls="sidebar-nav" /> */}
      <Navbar.Collapse id="sidebar-nav" >
       <NavItems/>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;