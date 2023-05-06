import React from 'react'
import './ProfileCard.css'

const ProfileCard = ({img, name, desc}) => (

        <div className="app__profilecard">
            <div className="image-content">
                <span className="overlay"></span>

                <div className="app__profilecard-image">
                    <img src= {img} alt="" className="app__profilecard-img"/>
                </div>
            </div>

            <div className="app__profilecard-content">
                <div className="app__profilecard-nameAndStatus">
                    <h2 className="p__cormorant">{name}</h2>
                    <div className="dot"></div>
                </div>
                
                
                <p className="p__opensans" style={{ color: '#AAAAAA' }}>{desc}</p>
            </div>
        </div>                
                    
  

);

export default ProfileCard





