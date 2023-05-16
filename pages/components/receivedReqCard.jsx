import { Box, Image, Text, useToast, Button, HStack } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import {colors} from "../constants/colors";
import axios from "axios";

export default function ReceivedReqCard({ request }) {

  const toast = useToast();
  const [showButton, setShowButton] = useState(true);
  const [statusCol, setStatusCol] = useState("black");
  const [preeBooking, setPreBooking] = useState(false); 
  

useEffect(() => {
    if(request.status === "pending"){
      setShowButton(true);
      setStatusCol("black");
    }
    else if(request.status === "accepted"){
      setShowButton(false);
      setStatusCol("green.500");
    }
    else{
      setShowButton(false);
      setStatusCol("red.500");

    }

     /////////
     if(request.pickUpTime !== null){
      setPreBooking(true);
    }

    
  }, []); // empty dependency array to run effect only once on mount



  const accept = () => {
    setShowButton(false);
    request.status = "accepted";
    setStatusCol("green.500");
    axios({
        method: 'post',
        withCredentials: true,
        data: {
            id: request.id,
            status: "accepted"

        },
        url: 'http://localhost:3001/requestConf'
      })
        .then(res => {
            if(res.data === "succcess"){
                toast({
                    title: 'Success',
                    description: 'Accepted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });

            }
            
        })
        .catch(err => {
            console.log(err);
        })

    
    
  }

  const decline = () => {
    setShowButton(false);
    request.status = "declined";
    setStatusCol("red.500");
    axios({
        method: 'post',
        withCredentials: true,
        data: {
            id: request.id,
            status: "declined"

        },
        url: 'http://localhost:3001/requestConf'
      })
        .then(res => {
            if(res.data === "succcess"){
                toast({
                    title: 'Declined',
                    description: 'declined',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  });

            }
            
        })
        .catch(err => {
            console.log(err);
        })
    
  }




  return (
    <Box borderWidth="5px" borderRadius="lg" overflow="hidden" bg = {colors.bg_light}>
      
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {preeBooking && <Text fontSize="xl" mr="2">
            Pre Booking for: {request.pickUpTime}
          </Text>
          }
          <Text fontSize="xl" mr="2">
            Car Owner's Username: {request.owner}
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
          {request.status}
        </Box>
        <Box mt="2">
          <HStack spacing="4">
          {showButton && (<Button onClick ={accept}  variant='solid' colorScheme='green'>Acceept </Button>)}
          {showButton && (<Button onClick ={decline}  variant='solid' colorScheme='red'>Decline </Button>)}
          {!showButton && <Text> </Text>}

          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
