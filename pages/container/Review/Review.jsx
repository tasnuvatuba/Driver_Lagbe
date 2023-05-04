import React from 'react';

import './Review.css';
import { ReviewSlider } from '../../components';
import { SubHeading } from '../../components';

const Review = () => (
  <div  className="app__review flex__center section__padding" id="reviews">
    <div className="app__review-title">
      <h1 className="headtext__cormorant">Reviews</h1>
    </div>

    <ReviewSlider />
  </div>
);

export default Review;

