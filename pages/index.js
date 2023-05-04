import React from 'react';

import { AboutUs, Review, FindUs, Footer, Gallery, Header, Intro, Laurels, Services } from './container';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, Services } from './container';
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
    <Chef />
    <Intro />
    <Laurels />
    <Gallery />
    <FindUs />
    <Footer />
  </div>
);

export default App;
