import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import Feed from '../Feed/Feed';
import Sidebar from '../SideBar/SideBar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <NavigationBar />
      <div className="content">
        <Feed />
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
