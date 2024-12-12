import React from 'react';
import './HomePage.css';
import {useAuth} from "../authenticationHook.jsx";

import { Taskbar } from "../taskbar.jsx"
import { PostsFeed } from "./postsFeed.jsx"
import { Sidebar } from "./sidebar.jsx"



const HomePage = () => {
  const { userObj } = useAuth();
  console.log(userObj);
  if (!userObj) {
    return <div>Loading...</div>
  }

  return (
    <div className="home-page">
      <Taskbar />
      <div className="content">
        <div className="background-block">
          <PostsFeed props={{user_id: userObj.user_id}}/>
          <Sidebar/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
