import React from 'react';

import { AboutUs, Review, Gallery, Footer, Header, Intro, Services } from './container';
import { DriverNavbar } from './components';
import './driverHomePage.css';

const App = () => (
  <div>
    <DriverNavbar />
    <Header />
    <Intro />
    <AboutUs />
    <Services />
    <Gallery/>
    <Footer />
  </div>
);

export default App;
