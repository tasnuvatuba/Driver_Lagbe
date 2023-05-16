import React from 'react';
import './DriverNavbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import { navigate } from 'react-router-dom';

import { Button, ButtonGroup, Center } from '@chakra-ui/react'

import Link from "next/link";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';


const Navbar = () => {
  const router = useRouter();

  const openSmallWindow = () => {
    const smallWindow = window.open('', '_blank', 'width=900,height=700');

    if (smallWindow) {
      smallWindow.location.href = '/StatusUpdate';
      smallWindow.resizeTo(900, 700);
    }
  };


  const [toggleMenu, setToggleMenu] = React.useState(false);

  const handleLogout = () => {
    // Perform logout actions here
    console.log('Logout function called');
    localStorage.removeItem('username');
    localStorage.removeItem('status');
    localStorage.setItem('role', 'guest');
    router.push('/');
    // Add your logout logic, such as clearing local storage, redirecting, etc.
  };

  const openEditProfile = () => {
    // Perform logout actions here
    router.push('/registerAsDriver?purpose=editProfile');
    // Add your logout logic, such as clearing local storage, redirecting, etc.
  };


  return (
    <nav className="app__drivernavbar">
      {/* <div className="app__drivernavbar-logo">
        <img src={images.gericht} alt="app__logo" />
      </div> */}
      <ul className="app__drivernavbar-links">
        <li className="p__opensans"><a href="#home">Home</a></li>
        <li className="p__opensans"><a href="#about">About</a></li>
        <li className="p__opensans"><a href="#services">Services</a></li>
        <li className="p__opensans"><a href="#contact">Contact</a></li>
      </ul>
      <div className="app__drivernavbar-features">
      <li>
          <Link href={{
              pathname: '/registerAsDriver',
              query: { purpose: 'editProfile' },
            }}>
            <a>
            <img className = "profileimage" src="/user.png" alt = 'dp'/>
            </a>
          </Link>
        </li>
        {/* <li><a href="/profile"><image src = "/user.png"></image></a></li> */}

        <div />

        <Menu>
          <MenuButton as={Button}>
            What you can do
          </MenuButton>
          <MenuList>
            <MenuItem onClick={openSmallWindow}>Status Update</MenuItem>
            <MenuItem>Received Requests</MenuItem>
            <MenuItem onClick={openEditProfile}> Edit Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            
          </MenuList>
        </Menu>
      </div>
      <div className="app__drivernavbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__drivernavbar-smallscreen_overlay flex__center slide-bottom">
            <AiFillCar fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__drivernavbar-smallscreen_links">
              <li className="p__opensans"><a href="/StatusUpdate" onClick={() => setToggleMenu(false)}>Status Update</a></li>
              <li className="p__opensans"><a href="#about" onClick={() => setToggleMenu(false)}>Received Requests</a></li>
              <li className="p__opensans"><a href="/registerAsDriver?purpose=editProfile" onClick={() => setToggleMenu(false)}>Edit Profile</a></li>
              <li className="p__opensans"><a href="#" onClick={() => { setToggleMenu(false); handleLogout(); }}>Log Out</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
