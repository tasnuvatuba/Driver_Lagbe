import React from 'react';
import './OwnerNavbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import images from '../../constants/images';
import { Button, ButtonGroup, Center } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
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


const Navbar = ({username}) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__drivernavbar">
      {/* { <div className="app__drivernavbar-logo">
        <img src={images.gericht} alt="app__logo" />
      </div> }   */}
      <ul className="app__drivernavbar-links">
        <li className="p__opensans"><a href="#home">Home</a></li>
        <li className="p__opensans"><a href="#about">About</a></li>
        <li className="p__opensans"><a href="#services">Services</a></li>
        <li className="p__opensans"><a href="#contact">Contact</a></li>
      </ul>
      <div className="app__drivernavbar-features">
      <li>
          <Link href="/profile">
            <a>
            <img className = "profileimage" src="/user.png" alt = 'dp'/>
            </a>
          </Link>
        </li>
        {/* <li><a href="/profile"><image src = "/user.png"></image></a></li> */}

        <div />
    
        <Menu>
          <MenuButton as={Button}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>Book For Now</MenuItem>
            <MenuItem>Book For Later</MenuItem>
            <MenuItem>
              <Link href={{pathname: '../sentRequest', query:{username}}}>
                <a>Sent Requests</a>
              </Link>
            </MenuItem>
            <MenuItem>All Drivers</MenuItem>
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
              <li className="p__opensans"><a href="#home" onClick={() => setToggleMenu(false)}>Book For Now</a></li>
              <li className="p__opensans"><a href="#home" onClick={() => setToggleMenu(false)}>Book For Later</a></li>
              <li className="p__opensans"><a href="#about" onClick={() => setToggleMenu(false)}>Sent Requests</a></li>
              <li className="p__opensans"><a href="#services" onClick={() => setToggleMenu(false)}>All Drivers</a></li>
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
