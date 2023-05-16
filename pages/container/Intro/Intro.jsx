
import React from 'react';

import SubHeading from '/pages/components/SubHeading/SubHeading.jsx';
import './Intro.css';
import { Dropdown } from "@nextui-org/react";
import { Link, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';



const Newsletter = ({username}) => {
  console.log(username);

  const toast = useToast();
  const router = useRouter();
  const [selected, setSelected] = React.useState(new Set(["Trip Type"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  //const currentDate = new Date();
  const currentDate = new Date().toISOString().split('T')[0];
  // console.log("current date " + currentDate)

  const handleHireNowClick = () => {
    const sourceAddress = document.getElementById('hireNowSource').value;
    const destinationAddress = document.getElementById('hireNowDest').value;
    const tripType = selectedValue;


    if (!sourceAddress || !destinationAddress || !tripType) {
      toast({
        title: 'Error',
        description: "'Please fill in all the required fields",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    router.push({
      pathname: '/AvailableDriver',
      query: { username: username, srcPage: 'Intro', srcAddr: sourceAddress, destAddr: destinationAddress, tripType: tripType } //no pickup time??
    })
  };

  const handleHireLaterClick = () => {
    const sourceAddress = document.getElementById('hireLaterSource').value;
    const destinationAddress = document.getElementById('hireLaterDest').value;
    const pickUpTime = document.getElementById('hireLaterPickTime').value;
    const tripType = selectedValue;

    if (!sourceAddress || !destinationAddress || !tripType || !pickUpTime) {
      toast({
        title: 'Error',
        description: "'Please fill in all the required fields",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    router.push({
      pathname: '/AllDrivers',
      query: { username: username, sourcePage: 'Intro', srcAddr: sourceAddress, destAddr: destinationAddress, tripType: tripType, 
      pickUpTime:pickUpTime }
    })
  
  };

  
  return (
    
    <div className="app__booking">
      <div className="app__booking-heading">
        <h1 className="headtext__cormorant">Start Your Journey</h1>
      </div>

      <div className='grid-container'>
        <div className="app__booking-input flex__center">
          
          <input type="address" placeholder="Enter your source address" id='hireNowSource'/>
          <input type="address" placeholder="Enter your destination address" id='hireNowDest'/>

          <div className='app__booking-dropdown'>
            <Dropdown id='hireNowTrip'>
              <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
              >
                <Dropdown.Item key="outstation">Outstation</Dropdown.Item>
                <Dropdown.Item key="shortTrip">Short Trip</Dropdown.Item>
                <Dropdown.Item key="dailyCommute">Daily Commute</Dropdown.Item>
                <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
                <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        
          <button type="button" className="custom__button" onClick={handleHireNowClick}>
            Hire Now
          </button>
        </div>

        <div className="app__booking-input flex__center">
          <input type="address" placeholder="Enter Your Source Address" id='hireLaterSource' />
          <input type="address" placeholder="Enter Your Destination Address" id='hireLaterDest'/>
          <input
            type="datetime-local"
            placeholder="Enter your time"
            id='hireLaterPickTime'
            min={currentDate} // Set the minimum date to the current date
          />

          <div className='app__booking-dropdown'>
            <Dropdown id='hireLaterTrip'> 
              <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
              >
                <Dropdown.Item key="outstation">Outstation</Dropdown.Item>
                <Dropdown.Item key="shortTrip">Short Trip</Dropdown.Item>
                <Dropdown.Item key="dailyCommute">Daily Commute</Dropdown.Item>
                <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
                <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
          <button type="button" className="custom__button" onClick={handleHireLaterClick}>
                Book for Later
              </button>
          
        </div>
        </div>
    </div>
  );
};




export default Newsletter;

