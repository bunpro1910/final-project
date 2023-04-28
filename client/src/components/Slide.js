
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Category from './Category'
const slideImages = [
  {
    url: 'https://bossluxurywatch.vn/uploads/banner/anh-slide-3.jpg',
    caption: 'Slide 1'
  },
  {
    url: 'https://bossluxurywatch.vn/uploads/banner/anh-slide-4.jpg',
    caption: 'Slide 2'
  },
  {
    url: 'https://bossluxurywatch.vn/uploads/banner/anh-slide-2.jpg',
    caption: 'Slide 3'
  },
];


const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}
function React() {
  useEffect(() => {

  }, [])
  return (

    <>


      <section className='mt-12 w-full items-center z-0 relative'>
        <Slide duration={3000} canSwipe={true}>
          {slideImages.map((slideImage, index) => (
            <div key={index} className="px-20 " >
              <div className="rounded-xl" style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))}
        </Slide>
            
        {/* <img src="https://lh3.googleusercontent.com/nTgOe4Yv-J7OnWXA6rMGPTed_rGYY9QaBVneUF_E6f0Q4d9yUoc60D49y53JUIzkRyzcQ8V7rTpfK9G1Gx7AJOsvTkrSSjTD=w1920-rw" alt=""/>
              <div className="absolute top-36 left-32 text-black">
              </div> */}
              {/* <div className="absolute top-0 left-24">
              <Category/> 
              </div> */}
          
      </section>
    </>

  );
}

export default React;
