import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

import { FooterOverlay, Newsletter } from '../../components';
import { images } from '../../constants';
import './Footer.css';

const Footer = () => (
  <div className="app__footer section__padding" id="contact">
    
    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Contact Us</h1>
        <p className="p__opensans">University of Dhaka, Dhaka, Bangladesh</p>
        <p className="p__opensans">fabihahaider4@gmail.com</p>
        <p className="p__opensans">tasnuvatuba99@gmail.com</p>
      </div>

      <div className="app__footer-links_logo">
        <p className="p__opensans">&quot;The best way to find yourself is to lose yourself in the service of others.&quot;</p>
        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiTwitter />
          <FiInstagram />
        </div> 
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Working Hours</h1>
        <p className="p__opensans">Sunday-Thursday:</p>
        <p className="p__opensans">08:00 am - 05:00 pm</p>
        {/* <p className="p__opensans">Saturday-Sunday:</p>
        <p className="p__opensans">07:00 am - 11:00 pm</p> */}
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">2023 Driver Lagbe. All Rights reserved.</p>
    </div>

  </div>
);

export default Footer;

