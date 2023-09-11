import "./WelcomePage.css";
import React from "react";
import { Link } from 'react-router-dom';

function WelcomePage(){
    return (
        <div className="welcome-page">
            <h1>Welcome to Cinema App</h1>
                <nav className="navigation">
                    <div className="navigation-box">
                        <div className="navigation-links">
                            <Link to="/SignIn">Sign In</Link>
                            
                        </div>
                    </div>

                    <div className="navigation-box">
                        <div className="navigation-links">
                            
                            <Link to="/SignUp">Sign Up</Link>
                        </div>
                    </div>

                </nav>
        </div>
      );
}

export default WelcomePage;