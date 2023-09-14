import React from "react";
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';


import { getUserDataFromLocalStorage } from "../Utils/LocalStorage";

function Profile(){

    const userData = getUserDataFromLocalStorage();
    const navigate = useNavigate();

    

    // Define a function to pass userData as state
    // const linkToProfileEdit = {
    //     pathname: '/ProfileEdit',
    //     state: { userData: userData },
        
    // };

    const handleUpdateProfileClick = () => {
        navigate('/ProfileEdit', { state: { userData } });
    };

    

    console.log(userData);
        return (
        <div className="profile-container">
            <h1 className="profile-heading">----- Your Profile Details -----</h1>
            {userData ? (
                <div className="user-data">
                    {/* <p>User ID: {userData.userId}</p> //remove userid displaying at the frontend */}
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>First Name:{userData.firstName}</p>
                    <p>Last Name:{userData.lastName}</p>
                    
                </div>
            ) : (
                <p>User data not available.</p>
            )}
            <div className="button-container">
                {/* <Link to="/ProfileEdit" className="update-button">
                    Update Profile
                </Link> */}
                {/* <Link to={linkToProfileEdit} className="update-button" onClick={() => navigate('/ProfileEdit')}>
                    Update Profile
                </Link> */}
                <button className="update-button" onClick={handleUpdateProfileClick}>
                    Update Profile
                </button>
            </div>
        </div>
    );

    

}

export default Profile;