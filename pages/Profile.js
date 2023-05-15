import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import './Profile.css';
import { useRouter } from 'next/router';
import Services from './Services';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt as fasStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Avatar, Box, Center, Heading, Text, Divider, Button, useToast, Flex, VStack} from '@chakra-ui/react';
//import { useState, useEffect } from 'react';
import { StarIcon } from "@chakra-ui/icons";
// import { FaStar } from "react-icons/fa";
// import axios from "axios";





export default function Profile() {
  const router = useRouter()
  const { driverUsername, srcPage, srcAddr, destAddr, tripType, ownerUsername} = router.query
  const source = srcAddr;
  const destination = destAddr;
  const typeOfTrip = tripType;

  console.log(driverUsername, srcPage, srcAddr, destAddr, tripType, ownerUsername);


  const [driverProfile, setDriverProfile] = useState([])

  useEffect(() => {
    const fetchDriverProfile = async () => {
      const services = new Services();
      const profileData = await services.getDriverProfile(driverUsername);
      setDriverProfile(profileData[0]);
    };

    if (driverUsername) {
      fetchDriverProfile();
    }
  }, [driverUsername]); // Run the effect whenever username changes

  if (!driverProfile) {
    // Render a loading state or fallback UI when driverProfile is null
    return <div>Loading...</div>;
  }
 

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    console.log("rating " + rating)

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={fasStar} />);
    }

    // Add half star if applicable
    if (halfStar) {
    stars.push(<FontAwesomeIcon key="half" icon={fasStarHalfAlt} />);
  }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={farStar} />);
    }

    
    return stars;
  };

  const starIcons = renderStars(driverProfile.rating);

    // let ratingSystemFixed = (
    //   <Flex alignItems="center" mb={4}>
    //     {[1, 2, 3, 4, 5].map((value) => (
    //       <Button
    //         key={value}
    //         color={value <= Math.round(driverProfile.rating) ? "yellow.400" : "gray.200"}
    //         variant="unstyled"
    //       >
    //         <StarIcon />
    //       </Button>
    //     ))}
    //   </Flex>
    // );





  return (
    <Box padding="4" borderWidth="0px" borderRadius="lg">
      <Box textAlign="center" marginTop="4" borderWidth="5px" borderRadius="lg">
        <Center>
            <Avatar size="xl" />
        </Center>
        <Heading>{driverUsername}</Heading>
        <div className="rating">{starIcons}</div>
        <Text fontSize="lg">{driverProfile.phone}</Text>
      </Box>
      <Box textAlign="center" marginTop="4">
        <VStack spacing="4" mb="8">
        <Text fontSize="lg">Name: {driverProfile.name}</Text>

        <Text fontSize="lg">Charged Fare (Approximated): {driverProfile.fare} BDT per hour</Text>
        <Text fontSize="lg">Experience: {driverProfile.experience} year(s)</Text>
        <Text fontSize="lg">Date of Birth: {driverProfile.dob}</Text>
        <Text fontSize="lg">Gender: {driverProfile.gender}</Text>
        <Text fontSize="lg">NID: {driverProfile.nId}</Text>
        <Text fontSize="lg">Driving Licence ID: {driverProfile.drivingId}</Text>
        <Text fontSize="lg">Area of Living: {driverProfile.location}</Text>
        {/* <Box> Rating: (total {driverProfile.totalRating} ratings) {ratingSystemFixed} </Box> */}
        
        
        </VStack>
      </Box>
    </Box>

    
    );


}
