import React from 'react';

import './ServiceItem.css';

const ServiceItem = ({ title, tags }) => (
  <div className="app__serviceitem">
    <div className="app__serviceitem-head">
      <div className="app__serviceitem-name">
        <p className="p__cormorant" style={{ color: '#DCCA87' }}>{title}</p>
      </div>   
    </div>

    <div className="app__serviceitem-sub">
      <p className="p__opensans" style={{ color: '#AAAAAA' }}>{tags}</p>
    </div>
  </div>
);

export default ServiceItem;