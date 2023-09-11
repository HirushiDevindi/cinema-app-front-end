import React, {useState,useEffect} from 'react'
import MovieShowService from '../../Service/MovieShowService';
import { Link } from 'react-router-dom'
import './MovieShow.css'
import { ClipLoader } from 'react-spinners';


function MovieShow() {


    const [movieShow, setMovieShow] = useState([])
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {

        getAllMovieShow();
    }, [])


    const getAllMovieShow = () => {
        MovieShowService.getAllMovieShow().then((response) => {
            setMovieShow(response.data)
            setTimeout(() => {
                setIsLoading(false); // Turn off loading state 
            }, 200);
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
            setIsLoading(false);
        })
    }


    const deleteMovieShow = (movieShowId) => {
        MovieShowService.deleteMovieShow(movieShowId).then((response) =>{
            alert(response.data);
            getAllMovieShow();
 
        }).catch(error =>{
            console.log(error);
        })
         
     }

    return (
    
        <div className = "MScontainer">
                <h2 className = "text-center"> SHOWING MOVIES</h2>
                <Link to = "/AddMovieShow2" className = "btn btn-primary mb-2" > Add Movie Show</Link>
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
                        {/* <th> Movie Show Id </th> */}
                        <th> Date </th>
                        <th> Start Time </th>
                        <th> End Time</th>
                        {/* <th> Movie Id </th> */}
                        <th> Movie Name </th>
                        
                        <th> Actions</th>
                    </thead>
                    <tbody>
                        {
                            movieShow.map(
                                movieShow=>
                                <tr key = {movieShow.movieShowId}> 
                                    {/* <td> {movieShow.movieShowId} </td> */}
                                    <td> {movieShow.date} </td>
                                    <td> {movieShow.startTime} </td>
                                    <td>{movieShow.endTime}</td>
                                    {/* <td>{movieShow.movie.movieId}</td> */}
                                    <td>{movieShow.movie.name.charAt(0).toUpperCase() + movieShow.movie.name.slice(1)}</td>
                                    
                                    <td>
                                        <Link className="btn btn-info" to={`/EditMovieShow/${movieShow.movieShowId}`} >Update</Link>
                                        <button className = "btn btn-danger" onClick = {() => deleteMovieShow(movieShow.movieShowId)}
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

export default MovieShow
