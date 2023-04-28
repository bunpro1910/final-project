

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import Category from './Category'
import { ReactNotifications, Store } from 'react-notifications-component'
import Silde from './Slide'
import Container from'./Container.js'
import Allcate from './Allcate'
import Searchbar from'./Searchbar'
function Home() {

  return (
    <>
   
      <Searchbar/>
      <Silde/>
      
      <Allcate/>
    </>
  );
}

export default Home;
