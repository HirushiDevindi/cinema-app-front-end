import React , {useState,useEffect, useMemo} from 'react'
import {Form, Input, Typography, Button, Select} from 'antd';
import SeatService from '../../Service/SeatService'
import {Link,useNavigate, useParams } from 'react-router-dom';
import './Seat.css';
import MovieShowService from '../../Service/MovieShowService';

const { Option } = Select;


function AddSeat() {
    // const [totalSeat,setTotalSeats] = useState(null)
    // const [availableSeat,setAvailableSeats] = useState(null)
    // const [movieShowId, setMovieShowId] = useState(null)

    const [form] = Form.useForm(); 

    const {seatId} = useParams();
    

    const navigate = useNavigate();
    const [movieShow, setMovieShows] = useState([]);

    const [selectedMovieShowId, setSelectedMovieShowId] = useState(null);

    useEffect(() => {
        // Fetch the list of movies from your database and set it in the state.
        MovieShowService.getAllMovieShow()
          .then((response) => {
            setMovieShows(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    const saveOrUpdateSeat = () => {
        // e.preventDefault();

        

        // const values = {totalSeat,availableSeat,movieShowId}

        

        // console.log('totalSeats:', totalSeat);
        // console.log('availbleSeats:', availableSeat);
        // console.log('movieShowId:', movieShowId);

        // const seat = {
        //     totalSeat: parseInt(totalSeat), // Ensure it's a number
        //     availableSeat: parseInt(availableSeat), // Ensure it's a number
        //     movieShowId: parseInt(movieShowId) // Ensure it's a number
        // };

        // console.log('totalSeats:', totalSeat);
        // console.log('availbleSeats:', availableSeat);
        // console.log('movieShowId:', movieShowId);

        

        form
            .validateFields()
            .then((values) => {
            // If you want to access the movieShowId, you can do it like this:
            // const { movieShowId, totalSeat, availableSeat } = values;
            const {totalSeat, availableSeat } = values;

            // if (!totalSeat || !availableSeat || !movieShowId ) {
            //     alert("Please fill out all fields.");
            //     return;
            //   }
              if (!totalSeat || !availableSeat || !selectedMovieShowId ) {
                alert("Please fill out all fields.");
                return;
              }


        if(seatId){
            SeatService.updateSeat(seatId, {
                totalSeat: parseInt(totalSeat),
                availableSeat: parseInt(availableSeat),
                // movieShowId: parseInt(movieShowId),
                movieShowId: parseInt(selectedMovieShowId),
              }).then((response) => {
                console.log(response.data);
                if(response.data.message==="Movie show is already added"){
                    alert("Movie show is already added. Select another movie show");

                }else if(response.data.message==="Movie show is already showed"){
                    alert("Movie show is already showed. Select another movie show");
                    
                }else if(response.data.message==="Enter a valid number for total seats"){
                    alert("Enter a valid number for total seats");

                }else if(response.data.message==="Enter a valid number for available seats"){
                    alert("Enter a valid number for available seats");

                }else if(response.data.message==="Available seats number cannot exceed the total number of seats"){
                    alert("Available seats number cannot exceed the total number of seats");

                }else if(response.data.message==="Seat entry is updated successfully"){
                    alert("Seat entry is updated successfully");
                    navigate("/Seat");
                }
                //navigate("/Seat");
                // history.push('/employees')
            }).catch(error => {
                console.log(error);
                
            })

        }else{
            SeatService.addSeat({
                totalSeat: parseInt(totalSeat),
                availableSeat: parseInt(availableSeat),
                // movieShowId: parseInt(movieShowId),
                movieShowId: parseInt(selectedMovieShowId),
              }).then((response)=>{
                console.log(response.data);
                if(response.data.message==="Movie show is already added"){
                    alert("Movie show is already added. Select another movie show");

                }else if(response.data.message==="Movie show is already showed"){
                    alert("Movie show is already showed. Select another movie show");

                }else if(response.data.message==="Enter a valid number for total seats"){
                    alert("Enter a valid number for total seats");

                }else if(response.data.message==="Enter a valid number for available seats"){
                    alert("Enter a valid number for available seats");

                }else if(response.data.message==="Available seats number cannot exceed the total number of seats"){
                    alert("Available seats number cannot exceed the total number of seats");

                }else if(response.data.message==="Seat entry is added successfully"){
                    alert("Seat entry is added successfully");
                    navigate("/Seat");
                }
                //navigate("/Seat");
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

        if(seatId){

        SeatService.getSeatById(seatId).then((response) =>{

            const { totalSeat, availableSeat } = response.data;
            const movieShowId = response.data.movieShow.movieShowId;
            form.setFieldsValue({ totalSeat, availableSeat, movieShowId});
            setSelectedMovieShowId(movieShowId);
            // setTotalSeats(response.data.totalSeat)
            // setAvailableSeats(response.data.availableSeat)
            // setMovieShowId(response.data.movieShow.movieShowId)


            console.log('Fetched seat data:', response.data);
            console.log(totalSeat);
            
        }).catch(error => {
            console.log(error)
        })
    }
    }, [form,seatId])


    // Render the list of movies show in the dropdown menu.
        const movieShowOptions = useMemo(() => {
            return movieShow.map((movieShow) => (
            <Option key={movieShow.movieShowId} value={movieShow.movieShowId}>
                {/* {movieShow.movieShowId} */}
                {/* {`${movieShow.movieShowId}  (${movieShow.date}) ${movieShow.startTime} ${movieShow.endTime} - ${movieShow.movie.movieId} - ${movieShow.movie.name}`} */}
                {` (${movieShow.date}) ${movieShow.startTime} - ${movieShow.endTime} - ${movieShow.movie.name}`}
            </Option>
            ));
        }, [movieShow]);


    const title = () => {

        if(seatId){
            return <h2 className = "text-center">Update Seat</h2>
        }else{
            return <h2 className = "text-center">Add Seat</h2>
        }
    }


    return (
        <div className = "AddSeat2">
                            <Form className='addform' labelCol={{span:10}} 
                                form={form} onFinish={saveOrUpdateSeat}>
                            <Typography.Title>
                                {
                                    title()
                                }
                            </Typography.Title>
                            <Form.Item name = "totalSeat"  label="Total Seats"
                                    // initialValue= {totalSeat }
                                     rules={[
                                        {
                                            required:true,
                                            message: 'Please enter the number of total seats',
                                        },
                                        ]}>
                                    
                                    <Input
                                        type = "number"
                                        placeholder = "number of total seats"
                                        // value = {totalSeat}
                                        // onChange = {(e) => setTotalSeats(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item  name = "availableSeat" label="Available Seats" 
                                    // initialValue={availableSeat }
                                    rules={[
                                        {required:true,
                                        message: 'Please enter the number of available seats',}
                                        ]}>
                                    
                                    <Input
                                        type = "number"
                                        placeholder = "number of available seats"
                                        // value = {availableSeat}
                                        // onChange = {(e) => setAvailableSeats(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item  name = "movieShowId" label="Movie Show" 
                                    // initialValue={movieShowId }
                                    rules={[
                                        {required:true,
                                        message: 'Please select the movie show',
                                        },
                                        ]}>
                                    
                                    {/* <Input
                                        type = "text"
                                        placeholder = "movie show id"
                                        // value = {movieShowId}
                                        // onChange = {(e) => setMovieShowId(e.target.value)}
                                    >
                                    </Input> */}
                                    {/* <Select placeholder="Select a movie show ID">{movieShowOptions}</Select> */}
                                    <Select placeholder="Select a movie show" onChange={(value) => setSelectedMovieShowId(value)} // Update selected movie show ID
                                            value={selectedMovieShowId}>{movieShowOptions}</Select>
                                </Form.Item>
                                

                                
                                <Form.Item>
                                    <Button className = "btn btn-success" type="primary" htmlType="submit"
                                    /*onClick = {(e) => saveOrUpdateSeat(e)}*/ >Submit</Button>
                                </Form.Item>


                                <Form.Item>
                                    <Link to="/Seat" className="btn btn-danger"> Cancel </Link>
                                </Form.Item>
                            </Form>

                        </div>
                
                

        
  );
}

export default AddSeat
