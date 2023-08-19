import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

export default function Layout({ currentLoggedInUserDetails, cartItemsCount }) {
  return (
    <div className='layoutContainer'>
        <Header currentLoggedInUserDetails={currentLoggedInUserDetails} cartItemsCount={cartItemsCount}/>
        <div className='mainContainer'>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}