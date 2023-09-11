import React, {useState, useEffect} from 'react';
import MovieService from '../../Service/MovieService';
import {Link,useNavigate, useParams } from 'react-router-dom';
//import DatePicker from 'react-datepicker';


 
function AddMovie() {

    const [name,setName] = useState("")
    const [language,setLanguage] = useState("")
    const [country, setCountry] = useState("")
    const [movieDuration, setMovieDuration] = useState("")
    //const [releaseDate, setReleaseDate] = useState(new Date())
    const [releaseDate, setReleaseDate] = useState("")
    

    //const history = useHistory();

    const {movieId} = useParams();
    const navigate = useNavigate();




    const saveOrUpdateMovie = (e) => {
        e.preventDefault();

        

        const movie = {name,language,country,movieDuration,releaseDate}
        

        if(movieId){
            MovieService.updateMovie(movieId, movie).then((response) => {
                console.log(response.data);
                navigate("/Movie");
                // history.push('/employees')
            }).catch(error => {
                console.log(error)
            })

        }else{
            MovieService.addMovie(movie).then((response)=>{
                console.log(response.data);
                navigate("/Movie");
                //history.push('/Movie');
                
            }).catch(error => {
                console.log(error);
            })

        }

        
    }



    useEffect(() => {

        MovieService.getMovieById(movieId).then((response) =>{
            setName(response.data.name)
            setLanguage(response.data.language)
            setCountry(response.data.country)
            setMovieDuration(response.data.movieDuration)
            setReleaseDate(response.data.releaseDate)
            //setReleaseDate(response.data.releaseDate ? new Date(response.data.releaseDate) : null); // Convert to Date object
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if(movieId){
            return <h2 className = "text-center">Update Movie</h2>
        }else{
            return <h2 className = "text-center">Add Movie</h2>
        }
    }


    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row justify-content-center">
                    <div className = "col-md-6">
                    <div className="card">
                       {
                           title()
                       }
                       
                        <div className = "card-body">
                            <form>
                                <div className = "mb-3">
                                    <label className = "form-label" > Movie Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the name of the movie"
                                        name = "name"
                                        className = "form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "mb-3">
                                    <label className = "form-label"> Language :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Language"
                                        name = "language"
                                        className = "form-control"
                                        value = {language}
                                        onChange = {(e) => setLanguage(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "mb-3">
                                    <label className = "form-label"> Country :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the country"
                                        name = "country"
                                        className = "form-control"
                                        value = {country}
                                        onChange = {(e) => setCountry(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "mb-3">
                                    <label className = "form-label"> Duration :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the Duration"
                                        name = "movieDuration"
                                        className = "form-control"
                                        value = {movieDuration}
                                        onChange = {(e) => setMovieDuration(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "mb-3">
                                    <label className = "form-label"> Released Date :</label>
                                    <input
                                        type = "text"
                                        //type = "date"
                                        placeholder = "Enter the released date"
                                        name = "releaseDate"
                                        className = "form-control"
                                        // value={releaseDate} 
                                        // onChange={(e) => setReleaseDate(new Date(e.target.value))}
                                        value = {releaseDate}
                                        onChange = {(e) => setReleaseDate(e.target.value)}
                                    >
                                    </input>
                                    {/* <DatePicker
                                            selected={releaseDate} // Set the selected date
                                            onChange={(date) => setReleaseDate(date)} // Handle date changes
                                            dateFormat="yyyy-MM-dd" // Specify the date format
                                            placeholderText="Select a date" // Placeholder text when no date is selected
                  /> */}
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateMovie(e)} >Submit </button>
                                <Link to="/Movie" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                        </div>
                    </div>
                </div>

           </div>

        </div>
  )
}

export default AddMovie;
