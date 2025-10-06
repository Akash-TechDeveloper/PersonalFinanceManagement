import React, { useContext, useState } from "react";
import logo from "./image/7.png";
import notify from "./image/bell.png";
import "./Header.css";
import { UserContext } from "./UserContext";
import axios from "axios";

const Header = ({ buttonColor,onClearNotifications }) => {
  const { username } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = async () => {
    if (!isOverlayVisible) {
      try {
        const response = await axios.get(
          `http://localhost:9000/home/getNotify?username=${username}`
        );
        if (response.status === 200) {
          setNotifications(response.data);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
    setOverlayVisible(!isOverlayVisible);
  };

  


  const deleteMapping = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/home/clear?username=${username}`
      );
      if (response.status === 200) {
        setNotifications([]);
        onClearNotifications(); 
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };
  

  const timeAgo = (time) => {
    const offset = 5.5 * 60 * 60 * 1000; 
    const now = new Date();
    const then = new Date(new Date(time).getTime() + offset);
    const diffInSeconds = Math.floor((now - then) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}hr ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <React.Fragment>
      <div className="header-container">
        <div className="companyname">
          <img src={logo} alt="Company logo" />
          <h1>Cashtrack</h1>
        </div>
        <div className="menu-field">
          <div className="inside-container">
            <div className="text">
              <h2>Hey, {username}</h2>
              <h4>{new Date().toDateString()}</h4>
            </div>
            <div className="tools">
            <button style={{ backgroundColor: buttonColor }} onClick={toggleOverlay}>
                <img
                  src={notify}
                  alt="notification bar"
                  className={notifications.length > 0 ? "has-notification" : ""}
                />
              </button>
             
            </div>
          </div>
        </div>
      </div>

      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Notifications</h3>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index}>
                  <h4>{notification.notifyName}</h4>
                  <p>{timeAgo(notification.notifyTime)}</p>
                </div>
              ))
            ) : (
              <p>No notifications available</p>
            )}
            <button onClick={deleteMapping}>Clear All</button>
            <button onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
