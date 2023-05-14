import React, {useEffect, useState} from 'react';
import data from '/pages/constants/data.js'
import ProfileCard from '/pages/components/ProfileCard/ProfileCard.jsx'
import { useRouter } from 'next/router';
import Services from "./Services";
import './AvailableDriver.css'

export default function Home() {

  const [activeDrivers, setActiveDrivers] = useState([]);

  useEffect(() => {

    const fetchDrivers = async () => {
      const services = new Services()
      const drivers = await services.getActiveDrivers();
      // console.log(drivers)
      setActiveDrivers(drivers);
    };

    fetchDrivers();
  }, []);

  return (
    <div className='box'>

      <div className='container mx-auto py-36 px-8 '>
            <div className='grid lg:grid-cols-3 gap-6'>
             
            {activeDrivers.map(user => (
              // console.log(user)
              <ProfileCard img = {user.imgUrl} name = {user.username} desc = {user.des} rating = {user.rating} fare = {user.fare} status = {user.status}/>

            ))}
            </div>
            
          </div>

    </div>
    
    
  )
}

