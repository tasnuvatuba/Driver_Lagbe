import React, { useEffect, useState } from 'react';
import ProfileCard from '/pages/components/ProfileCard/ProfileCard.jsx';
import Services from "./Services";
import './AvailableDriver.css';
import { Radio, RadioGroup, Stack, Button, color} from '@chakra-ui/react';
import Link from 'next/link';
import Head from 'next/head';
import {FaMapMarkerAlt} from  'react-icons/fa';

import { useRouter } from 'next/router';
import { colors } from "./constants/colors";

export default function AvailableDriver() {
  const router = useRouter();
  const { username, srcPage, srcAddr, destAddr, tripType } = router.query;

  console.log(srcPage, srcAddr, destAddr, tripType);



  const [activeDrivers, setActiveDrivers] = useState([]);
  const [sortingOption, setSortingOption] = useState('rating'); // Default sorting option


  useEffect(() => {
    const fetchDrivers = async () => {
      const services = new Services();
      const drivers = await services.getActiveDrivers();
      setActiveDrivers(drivers);
    };

    fetchDrivers();

    document.title = 'Available Drivers | Your Website Title';
  }, []);

  // Handle sorting option change
  const handleSortingOptionChange = (value) => {
    setSortingOption(value);
  };

  // Sort the active drivers based on the selected sorting option
  const sortActiveDrivers = () => {
    const sortedDrivers = [...activeDrivers];
    if (sortingOption === 'rating-high-to-low') {
      sortedDrivers.sort((a, b) => b.rating - a.rating);
    } else if (sortingOption === 'rating-low-to-high') {
      sortedDrivers.sort((a, b) => a.rating - b.rating);
    } else if (sortingOption === 'fare-high-to-low') {
      sortedDrivers.sort((a, b) => b.fare - a.fare);
    } else if (sortingOption === 'fare-low-to-high') {
      sortedDrivers.sort((a, b) => a.fare - b.fare);
    }
    return sortedDrivers;
  };


  return (
    <div className='box'>
      <Head>
        <title>Available Drivers | Driver Lagbe</title>
      </Head>
      <div className='container mx-auto py-36 px-8 '>
      <header className="header">
          <h1>Available Drivers</h1>
        </header>
    
      <Link 
        href="/SearchByLocation"
        >
        <a>
        <Button
              size="md"
              mb={4}
              className="search-button"
              leftIcon={<FaMapMarkerAlt style={{ color: 'red' }} />}
            >
          Search by Location
        </Button>
        </a>
      </Link>


      <RadioGroup value={sortingOption} onChange={handleSortingOptionChange} mb={4}>
        <Stack direction="row" spacing={4}>
        <Radio value="rating-high-to-low">Sort By Rate: High to Low</Radio>
          <Radio value="rating-low-to-high">Sort By Rate: Low to High</Radio>
          <Radio value="fare-high-to-low">Sort By Fare: High to Low</Radio>
          <Radio value="fare-low-to-high">Sort By Fare: Low to High</Radio>
        </Stack>
      </RadioGroup>

        <div className='grid lg:grid-cols-3 gap-6'>
          {sortActiveDrivers().map(user => (
            <ProfileCard
              key={user.id}
              img={user.imgUrl}
              name={user.username}
              desc={user.des}
              rating={user.rating}
              fare={user.fare}
              status={user.status}
              srcPage={srcPage}
              srcAddr={srcAddr}
              destAddr={destAddr}
              tripType={tripType}
              username = {username} //owner username
            />
          ))}
        </div>
      </div>
    </div>
  );
}
