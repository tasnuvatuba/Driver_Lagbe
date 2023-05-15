import React from 'react';
import { useRouter } from 'next/router';

import { AboutUs, Review, Gallery, Footer, Header, Intro, Services } from './container';
import { OwnerNavbar } from './components';
import './ownerHomePage.css';



const App = () => {
  const router = useRouter();
  const { username} = router.query;
  console.log(username);

  return (<div>
    <OwnerNavbar username = {username}/>
    <Header />
    <Intro username = {username} />
    <AboutUs />
    <Services />
    <Gallery/>
    <Footer />
  </div>
);


}

  

export default App;
