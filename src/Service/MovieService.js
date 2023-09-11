// import {  useState } from "react";
// import axios from "axios";
// import SingUp from './Components/SingUp/SingUp';
// import Password from "antd/es/input/Password";

// async function singup(event){

//     event.preventDefault();

//     try{
//         await axios.post("http://localhost:8000/api/user/signup");
//         alert("Registration Successed");
//         //
//     }catch(e){
//         alert(e);
//     }
// }

import { getUserDataFromLocalStorage } from '../Components/Utils/LocalStorage';
import { getPasswordFromLocalStorage } from '../Components/Utils/LocalStorage';


import axios from 'axios'

class MovieService{
    getAllMovies(){
        return axios.get('http://localhost:8000/movie', {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    addMovie(movie){
        return axios.post('http://localhost:8000/movie', movie , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }


    getMovieById(movieId){
        return axios.get('http://localhost:8000/movie' + '/' + movieId , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    updateMovie(movieId, movie){
        return axios.put('http://localhost:8000/movie' + '/' +movieId, movie , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    deleteMovie(movieId){
        return axios.delete('http://localhost:8000/movie' + '/' + movieId, {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }
}

export default new MovieService();
