import React from 'react';
import './HomePage.css';
import {useAuth} from "../authenticationHook.jsx";

import { Taskbar } from "../taskbar.jsx"
import { PostsFeed } from "./postsFeed.jsx"
import { Sidebar } from "./sidebar.jsx"



const HomePage = () => {
  const {user_id} = useAuth();

  return (
    <div className="home-page">
      <Taskbar />
      <div className="content">
        <div className="background-block">
          <PostsFeed user_id={user_id}/>
          <Sidebar/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
