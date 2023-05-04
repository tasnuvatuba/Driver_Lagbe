
import React from 'react';

import SubHeading from '/pages/components/SubHeading/SubHeading.jsx';
import './Intro.css';
import { Dropdown } from "@nextui-org/react";






const Newsletter = () => {
  const [selected, setSelected] = React.useState(new Set(["text"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  
  return(
    <div className="app__booking">
      <div className="app__booking-heading">
        <SubHeading title="Hire A Driver" />
        <h1 className="headtext__cormorant">Start Your Journey</h1>
        {/* <p className="p__opensans">And never miss latest Updates!</p> */}
      </div>
      <div className="app__booking-input flex__center">
        <input type="address" placeholder="Enter your source address" />
        <input type="address" placeholder="Enter your destination address" />

        <div>
          <Dropdown>
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
        
          
      </div>
      <div className="flex__center p-5 m-5">
          <button type="button" className="custom__button">Hire Now</button>
        </div>
    
    </div>
  )
}

export default Newsletter;


