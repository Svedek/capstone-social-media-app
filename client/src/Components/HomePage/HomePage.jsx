import React from 'react';
import './HomePage.css';
import {useAuth} from "../authenticationHook.jsx";

import { Taskbar } from "../taskbar.jsx"
import { PostsFeed } from "./postsFeed.jsx"
import { Sidebar } from "./sidebar.jsx"



const HomePage = () => {
  const {userId} = useAuth();

  if (!userId) {
    return <div>Loading...</div>
  }

  return (
    <div className="home-page">
      <Taskbar />
      <div className="content">
        <div className="background-block">
          <PostsFeed props={{user_id: userId}}/>
          <Sidebar/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
