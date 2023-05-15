import React from 'react';
import { useRouter } from 'next/router';


import { AboutUs, Review, Gallery, Footer, Header, Intro, Services } from './container';
import { DriverNavbar } from './components';
import './driverHomePage.css';

const App = () => {
  const router = useRouter();
  const { username} = router.query;
  console.log(username);

  return (<div>
    <DriverNavbar username = {username}/>
    <Header />
    <AboutUs />
    <Services />
    <Gallery/>
    <Footer />
  </div>
  );

}

export default App;
