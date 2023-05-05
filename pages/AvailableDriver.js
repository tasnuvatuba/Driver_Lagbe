import Image from 'next/image'
import data from '/pages/constants/data.js'
import Card from '/pages/components/Card/Card.jsx'
import ProfileCard from '/pages/components/ProfileCard/ProfileCard.jsx'
import './AvailableDriver.css'

export default function Home() {
  return (

    <main className='container mx-auto py-36 px-8 '>
      <div className='grid lg:grid-cols-3 gap-6'>
        
      {data.review.map(card => (

        <ProfileCard img = {card.imgUrl} name = {card.name} desc = {card.review} />
        // <div className='shadow-lg rounded-lg'>
        //  <img className='rounded-t-lg' src={card.imgUrl} alt = ""/>
        //  <div className='p-5'>
        //  <h3 className='text-3*1 font-bold text-slate-700 mb-3'>{card.name}</h3>
        //  <p>{card.review}</p>
        //  </div>
         
        // </div>
      ))}
      </div>
      
    </main>
    
    // <div className='container mx-auto py-36 px-8 '>
    //   <div className='grid grid-cols-3 gap-4'>
        
    //   {data.review.map(card => (
    //     <div className="shadow-lg p-3 mb-5 bg-white rounded">
    //      <img className='rounded-t-lg' src={card.imgUrl} alt = ""/>
    //      <div className='p-5'>
    //      <h3 className='text-3*1 font-bold text-slate-700 mb-3'>{card.name}</h3>
    //      <p style={{ color: 'red' }}>{card.review}</p>
    //      </div>
         
    //     </div>
    //   ))}
    //   </div>
      
    // </div>
  )
}

