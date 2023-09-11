import React , {useState, useEffect} from 'react'
import SeatService from '../../Service/SeatService';
import { Link } from 'react-router-dom'
import "./Seat.css";
import { ClipLoader } from 'react-spinners';

function Seat() {


    const [seats, setSeats] = useState([])
    const [isLoading, setIsLoading] = useState(true); 


    useEffect(() => {

        getAllSeats();
    }, [])


    const getAllSeats = () => {
        SeatService.getAllSeats().then((response) => {
            setSeats(response.data)
            setTimeout(() => {
                setIsLoading(false); // Turn off loading state for 0.2s
            }, 200);
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
            setIsLoading(false);
        })
    }


    const deleteSeat= (seatId) => {
        SeatService.deleteSeat(seatId).then((response) =>{
            alert(response.data);
            getAllSeats();
 
        }).catch(error =>{
            console.log(error);
        })
         
     }




    return (
        <div className = "Scontainer">
                <h2 className = "text-center"> SEAT INVENTORY </h2>
                <Link to = "/AddSeat" className = "btn btn-primary mb-2" > Add Seat </Link>
                {isLoading ? ( // Display loader while loading
                <div className="loader-spinner">
                    <ClipLoader
                        laoding={isLoading}
                        size ={30}
                        color="blue"
                        />
                </div>
                ):(
                <table className="table table-bordered table-striped">
                    <thead>
                        {/* <th> Seat Id </th> */}
                        {/* <th> Movie Show Id</th> */}
                        <th> Date </th>
                        <th> Start Time </th>
                        <th> End Time</th>
                        <th> Movie</th>
                        <th> Total Seats </th>
                        <th> Available Seats </th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            seats.map(
                                seat =>
                                <tr key = {seat.seatId}> 
                                    {/* <td> {seat.seatId}</td> */}
                                    {/* <td> {seat.movieShow.movieShowId} </td> */}
                                    <td>{seat.movieShow.date}</td>
                                    <td>{seat.movieShow.startTime}</td>
                                    <td>{seat.movieShow.endTime}</td>
                                    <td>{seat.movieShow.movie.name.charAt(0).toUpperCase() + seat.movieShow.movie.name.slice(1)}</td>
                                    <td> {seat.totalSeat} </td>
                                    <td> {seat.availableSeat} </td>
                                    <td>
                                        <Link className="btn btn-info" to={`/EditSeat/${seat.seatId}`} >Update</Link>
                                        <button className = "btn btn-danger" onClick = {() => deleteSeat(seat.seatId)}
                                        style = {{marginLeft:"10px"}}> Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                )}
            </div>
    ) 
}

export default Seat
