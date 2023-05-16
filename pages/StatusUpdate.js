import React, { useState, useEffect } from "react";
import { Switch } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Services from "/pages/Services.js"

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'


const OpenStreetMap = dynamic(() => import("pages/components/Map/Map"), {
  ssr: false,
})



function StatusUpdate() {
  const toast = useToast();
  const [isChecked, setIsChecked] = useState(false);

  const SaveToDatabase = () => {
    const services = new Services();
    const username = localStorage.getItem('username');
    const statusString = localStorage.getItem('status');
    const status = statusString === 'true';
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');

    
    if(status === true && latitude === null){
      // console.log("not allowed");
      toast({
        title: 'Error',
        description: "Update current location",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return
    }
   
    const response = services.updateStatus(username, latitude, longitude, status);

    if(response === "Failed to update status"){
      toast({
        title: 'Error',
        description: response,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    else if(response === "Error updating status"){
      toast({
        title: 'Error',
        description: response,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    else {
      toast({
        title: 'Success',
        description: response,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        window.close();
      }, 3000); // Adjust the delay as needed

      localStorage.removeItem('latitude')
      localStorage.removeItem('longitude')
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("status");
    setIsChecked(storedValue === "true");
}, []);

const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    localStorage.setItem("status", newValue);
};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        minWidth: "320px", // Set the minimum width to the size of the phone
      }}
    >
    <div style={{ width: "100%", height: "80%" , padding: '2rem'}}>
        <OpenStreetMap />
    </div>
    <div style={{ width: "100%" , padding: '2rem 0rem 2rem 2rem', textAlign: "center"}}>
        <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>
                Online?
            </FormLabel>
            <Switch isChecked={isChecked} onChange={handleToggle} />
        </FormControl>
    </div>
    <div style={{ width: "100%" , padding: '0rem 2rem 2rem 2rem'}}>
      <Button onClick={SaveToDatabase}  colorScheme='blue'> Save</Button>
    </div>
    </div>
);
}

export default StatusUpdate;
