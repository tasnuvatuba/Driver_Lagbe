import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { SubHeading } from '../../components';
import { images } from '/pages/constants';
import Card from 'pages/components/Card/Card.jsx'

import data from 'pages/constants/data.js'
import './Gallery.css';

const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (

    
    
    <div className="app__gallery flex__center section__padding">
      <div className="app__gallery-content">
        <div className="app__gallery-title">
                <h1 className="headtext__cormorant">Reviews</h1>
              </div>
      </div>
      
      {/* <div className="app__gallery-content">
        <SubHeading title="Instagram" />
        <h1 className="headtext__cormorant">Photo Gallery</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat mattis ipsum turpis elit elit scelerisque egestas mu.</p>
        <button type="button" className="custom__button">View More</button>
      </div> */}
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>

       

           {data.review.map((reviewitem) => (
            <div className="app__gallery-images_card flex__center">
                  <Card img = {reviewitem.imgUrl} name = {reviewitem.name} review = {reviewitem.review} />
      
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
