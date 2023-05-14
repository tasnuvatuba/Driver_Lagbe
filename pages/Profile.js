// pages/Profile.js

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import './Profile.css';
import { useRouter } from 'next/router';
import Services from './Services';

export default function Profile() {
  const router = useRouter()
  const { username } = router.query

  const [driverProfile, setDriverProfile] = useState([]);

  useEffect(() => {

    const fetchDriverProfile = async () => {
      const services = new Services()
      const driverProfile = await services.getDriverProfile(username);
      console.log( "profile ")
      // console.log( driverProfile)
      setDriverProfile(driverProfile);
    };

    fetchDriverProfile();
  }, []);


  return (
    <div className="container">
      <Head>
        <title>User Profile</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      
      <h1 className="title">User Profile</h1>

      <div className="profile">
        <img className="image" src="/1.jpg" alt="User Profile" />
        <div className="info">
        <h2 className="name">{driverProfile.username}</h2>
          <p className="address">Address: {driverProfile.address}</p>
          <p className="phone">Phone Number: {driverProfile.phone}</p>
          <p className="description">Description: {driverProfile.des}</p>
          <p className="rating">Rating: {driverProfile.rating}</p>
          <p className="fare">Fare: ${driverProfile.fare}/hour</p>
        </div>

        <button className="button">Contact</button>
      </div>
    </div>
  );
}
