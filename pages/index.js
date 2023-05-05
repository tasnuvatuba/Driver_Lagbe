import React from 'react';

import { AboutUs, Review, Gallery, Footer, Header, Intro, Services } from './container';
import { Navbar } from './components';
import './index.css';

const App = () => (
  <div>
    <Navbar />
    <Header />
    <Intro />
    <AboutUs />
    <Services />
    <Gallery/>
    <Footer />
  </div>
);

export default App;
