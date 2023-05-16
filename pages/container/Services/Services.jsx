import React from 'react';

import { SubHeading, ServiceItem } from '../../components';
import { data, images } from '../../constants';
import './Services.css';

const SpecialMenu = () => (
  <div className="app__specialMenu flex__center section__padding" id="services">
    <div className="app__specialMenu-title">
      <h1 className="headtext__cormorant">Our Services</h1>
    </div>

    <div className="app__specialMenu-menu">
      <div className="app__specialMenu-menu_wine  flex__center">
        {/* <p className="app__specialMenu-menu_heading">Wine & Beer</p> */}
        <div className="app__specialMenu_menu_items">
          {data.serviceitemleft.map((wine, index) => (
            <ServiceItem key={wine.title + index} title={wine.title} tags={wine.tags} />
          ))}
        </div>
      </div>
        <div className='gap'>

        </div>

      <div className="app__specialMenu-menu_cocktails  flex__center">
        {/* <p className="app__specialMenu-menu_heading">Cocktails</p> */}
        <div className="app__specialMenu_menu_items">
          {data.serviceitemright.map((cocktail, index) => (
            <ServiceItem key={cocktail.title + index} title={cocktail.title} tags={cocktail.tags} />
          ))}
        </div>
      </div>
    </div>

    {/* <div style={{ marginTop: 15 }}>
      <button type="button" className="custom__button">View More</button>
    </div> */}
  </div>
);

export default SpecialMenu;
