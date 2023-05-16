import React, { useEffect } from 'react';

import { AboutUs, Review, Gallery, Footer, Header, Intro, Services } from './container';
import { Navbar } from './components';
import './index.css';
import { useRouter } from 'next/router';

function App(){
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if(role === 'driver')
    {
      router.push('/driverHomePage');
    }
    else if(role === 'owner')
    {
      router.push('/ownerHomePage');
    }
  }, []);

  return(
    <div>
      <Navbar />
      <Header />
      <Intro />
      <AboutUs />
      <Services />
      <Gallery/>
      <Footer />
    </div>
  )
}

export default App;
