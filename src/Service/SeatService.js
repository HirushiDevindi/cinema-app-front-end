import axios from "axios";

import { getUserDataFromLocalStorage } from '../Components/Utils/LocalStorage';
import { getPasswordFromLocalStorage } from '../Components/Utils/LocalStorage';

class SeatService{
    getAllSeats(){
        return axios.get('http://localhost:8000/seat', {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    addSeat(seat){
        return axios.post('http://localhost:8000/seat', seat , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }


    getSeatById(seatId){
        return axios.get('http://localhost:8000/seat/seatId' + '/' + seatId , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    updateSeat(seatId, seat){
        return axios.put('http://localhost:8000/seat' + '/' +seatId, seat , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }

    deleteSeat(seatId){
        return axios.delete('http://localhost:8000/seat' + '/' + seatId , {
            auth: {
              username: getUserDataFromLocalStorage().username, 
              password: getPasswordFromLocalStorage(), 
            },
          });
    }
}

export default new SeatService();
