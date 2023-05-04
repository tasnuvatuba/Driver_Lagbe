import React from 'react';



const SubHeading = ({ title }) => (
  <div style={{ marginBottom: '1rem' }}>
    <p className="p__cormorant">{title}</p>
    <img src="/car.png" alt="spoon_image" className="spoon__img" />
  </div>
);

export default SubHeading;
