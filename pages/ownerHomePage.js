import React from 'react';

import { AboutUs, Review, Gallery, Footer, Header, Intro, Services } from './container';
import { OwnerNavbar } from './components';
import './ownerHomePage.css';

const App = () => (
  <div>
    <OwnerNavbar />
    <Header />
    <Intro />
    <AboutUs />
    <Services />
    <Gallery/>
    <Footer />
  </div>
);

export default App;
