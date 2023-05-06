import React from 'react';

import './Navbar.css';

import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import images from '../../constants/images';


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar">
      {/* <div className="app__navbar-logo">
        <img src={images.gericht} alt="app__logo" />
      </div> */}
      <ul className="app__navbar-links">
        <li className="p__opensans"><a href="#home">Home</a></li>
        <li className="p__opensans"><a href="#about">About</a></li>
        <li className="p__opensans"><a href="#services">Services</a></li>
        <li className="p__opensans"><a href="#joinAsDriver">Join as Driver</a></li>
        <li className="p__opensans"><a href="#contact">Contact</a></li>
      </ul>
      <div className="app__navbar-login">
        <a href="login" className="p__opensans">Log In / Registration</a>
        <div />
        <a href="/" className="p__opensans">Hire Driver</a>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <AiFillCar fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li className="p__opensans"><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li className="p__opensans"><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li className="p__opensans"><a href="#services" onClick={() => setToggleMenu(false)}>Services</a></li>
              <li className="p__opensans"><a href="#joinAsDriver" onClick={() => setToggleMenu(false)}>Join as Driver</a></li>
              <li className="p__opensans"><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
