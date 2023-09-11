import React from 'react'
import './Home2.css';
import './Home.css';

function Home2() {
    return(
        <div className='home2'>
        <div className='header'>
          <h2>Customize your Cinema Application here !</h2>
        </div>
        <div className='content'>
          <div className='section'>
            <h3>You can </h3>
            <ul>
              <li>Add Movies</li>
              <li>Add Movie Shows</li>
              <li>Handling Seating</li>
            </ul>
          </div>
          <div className='section'>
            <h3>Start Today !</h3>
          </div>
        </div>
      </div>
    );
}

export default Home2
