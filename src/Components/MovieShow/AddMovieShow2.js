import React,{useState, useEffect, useMemo} from 'react'
import MovieShowService from '../../Service/MovieShowService'
import {Link,useNavigate, useParams } from 'react-router-dom';
import {Form, Input, Typography, Button, Select} from 'antd';
import './MovieShow.css';
import MovieService from '../../Service/MovieService';

const { Option } = Select;


function AddMovieShow2() {

    // const [date,setDate] = useState("")
    // const [startTime,setStartTime] = useState("")
    // const [endTime, setEndTime] = useState("")
    // const [movieId, setMovieId] = useState("")
    const [form] = Form.useForm(); 

    const navigate = useNavigate();
    const {movieShowId} = useParams();
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    // Define start times and end times arrays
    const startTimes = ['10:30AM', '12:30PM', '02:30PM', '04:30PM', '06:30PM'];
    const endTimes = ['12:30PM', '02:30PM', '04:30PM', '06:30PM', '08:30PM'];

    useEffect(() => {
        // Fetch the list of movies from your database and set it in the state.
        MovieService.getAllMovies()
          .then((response) => {
            setMovies(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);



    const saveOrUpdateMovieShow = () => {
        //e.preventDefault();
        //const movieShow = {date,startTime,endTime,movieId}

        form
            .validateFields()
            .then((values)=>{
                // const {date,startTime,endTime,movieId} = values;
                const { date, startTime, endTime } = values;

            
                // if (!date || !startTime || !endTime ||!movieId ) {
                //     alert("Please fill out all fields.");
                //     return;
                //   }

                  if (!date || !startTime || !endTime || !selectedMovieId) {
                    alert('Please fill out all fields.');
                    return;
                  }
          

        
        if(movieShowId){
            MovieShowService.updateMovieShow(movieShowId, {
                date:date,
                startTime:startTime,
                endTime:endTime,
                // movieId:movieId
                movieId: selectedMovieId,
            }).then((response) => {
                console.log(response.data);
                if(response.data.message==="Date and time slots are already assigned"){
                    alert("Date and time slots are already assigned");

                }else if(response.data.message==="Cannot edit a movie show with a past date and time."){
                    alert("Cannot edit a movie show with a past date and time.");
                

                }else if(response.data.message==="Movie show is updated Successfully"){
                    alert("Movie show is updated Successfully");
                    navigate("/MovieShow");
                }
                //navigate("/MovieShow");
                // history.push('/employees')
            }).catch(error => {
                console.log(error)
            })

        }else{
            MovieShowService.addMovieShow({
                date:date,
                startTime:startTime,
                endTime:endTime,
                // movieId:movieId
                movieId: selectedMovieId,
            }).then((response)=>{
                console.log(response.data);
                if(response.data.message==="Date and time slots are already assigned"){
                    alert("Date and time slots are already assigned");

                }else if(response.data.message==="Cannot add a movie show with a past date and time."){
                    alert("Cannot add a movie show with a past date and time.");
                

                }else if(response.data.message==="Movie show is entered Successfully"){
                    alert("Movie show is entered Successfully");
                    navigate("/MovieShow");
                }
                //navigate("/MovieShow");
                //history.push('/Movie');
                
            }).catch(error => {
                console.log(error);
            })

        }
    })
    .catch((error) => {
        // Handle the validation error and display a message
        if (error.errorFields && error.errorFields.length > 0) {
            const errorMessage = error.errorFields[0].errors[0];
            alert(errorMessage);
        } else {
            alert("An error occurred while submitting the form.");
        }
    });

        
    }


    useEffect(() => {

        if(movieShowId){
        MovieShowService.getMovieShowById(movieShowId).then((response) =>{
            const date = response.data.date;
            const startTime = response.data.startTime;
            const endTime = response.data.endTime;
            const movieId= response.data.movie.movieId;
            form.setFieldsValue({date,startTime,endTime,movieId});
            setSelectedMovieId(movieId); 
            
        }).catch(error => {
            console.log(error)
        })
    }
    }, [form,movieShowId])


    // Render the list of movies in the dropdown menu.
        const movieOptions = useMemo(() => {
            return movies.map((movie) => (
            <Option key={movie.movieId} value={movie.movieId}>
                {/* {movie.movieId} */}
                {movie.name}
            </Option>
            ));
        }, [movies]);


    const title = () => {

        if(movieShowId){
            return <h2 className = "text-center">Update Movie Show</h2>
        }else{
            return <h2 className = "text-center">Add Movie Show</h2>
        }
    }


  
    return (                 
                        <div className = "AddMovieShow2">
                            <Form className='addform' labelCol={{span:10}} 
                                form={form} onFinish={saveOrUpdateMovieShow}>
                                    <Typography.Title>
                                {
                                    title()
                                }
                            </Typography.Title>
                                <Form.Item name = "date" label="Date" 
                                    rules={[
                                            {
                                                required:true,
                                                message: 'Please enter the date',
                                            },
                                            ]}>
                                    
                                    <Input
                                        type = "date"
                                        placeholder = "Enter the date"
                                        // value = {date}
                                        // onChange = {(e) => setDate(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item name = "startTime" label="Start Time"
                                    rules={[
                                        {
                                            required:true,
                                            message: 'Please enter the start time',
                                        },
                                        ]}>
                                    
                                    {/* <Input
                                        type = "text"
                                        placeholder = "Enter the start time"
                                        // value = {startTime}
                                        // onChange = {(e) => setStartTime(e.target.value)}
                                    >
                                    </Input> */}
                                    <Select placeholder="Select start time">
                                        {startTimes.map((time) => (
                                        <Option key={time} value={time}>
                                            {time}
                                        </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item name = "endTime" label="End Time"
                                    rules={[
                                        {
                                            required:true,
                                            message: 'Please enter the end time',
                                        },
                                        ]}>
                                    
                                    {/* <Input
                                        type = "text"
                                        placeholder = "Enter the end time"
                                        // value = {endTime}
                                        // onChange = {(e) => setEndTime(e.target.value)}
                                    >
                                    </Input> */}
                                    <Select placeholder="Select end time">
                                        {endTimes.map((time) => (
                                        <Option key={time} value={time}>
                                            {time}
                                        </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item name = "movieId" label="Movie Name"
                                    rules={[
                                        {
                                            required:true,
                                            message: 'Please select the movie',
                                        },
                                        ]}>
                                    
                                    {/* <Input
                                        type = "text"
                                        placeholder = "Enter the movie id"
                                        // value = {movieId}
                                        // onChange = {(e) => setMovieId(e.target.value)}
                                    >
                                    </Input> */}
                                    {/* Render the dropdown menu */}
                                    {/* <Select placeholder="Select a movie ID">{movieOptions}</Select> */}
                                    <Select
                                            placeholder="Select a movie"
                                            onChange={(value) => setSelectedMovieId(value)} // Update selected movie ID
                                            value={selectedMovieId}
                                        >
                                            {movieOptions}
                                    </Select>
                                </Form.Item>

                                
                                <Form.Item>
                                    <Button className = "btn btn-success" type="primary" htmlType="submit"
                                    /*onClick = {(e) => saveOrUpdateMovieShow(e)} */>Submit</Button>
                                </Form.Item>
                                <Form.Item>
                                 <Link to="/MovieShow" className="btn btn-danger"> Cancel </Link>
                                </Form.Item>
                            </Form>
                        </div>
        
  );
  
}

export default AddMovieShow2;
