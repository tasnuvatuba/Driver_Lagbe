import React from 'react';

import { AboutUs, Review, FindUs, Footer, Header, Intro, Services } from './container';
import { Navbar } from './components';
import './index.css';

const App = () => (
  <div>
    <Navbar />
    <Header />
    <Intro />
    <AboutUs />
    <Services />
    <Review />
    <AboutUs />
    <Services />
    <Footer />
  </div>
);

export default App;
