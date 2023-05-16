import { Box, Image, Text, useToast, Button, Flex} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import {colors} from "../constants/colors";
import axios from "axios";

export default function RequestCard({ request }) {

  const [rating, setRating] = useState(0);
  const [statusCol, setStatusCol] = useState("black");
  const [showButton, setShowButton] = useState(false); //false = no show button, true = show button
  const [fixedButton, setFixedButton] = useState(true); //false = not fixed, true = fixed
  const [preeBooking, setPreBooking] = useState(false); 

  useEffect(() => {
    if(request.status === "accepted"){
      setStatusCol("green.500");
  
    }
    else if(request.status ===  "declined"){
      setStatusCol("red.500");
    }
    /////////
    if(request.pickUpTime !== null){
      setPreBooking(true);
    }

    ////////////
    if(request.status === "accepted" && request.rating === null){
      setShowButton(true);
      setFixedButton(false);
    }
    else if(request.status === "accepted"){
      setShowButton(true);
      setFixedButton(true);
    }
    else {
      setShowButton(false);
      setFixedButton(false);

    }
  
    
  }, []); // empty dependency array to run effect only once on mount


  const handleRating = (value) => {
    setRating(value);
    request.rating = value;
    console.log("value: ", value);
    setFixedButton(true);
    // Here, update the rating value in your database using an API call or other method.
    axios({
        method: 'post',
        withCredentials: true,
        data: {
            id: request.id,
            rating: value,
            username: request.driver

        },
        url: 'http://localhost:3001/rating'
      })
        
        .catch(err => {
            console.log(err);
        })



  };

  let ratingSystem = null;
  let ratingSystemFixed = null;
  //if (request.status === "accepted" && request.rating === null) {
    ratingSystem = (
      <Flex alignItems="center" mb={4}>
        <Text>Rate this Trip: </Text>
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            onClick={() => handleRating(value)}
            color={value <= rating ? "yellow.400" : "gray.200"}
            variant="unstyled"
          >
            <StarIcon />
          </Button>
        ))}
      </Flex>
    );
  //}

  //else if (request.status === "accepted"){
    ratingSystemFixed = (
      <Flex alignItems="center" mb={4}>
        <Text>Rated: </Text>
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            color={value <= request.rating ? "yellow.400" : "gray.200"}
            variant="unstyled"
          >
            <StarIcon />
          </Button>
        ))}
      </Flex>
    );

  //}
  

  return (
    <Box borderWidth="5px" borderRadius="lg" overflow="hidden" bg={colors.bg_light}>
      
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {preeBooking && <Text fontSize="xl" mr="2">
            Pre Booking for: {request.pickUpTime}
          </Text>
          }

          <Text fontSize="xl" mr="2">
            Driver's Username: {request.driver}
          </Text>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            From {request.source} to {request.destination}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Type of Trip: {request.typeOfTrip} 
          </Text>
          <Text fontSize="md">
            Request Sent at: {request.time} 
          </Text>
        </Box>

        <Box mt="2" fontWeight="semibold" as="h4" lineHeight="tight" color={statusCol}>
          {request.status}</Box>

        <Box mt="2">{showButton && !fixedButton && ratingSystem}</Box>
        <Box mt="2">{showButton && fixedButton && ratingSystemFixed}</Box>
        <Box mt="2">{!showButton && <Text></Text>}</Box>

      </Box>
    </Box>
  );
}
