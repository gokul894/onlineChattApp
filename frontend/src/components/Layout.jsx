import React from 'react';
// import Home from './Home.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

function Layout() {
  return (
    <div className='bg-background relative flex flex-col place-items-center'>
    <Navbar/>
    <ToastContainer/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout