import React from 'react';
import './DriverNavbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';

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


const Navbar = () => {

  const openSmallWindow = () => {
    const smallWindow = window.open('', '_blank', 'width=900,height=700');

    if (smallWindow) {
      smallWindow.location.href = '/StatusUpdate';
      smallWindow.resizeTo(900, 700);
    }
  };
  const [toggleMenu, setToggleMenu] = React.useState(false);
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
          <Link href="">
            <a>
            {/* <img className = "profileimage" src="/user.png" alt = 'dp'/> */}
            </a>
          </Link>
        </li>
        {/* <li><a href="/profile"><image src = "/user.png"></image></a></li> */}

        <div />

        <Menu>
        <MenuButton>Open menu</MenuButton>
        <MenuList>
          <MenuItem as='a' href='#'>Link 1</MenuItem>
          <MenuItem as='a' href='#'>Link 2</MenuItem>
        </MenuList>
      </Menu>
    
        <Menu>
          <MenuButton as={Button}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem onClick={openSmallWindow}>Status Update</MenuItem>
            <MenuItem>Received Requests</MenuItem>
            <MenuItem as="a" href="/AvailableDriver">All Drivers</MenuItem>
            <MenuItem>Edit Profile</MenuItem>
            <MenuDivider />
            <MenuItem>Log Out</MenuItem>
            
          </MenuList>
        </Menu>
      </div>
      <div className="app__drivernavbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__drivernavbar-smallscreen_overlay flex__center slide-bottom">
            <AiFillCar fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__drivernavbar-smallscreen_links">
              <li className="p__opensans"><a href="#home" onClick={() => setToggleMenu(false)}>Status Update</a></li>
              <li className="p__opensans"><a href="#about" onClick={() => setToggleMenu(false)}>Received Requests</a></li>
              <li className="p__opensans"><a href="/AvailableDriver" onClick={() => setToggleMenu(false)}>All Drivers</a></li>
              <li className="p__opensans"><a href="#contact" onClick={() => setToggleMenu(false)}>Edit Profile</a></li>
              <li className="p__opensans"><a href="#contact" onClick={() => setToggleMenu(false)}>Log Out</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
