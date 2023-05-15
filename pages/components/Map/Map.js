import React, { useEffect , useRef,  useState} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { icon } from "leaflet";
import 'leaflet.locatecontrol';
import { useRouter } from 'next/router';
import Services from "../../Services";
import SearchByLocation from "../../SearchByLocation";


const myLocation = L.icon({
  iconUrl: "./marker-icon.png",
  iconSize: [38, 38],
});


const onlineDriver = L.icon({
  iconUrl: "./user.png",
  iconSize: [38, 38],
});

 
const position = [ 23.76327225,90.35982402380321];

function handleKnowMore(){
  console.log("handle know more function clicked");
}


function ShowOnlineUsers({activeDrivers}) {
  const map = useMap();

  const users = activeDrivers

    if(users){
      users.forEach(user => {
        const { latitude, longitude, username, des, rating} = user;
        const marker = L.marker([latitude, longitude],  {icon :onlineDriver}).addTo(map);


        // const handleKnowMore = () => {
        //   // Handle the "Know More" button click event
        //   console.log(`Know More button clicked for user ${username}`);
        //   // Add your custom logic here
        // };

        const popupContent = `
          <b>${username}</b><br>${rating}<br>${des}<br>
          <button
              type="button"
              className="custom__button"
              onClick={() => {
                // Your click logic here
                console.log('Button clicked!');
              }}
            >
              Book for Later
          </button>
          <button onclick="handleKnowMore()">Know More</button>
        `;

        marker.bindPopup(popupContent);
  
        marker.openPopup();
        // marker.bindPopup(`<b>${username}</b><br>${rating}<br>${des}`).openPopup();
      });
    }
  

  return null;
}


function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      const { lat, lon } = selectPosition;

      // Fly to the marker's position with animation
      map.flyTo([lat, lon], map.getZoom(), {
        animate: true,
        duration: 1
      });
    }
  }, [selectPosition]);

  return null;
}

function GetCurrentLocation() {
  const map = useMap()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latlng = L.latLng(
          position.coords.latitude,
          position.coords.longitude
        );
        
        // console.log(latlng)
        // createMarker(latlng);
        map.setView(latlng, 13);
        const marker = L.marker([latlng.lat, latlng.lng]).addTo(map);
        const circle = L.circle(latlng, {
          radius: 1000,
          color: 'blue',
          fillColor: '#blue',
          fillOpacity: 0.2,
        }).addTo(map);

        localStorage.setItem('latitude', latlng.lat);
        localStorage.setItem('longitude', latlng.lng);
        
      },
      function (error) {
        console.log('Error getting location: ' + error.message);
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function LocateMe({ onLocationChange }) {
  const map = useMap();
  const [location, setLocation] = useState(null);
 

  useEffect(() => {
    const locateControl = L.control
      .locate()
      .addTo(map);


      map.on('locationfound', (e) => {
              
              setLocation(e.latlng);
              onLocationChange(e.latlng); // Call the provided callback function with the location
            });         
     

  }, []);

  return null;
}


export default function Maps(props) {
  const [activeDrivers, setActiveDrivers] = useState([]);
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const mapRef = useRef(null);

  const router = useRouter();
  const parentPage = router.pathname; // Gets the parent page path

  const isSearchByLocation = parentPage === '/SearchByLocation';

  const handleLocationChange = (location) => {
   
    // Handle the location change here
    // if (!isSearchByLocation) {
    //   localStorage.setItem('latitude', location.lat);
    //   localStorage.setItem('longitude', location.lng);
    // }
    
  };

  useEffect(() => {

    const fetchDrivers = async () => {
      const services = new Services()
      const drivers = await services.getActiveDrivers();
      setActiveDrivers(drivers);
    };

    fetchDrivers();

    // if(isSearchByLocation){
    //   const interval = setInterval(() => {
    //     // Fetch drivers periodically
    //     fetchDrivers();
    //   }, 5000); // Refresh interval in milliseconds
    //     

    const leafletStylesheet = document.createElement('link');
    leafletStylesheet.rel = 'stylesheet';
    leafletStylesheet.href =
      'https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.css';
    document.head.appendChild(leafletStylesheet);

    const leafletScript = document.createElement('script');
    leafletScript.src =
      'https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.js';
    document.head.appendChild(leafletScript);

    return () => {
      // Cleanup the added link and script when the component unmounts
      document.head.removeChild(leafletStylesheet);
      document.head.removeChild(leafletScript);
    };
  }, []);



  return (   
    <MapContainer   
      setView = {[90.38538,23.76589,90.39265,23.76291]}
      center={position}
      zoom={17}
      style={{ width: "100%", height: "100%" }}      
      >

      <TileLayer
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {isSearchByLocation ? (
              <>
                <LocateMe onLocationChange={handleLocationChange} />
                <ShowOnlineUsers activeDrivers={activeDrivers} />
              </>
            ) : (
              <GetCurrentLocation />
            )}

      

      {selectPosition && (
        <Marker position={locationSelection} draggable ={true} >
          <Popup>
            Latitude: {locationSelection[0]}<br />
            Longitude: {locationSelection[1]} <br/>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}



