import React,{useState, useEffect} from 'react'
import MovieShowService from '../../Service/MovieShowService'
import {Link,useNavigate, useParams } from 'react-router-dom';


function AddMovieShow() {

    const [date,setDate] = useState("")
    const [startTime,setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [movieId, setMovieId] = useState("")

    const navigate = useNavigate();
    const {movieShowId} = useParams();



    const saveOrUpdateMovieShow = (e) => {
        e.preventDefault();

        

        const movieShow = {date,startTime,endTime,movieId}

        if(movieShowId){
            MovieShowService.updateMovieShow(movieShowId, movieShow).then((response) => {
                console.log(response.data);
                navigate("/MovieShow");
                // history.push('/employees')
            }).catch(error => {
                console.log(error)
            })

        }else{
            MovieShowService.addMovieShow(movieShow).then((response)=>{
                console.log(response.data);
                navigate("/MovieShow");
                //history.push('/Movie');
                
            }).catch(error => {
                console.log(error);
            })

        }

        
    }


    useEffect(() => {

        MovieShowService.getMovieShowById(movieShowId).then((response) =>{
            setDate(response.data.date)
            setStartTime(response.data.startTime)
            setEndTime(response.data.endTime)
            setMovieId(response.data.movie.movieId)
            
        }).catch(error => {
            console.log(error)
        })
    }, [])



    const title = () => {

        if(movieShowId){
            return <h2 className = "text-center">Update Movie Show</h2>
        }else{
            return <h2 className = "text-center">Add Movie Show</h2>
        }
    }


  
    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                       
                         
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Date:</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the date"
                                        name = "date"
                                        className = "form-control"
                                        value = {date}
                                        onChange = {(e) => setDate(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Start Time :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the start time"
                                        name = "startTime"
                                        className = "form-control"
                                        value = {startTime}
                                        onChange = {(e) => setStartTime(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> End Time :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the end time"
                                        name = "endTime"
                                        className = "form-control"
                                        value = {endTime}
                                        onChange = {(e) => setEndTime(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Movie Id :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the movie id"
                                        name = "movieId"
                                        className = "form-control"
                                        value = {movieId}
                                        onChange = {(e) => setMovieId(e.target.value)}
                                    >
                                    </input>
                                </div>

                                

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateMovieShow(e)} >Submit</button>
                                <Link to="/MovieShow" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
  )
  
}

export default AddMovieShow
