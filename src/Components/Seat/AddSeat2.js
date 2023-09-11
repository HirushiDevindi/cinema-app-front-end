import React , {useState,useEffect} from 'react'
import SeatService from '../../Service/SeatService'
import {Link,useNavigate, useParams } from 'react-router-dom';
import {Form, Input, Typography, Button} from 'antd';
import './Seat.css';

function AddSeat2() {
    const [totalSeat,setTotalSeats] = useState("")
    const [availableSeat,setAvailableSeats] = useState("")
    const [movieShowId, setMovieShowId] = useState("")

    const {seatId} = useParams();
    

    const navigate = useNavigate();

    const saveOrUpdateSeat = (e) => {
        e.preventDefault();

        

        //const seat = {totalSeat,availableSeat,movieShowId}
        if (!totalSeat || !availableSeat || !movieShowId ) {
            alert("Please fill out all fields.");
            return;
          }
        
        

        console.log('totalSeats:', totalSeat);
        console.log('availbleSeats:', availableSeat);
        console.log('movieShowId:', movieShowId);

        const seat = {
            totalSeat: parseInt(totalSeat), // Ensure it's a number
            availableSeat: parseInt(availableSeat), // Ensure it's a number
            movieShowId: parseInt(movieShowId) // Ensure it's a number
        };

        console.log('totalSeats:', totalSeat);
        console.log('availbleSeats:', availableSeat);
        console.log('movieShowId:', movieShowId);


        if(seatId){
            SeatService.updateSeat(seatId, seat).then((response) => {
                console.log(response.data);
                navigate("/Seat");
                // history.push('/employees')
            }).catch(error => {
                console.log(error)
            })

        }else{
            SeatService.addSeat(seat).then((response)=>{
                console.log(response.data);
                navigate("/Seat");
                //history.push('/Movie');
                
            }).catch(error => {
                console.log(error);
            })

        }

        
    }

    useEffect(() => {

        SeatService.getSeatById(seatId).then((response) =>{
            setTotalSeats(response.data.totalSeat)
            setAvailableSeats(response.data.availableSeat)
            setMovieShowId(response.data.movieShow.movieShowId)
            
        }).catch(error => {
            console.log(error)
        })
    }, [])


    const title = () => {

        if(seatId){
            return <h2 className = "text-center">Update Seat</h2>
        }else{
            return <h2 className = "text-center">Add Seat</h2>
        }
    }


    return (
                        <div className = "AddSeat2">
                            <Form className='addform' labelCol={{span:10}}>
                            <Typography.Title>
                                {
                                    title()
                                }
                            </Typography.Title>
                            <Form.Item name = "totalSeat"  label="Total Seats"
                                     rules={[
                                        {
                                            required:true,
                                            message: 'Please enter the number of total seats',
                                        },
                                        ]}>
                                    
                                    <Input
                                        type = "number"
                                        placeholder = "number of total seats"
                                        value = {totalSeat}
                                        onChange = {(e) => setTotalSeats(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item  name = "availableSeat" label="Available Seats" 
                                    rules={[
                                        {required:true,
                                        message: 'Please enter the number of available seats',}
                                        ]}>
                                    
                                    <Input
                                        type = "number"
                                        placeholder = "number of available seats"
                                        value = {availableSeat}
                                        onChange = {(e) => setAvailableSeats(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item  name = "movieShowId" label="Movie Show Id" 
                                    rules={[
                                        {required:true,
                                        message: 'Please enter the movie show id',
                                        },
                                        ]}>
                                    
                                    <Input
                                        type = "text"
                                        placeholder = "movie show id"
                                        value = {movieShowId}
                                        onChange = {(e) => setMovieShowId(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>
                                

                                
                                <Form.Item>
                                    <Button className = "btn btn-success" type="primary" htmlType="submit"
                                    onClick = {(e) => saveOrUpdateSeat(e)} >Submit</Button>
                                </Form.Item>


                                <Form.Item>
                                    <Link to="/Seat" className="btn btn-danger"> Cancel </Link>
                                </Form.Item>
                            </Form>

                        </div>
                
                

           

        
  )
}

export default AddSeat2
