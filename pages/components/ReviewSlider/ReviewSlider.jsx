import React from 'react'
import Card from '../Card/Card';
import  data  from '/pages/constants/data.js';

import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
// import './ReviewSlider.css'



const ReviewSlider = () => {

    return(
  
      <div  className="app__slider">

        <div >
            {data.review && data.review.map((reviewitem) => (
                  <Card key={reviewitem.name} img = {reviewitem.imgUrl} name = {reviewitem.name} review = {reviewitem.review} />
                ))}
        </div>        
      

    </div>
    )
}

export default ReviewSlider;




