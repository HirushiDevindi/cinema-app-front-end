import axios from "axios";

import { getUserDataFromLocalStorage } from '../Components/Utils/LocalStorage';
import { getPasswordFromLocalStorage } from '../Components/Utils/LocalStorage';


class MovieShowService{
    getAllMovieShow(){
        return axios.get('http://localhost:8000/show', {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    addMovieShow(movieShow){
        return axios.post('http://localhost:8000/show', movieShow , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    getMovieShowById(movieShowId){
        return axios.get('http://localhost:8000/show/movieShow' + '/' + movieShowId , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    updateMovieShow(movieShowId, movieShow){
        return axios.put('http://localhost:8000/show' + '/' +movieShowId, movieShow , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    deleteMovieShow(movieShowId){
        return axios.delete('http://localhost:8000/show' + '/' + movieShowId , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }
}

export default new MovieShowService();