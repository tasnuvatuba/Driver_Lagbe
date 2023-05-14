import React, { useState } from "react";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import {FaMapMarkerAlt} from  'react-icons/fa';
import {
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'


const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  console.log(searchText)
  const [listPlace, setListPlace] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Input placeholder='Search Location' 
            width="100%" 
            value={searchText} 
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
      
        <div>
          <Button colorScheme='blue'
          onClick={() => {
            const params = {
              q: searchText,
              format: "json",
              addressdetails: 1,
              polygon_geojson: 0,
            };
            const queryString = new URLSearchParams(params).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err: ", err));
          }}
          marginLeft="1rem">
            Search
            </Button>
        </div>
      </div>
      <div>

        <List spacing={3}>

        {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                
                <ListItem
                 style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectPosition(item);
                }}>
                  <ListIcon as={FaMapMarkerAlt} color='red.500' />
                  {item?.display_name}
                </ListItem>
                <Divider />
              </div>
            );
          })}
        
      </List>

      </div>
    </div>
    
  );
}
