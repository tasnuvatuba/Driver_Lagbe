import React, { useState } from "react";
import SearchBox from "./SearchBox";
import dynamic from 'next/dynamic'


const OpenStreetMap = dynamic(() => import("pages/components/Map/Map"), {
  ssr: false,
})


function SearchByLocation() {
  
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "70vw", height: "100%" , padding: '2rem'}}>
        <OpenStreetMap selectPosition={selectPosition} />
      </div>
      <div style={{ width: "30vw" , padding: '2rem 2rem 2rem 0', textAlign: "center"}}>
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
        
      </div>
    </div>
  );
}

export default SearchByLocation;
