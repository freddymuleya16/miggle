import { logout } from '@/actions/authActions';
import Link from 'next/link';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaCog, FaEnvelope, FaInfo, FaLifeRing, FaLock, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const NavItems = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleClose = () => {
    if (isOpen) {
      onClose();
    }
  };


  return (
    <Nav className="flex-column">
        <Nav className="flex-column">
                    <Link href="/settings" className="align-items-center d-flex nav-link text-white" onClick={handleClose}>
            <FaCog className="icon" />
            <span className="ml-2 text text-white">Settings</span>
          </Link>
          <Link href="/contact" className="align-items-center d-flex nav-link text-white" onClick={handleClose}>
            <FaEnvelope className="icon" />
            <span className="ml-2 text text-white ">Contact</span>
          </Link>
          <Link href="/about" className="align-items-center d-flex nav-link text-white" onClick={handleClose}>
            <FaInfo className="icon" />
            <span className="ml-2 text text-white">About</span>
          </Link>
          <Link href="/privacy" className="align-items-center d-flex nav-link text-white" onClick={handleClose}>
            <FaLock className="icon" />
            <span className="ml-2 text text-white">Privacy</span>
          </Link>
          <Link href="/terms" className="align-items-center d-flex nav-link text-white" onClick={handleClose}>
            <FaLock className="icon" />
            <span className="ml-2 text text-white">Terms</span>
          </Link>
          <Link href='#' className="align-items-center d-flex nav-link text-white"  onClick={handleSignout}>
            <FaSignOutAlt className="icon" />
            <span className="ml-2 text text-white">Logout</span>
          </Link>
        </Nav>
      </Nav>
  );
};

export default NavItems;