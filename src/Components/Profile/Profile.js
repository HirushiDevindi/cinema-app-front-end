import React from "react";
import './Profile.css';
import { Link } from 'react-router-dom';


import { getUserDataFromLocalStorage } from "../Utils/LocalStorage";

function Profile(){

    const userData = getUserDataFromLocalStorage();
        return (
        <div className="profile-container">
            <h1 className="profile-heading">----- Your Profile Details -----</h1>
            {userData ? (
                <div className="user-data">
                    {/* <p>User ID: {userData.userId}</p> */}
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>First Name:{userData.firstName}</p>
                    <p>Last Name:{userData.lastName}</p>
                    
                </div>
            ) : (
                <p>User data not available.</p>
            )}
            <div className="button-container">
                <Link to="/ProfileEdit" className="update-button">
                    Update Profile
                </Link>
            </div>
        </div>
    );

    

}

export default Profile;