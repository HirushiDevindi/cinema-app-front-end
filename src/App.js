import logo from './logo.svg';
import './App.css';
import {Layout} from 'antd';
import React from 'react';
import { createRoot } from "react-dom/client";

//
import { BrowserRouter , Route, Routes, Outlet, createRoutesFromElements,createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './Components/SignUp/SignUp';
import WelcomePage from './Components/welcomePage/WelcomePage';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import Profile from './Components/Profile/Profile';
import Logout from './Components/Logout/Logout';
import Movie from './Components/Movie/Movie';
import Seat from './Components/Seat/Seat';
import ProfileEdit from './Components/Profile/ProfileEdit';
import AddMovie from './Components/Movie/AddMovie';
import MovieShow from './Components/MovieShow/MovieShow';
import AddMovieShow from './Components/MovieShow/AddMovieShow';
import AddSeat from './Components/Seat/AddSeat';

import Home2 from './Components/Home/Home2';

import AddSeat2 from './Components/Seat/AddSeat2';
import AddMovie2 from './Components/Movie/AddMovie2';
import AddMovieShow2 from './Components/MovieShow/AddMovieShow2';


function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  const AppLayout = () => (
    <>
      <Home />
      <Outlet />
    </>
  );

  return(
    <div className="App"> 
      <BrowserRouter>
      <Routes>

      <Route element={<AppLayout />}>

        <Route path="/Home2" element={<Home2/>}/>
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Movie" element={<Movie/>} />
        <Route path="/MovieShow" element={<MovieShow/>} />
        <Route path="/Seat" element={<Seat/>}/>
        
      </Route>

        <Route path="/" element={<WelcomePage/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Home2" element={<Home2/>}/>

        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/ProfileEdit" element={<ProfileEdit/>}/>

        <Route path="/AddMovie" element={<AddMovie/>}/>
        {/* <Route path="/EditMovie/:movieId" element={<AddMovie/>} /> */}
        <Route path="/AddMovie2" element={<AddMovie2/>}/>
        <Route path="/EditMovie/:movieId" element={<AddMovie2/>} />

        <Route path="/AddMovieShow" element={<AddMovieShow/>}/>
        {/* <Route path="/EditMovieShow/:movieShowId" element={<AddMovieShow/>}/> */}
        <Route path="/AddMovieShow2" element={<AddMovieShow2/>}/>
        <Route path="/EditMovieShow/:movieShowId" element={<AddMovieShow2/>}/>

        <Route path="/AddSeat" element={<AddSeat/>}/>
        <Route path="/EditSeat/:seatId" element={<AddSeat/>}/>

        <Route path="/AddSeat2" element={<AddSeat2/>}/>
        

      </Routes>
      </BrowserRouter>
      
    </div>

  );
}



export default App;
