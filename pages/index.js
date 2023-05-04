import React from 'react';

import { AboutUs, Review, FindUs, Footer, Gallery, Header, Intro, Laurels, Services } from './container';
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
    <Footer />
  </div>
);

export default App;
