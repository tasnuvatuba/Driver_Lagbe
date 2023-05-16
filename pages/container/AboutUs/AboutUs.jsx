import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus flex__center section__padding" id="about">
    <div className="app__aboutus-overlay flex__center">
    </div>

    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <h1 className="headtext__cormorant">AboutUs</h1>
        <img src= "/car.png" alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">Welcome to Driver Lagbe, the ultimate platform that bridges the gap between car owners and part-time drivers! Whether you're a car owner in need of a reliable chauffeur or a driver looking for flexible employment opportunities, our app provides a seamless and efficient solution to meet your needs.</p>
        <p className = "p__opensans">Our app empowers car owners to easily hire skilled and trustworthy part-time drivers, ensuring that your transportation needs are met with utmost professionalism and convenience.</p>
      </div>

      <div className="app__aboutus-content_knife flex__center">
        <img src="/carkey.png" alt="about_knife" />
      </div>

      <div className="app__aboutus-content_history">
        <h1 className="headtext__cormorant">About Us</h1>
        <img src= "/car.png" alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">For drivers seeking part-time jobs, Driver Lagbe opens up a world of exciting possibilities. By registering on our platform, you gain access to a wide range of driving opportunities, allowing you to earn money on your own terms.</p>
        <p className="p__opensans">We understand that trust and safety are paramount when it comes to sharing your vehicle or getting behind the wheel of someone else's car. That's why we have implemented a rigorous verification process for both car owners and drivers, ensuring that only qualified individuals can access our platform. Additionally, our rating and review system allows for transparency and accountability, creating a community built on reliability and professionalism.</p>

      </div>
    </div>
  </div>
);

export default AboutUs;

