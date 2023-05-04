import React from 'react'
import './Card.css';


const Card = ({img, name, review}) => (
  
    <div className= "app__carditem">
        <div>
            <img className= 'app__carditem-img' src={img} alt = 'dp'/>
            <div className='app__carditem-text'>
                <div className='app__carditem-name'>
                    <h2 className="p__cormorant">{name}</h2>
                </div>
                <div className="app__carditem-sub">
                  <p className="p__opensans" style={{ color: '#AAAAAA' }}>{review}</p>
                </div>
                <div>
                    <button type="button" className="custom__button">Know More</button>
                </div>
            </div>
        </div>
    </div>

);

export default Card