import React from 'react'
import Card from '../Card/Card';
import  data  from '/pages/constants/data.js';
import { Container, Row } from "react-bootstrap";


import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import './ReviewSlider.css'



const ReviewSlider = () => {

    return(
      

      <div  >

        { <div className="justify-content-md-center" >
            {data.review && data.review.map(reviewitem => (
                  <Card img = {reviewitem.imgUrl} name = {reviewitem.name} review = {reviewitem.review} />
                ))}
        </div>        
       }

    </div>
    )
}

export default ReviewSlider;




