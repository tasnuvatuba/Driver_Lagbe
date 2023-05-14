import React from 'react'
import './ProfileCard.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt as fasStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';

// Add the star icons to the Font Awesome library
library.add(fasStar, farStar, fasStarHalfAlt);


const ProfileCard = ({img, name, desc, rating, fare, status}) => {
  const getStatusColor = (status) => {
    if (status == 1) {
      return 'green';
    } else {
      return 'red';
    }
  };

  const statusColor = getStatusColor(status);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    console.log("rating " + rating)

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={fasStar} />);
    }

    // Add half star if applicable
    if (halfStar) {
    stars.push(<FontAwesomeIcon key="half" icon={fasStarHalfAlt} />);
  }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={farStar} />);
    }

    
    return stars;
  };

  const starIcons = renderStars(rating);

  const router = useRouter();

  const handleAboutMeClick = () => {
    router.push({
      pathname: '/Profile',
      query: { username: name }
    })
  };

  return(
    
  <div className="swiper mySwiper container">
    <div className="swiper-wrapper content">

      <div className="swiper-slide card">
        <div className="card-content">
          <div className="image">
            <img src="/1.jpg" alt=""/>
          </div>

         

          <div className="name-desc">
            <div className="status-circle" style={{ backgroundColor: statusColor }}></div>
            <span className="name">{name}</span>
            <span className="desc">{desc}</span>
            <span className="fare">TK {fare}/hour</span>
          </div>

          <div className="rating">{starIcons}</div>

          <div className="button">
          {/* <button className="aboutMe" onClick={handleAboutMeClick}>More About Me</button> */}
          <button className="aboutMe" onClick={handleAboutMeClick}>More About Me</button>
            {/* <button className="hireMe">Hire Me</button> */}
          </div>
        </div>
      </div>
      

    </div>
  </div>

  
                    
  );

};

export default ProfileCard





