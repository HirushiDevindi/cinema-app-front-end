import React,  {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import MovieService from '../../Service/MovieService'
import './Movie.css'
import { ClipLoader } from 'react-spinners'


const Movie = () => {

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {

        getAllMovies();
    }, [])


    const getAllMovies = () => {
        MovieService.getAllMovies().then((response) => {
            setMovies(response.data)
            setTimeout(() => {
                setIsLoading(false); // Turn off loading state after data is loaded
            }, 200);
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
            setIsLoading(false);
        })
    }


    const deleteMovie = (movieId) => {
        
        MovieService.deleteMovie(movieId).then((response) =>{
            alert(response.data);
            getAllMovies();
 
        }).catch(error =>{
            console.log(error);
            
        })
         
     }


    return (
        <div className = "Mcontainer">
                <h2 className = "text-center"> MOVIES </h2>
                <Link to = "/AddMovie2" className = "btn btn-primary mb-2" > Add Movie </Link>
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
                        {/* <th> Movie Id </th> */}
                        <th> Movie Name </th>
                        <th> Language </th>
                        <th> Country</th>
                        <th> Movie Duration </th>
                        <th> Released Date </th>
                        <th> Actions</th>
                    </thead>
                    <tbody>
                        {
                            movies.map(
                                movie =>
                                <tr key = {movie.movieId}> 
                                    {/* <td> {movie.movieId} </td> */}
                                    {/* <td> {movie.name} </td> */}
                                    <td>{movie.name.charAt(0).toUpperCase() + movie.name.slice(1)} </td>
                                    <td> {movie.language} </td>
                                    <td>{movie.country}</td>
                                    <td>{movie.movieDuration}</td>
                                    <td>{movie.releaseDate}</td>
                                    <td>
                                        <Link className="btn btn-info" to={`/EditMovie/${movie.movieId}`} >Update</Link>
                                        <button className = "btn btn-danger" onClick = {() => deleteMovie(movie.movieId)}
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

export default Movie;
