import React from 'react'
import SwiperHomepage from '../components/SwiperHomepage'
import '../App.css';
import '../components/SliderHomepage';
import SliderHomepage from '../components/SliderHomepage';
import SliderHomeMostRated from '../components/SliderHomepageMostRated';
function Home() {
  return (
    <div className="Homepagesize">

    
    <div className='Top-swiper'>
        <SwiperHomepage/>
        <SliderHomepage/>
        <SliderHomeMostRated/>

    </div>
    </div>
  )
}

export default Home