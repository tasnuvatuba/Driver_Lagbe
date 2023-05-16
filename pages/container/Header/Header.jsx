import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';
import Link from 'next/link';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Hit The Road" />
      <h1 className="app__header-h1">Driver Lagbe? </h1>
      <SubHeading title="Hire or Be A Part Time Driver" />
      {/* <p className="p__opensans" style={{ margin: '2rem 0' }}>Hire or Be A Part Time Driver</p> */}
        <Link 
        href={{
          pathname: '/AllDrivers',
          query: { sourcePage: 'Header' },
        }}
        >
        <a>
        <button type="button" className="custom__button">All Drivers</button>
        </a>
      </Link>
      
      
    </div>

    <div className="app__wrapper_img">
    {/*form here*/}
      {/*<img src= "/steering.png" alt="header_img" />*/}
    </div>
  </div>
);

export default Header;
