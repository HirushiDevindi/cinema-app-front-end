import React, { useState } from "react";
import "./Logout.css";
import axios from 'axios';

import { removeUserDataFromLocalStorage, clearDataFromLocalStorage } from "../Utils/LocalStorage";
import { getUserDataFromLocalStorage } from '../Utils/LocalStorage';
import { getPasswordFromLocalStorage } from '../Utils/LocalStorage';



function Logout() {
  const [clicked, setClicked] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/logout');
      const message = response.data;

      if (message === "Logged out successfully") {
        alert("You Logout Successfully");
        // localStorage.removeItem('accessToken');
        removeUserDataFromLocalStorage();
        clearDataFromLocalStorage();
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleButtonClick = () => {
    setClicked(true);
    handleLogout();
  };

  return (
    <div className="logout-container">
      <div className="confirmation-message">
        Confirm your logout!
      </div>
      <button
        onClick={handleButtonClick}
        className={clicked ? "logout-button-clicked" : "logout-button"}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
