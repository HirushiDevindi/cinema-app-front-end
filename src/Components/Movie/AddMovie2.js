import React, {useState, useEffect} from 'react';
import MovieService from '../../Service/MovieService';
import {Link,useNavigate, useParams } from 'react-router-dom';
//import DatePicker from 'react-datepicker';
import {Form, Input, Typography, Button, Select} from 'antd';
import './Movie.css';
//import { Modal } from 'antd';
//import { Alert } from 'antd';
const { Option } = Select;




 
function AddMovie2() {

    // const [name,setName] = useState("")
    // const [language,setLanguage] = useState("")
    // const [country, setCountry] = useState("")
    // const [movieDuration, setMovieDuration] = useState("")
    //const [releaseDate, setReleaseDate] = useState(new Date())
    //const [releaseDate, setReleaseDate] = useState("")

    const [form] = Form.useForm();
    

    //const history = useHistory();

    const {movieId} = useParams();
    const navigate = useNavigate();

    
    // const [errorMessage, setErrorMessage] = useState('');





    const saveOrUpdateMovie = () => {
        // e.preventDefault();
        //const movie = {name,language,country,movieDuration,releaseDate}

        form
            .validateFields()
            .then((values)=> {
                const {name,language,country,movieDuration,releaseDate} = values;
            
        
            if(!name || !language || !country || !movieDuration || !releaseDate){
                alert("Please fill out all fields.");
                return;
            }

        if(movieId){
            MovieService.updateMovie(movieId, {
                name:name,
                language:language,
                country:country,
                movieDuration:movieDuration,
                releaseDate:releaseDate
            }).then((response) => {
                console.log(response.data);
                if(response.data.message==="Movie with the same name already exists."){
                    alert("Movie with the same name already exists.");

                }else if(response.data.message==="Movie is updated Successfully"){
                    alert("Movie is updated Successfully");
                    navigate("/Movie");
                }
                
                // history.push('/employees')
            }).catch((error) => {
                console.log(error)
                // if (error.response && error.response.data) {
                //     // Check if the error message contains "Movie with the same name already exists."
                //     if (error.response.data.includes("Movie with the same name already exists.") || error.response.data.movieId===0) {
                //         //alert("Movie with the same name already exists.");
                //         setErrorMessage("Movie with the same name already exists.");
                        
                //     } else {
                //         alert("An error occurred while submitting the form.");
                        
                //     }
                // } else {
                //     alert("An error occurred while submitting the form.");
                    
                // }
            });

        }else{
            MovieService.addMovie({
                name:name,
                language:language,
                country:country,
                movieDuration:movieDuration,
                releaseDate:releaseDate
            }).then((response)=>{
                console.log(response.data);
                if(response.data.message==="Movie with the same name already exists."){
                    alert("Movie with the same name already exists.");

                }else if(response.data.message==="Movie is entered Successfully"){
                    alert("Movie is entered Successfully");
                    navigate("/Movie");
                }
                
                //history.push('/Movie');
                
            }).catch((error) => {
                console.log(error);
                // if (error.response && error.response.data) {
                //     // Check if the error message contains "Movie with the same name already exists."
                //     if (error.response.data.includes("Movie with the same name already exists.") || error.response.data.movieId===0) {
                //         //alert("Movie with the same name already exists.");
                //         setErrorMessage("Movie with the same name already exists.");
                       
                //     } else {
                //         alert("An error occurred while submitting the form.");
                        
                //     }
                // } else {
                //     alert("An error occurred while submitting the form.");
                    
                // }
            });

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

        if(movieId){
            MovieService.getMovieById(movieId).then((response) =>{
                const name = response.data.name;
                const language = response.data.language;
                const country = response.data.country;
                const movieDuration = response.data.movieDuration;
                const releaseDate = response.data.releaseDate;

                //const {name,language,country,movieDuration,releaseDate} = response.data;
                form.setFieldsValue({name,language,country,movieDuration,releaseDate});
                // setName(response.data.name)
                // setLanguage(response.data.language)
                // setCountry(response.data.country)
                // setMovieDuration(response.data.movieDuration)
                // setReleaseDate(response.data.releaseDate)
                //setReleaseDate(response.data.releaseDate ? new Date(response.data.releaseDate) : null); // Convert to Date object
            }).catch(error => {
                console.log(error)
            })
        }
    }, [form,movieId])

    const title = () => {

        if(movieId){
            return <h2 className = "text-center">Update Movie</h2>
        }else{
            return <h2 className = "text-center">Add Movie</h2>
        }
    }

   


    return (
       
                    <div className="AddMovie2">
                       <Form className='addform' labelCol={{span:10}} 
                                form={form} onFinish={saveOrUpdateMovie}>
                            <Typography.Title>
                                {
                                    title()
                                }
                            </Typography.Title>
                       
                        
                                <Form.Item name="name" label="Movie Name" 
                                    rules={[
                                        {
                                            required:true,
                                            whitespace:true,
                                            message: 'Please enter the movie name',
                                        },
                                        ]}>
                                    
                                    <Input
                                        type = "text"
                                        placeholder = "Enter the name of the movie"
                                        // value = {name}
                                        // onChange = {(e) => setName(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item name = "language" label="Language"
                                    rules={[
                                        {
                                            required:true,
                                            whitespace:true,
                                            message: 'Please enter the language',
                                        },
                                        ]}>
                                   
                                    <Input
                                        type = "text"
                                        placeholder = "Enter Language"
                                        // value = {language}
                                        // onChange = {(e) => setLanguage(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item name = "country" label="Country"
                                    rules={[
                                        {
                                            required:true,
                                            whitespace:true,
                                            message: 'Please enter the country',
                                        },
                                        ]}>
                                    
                                    <Input
                                        type = "text"
                                        placeholder = "Enter the country"
                                        // value = {country}
                                        // onChange = {(e) => setCountry(e.target.value)}
                                    >
                                    </Input>
                                </Form.Item>

                                <Form.Item name = "movieDuration" label="Duration"
                                    rules={[
                                        {
                                            required:true,
                                            whitespace:true,
                                            message: 'Please enter the duration',
                                        },
                                        ]}>
                                    
                                    {/* <Input
                                        type = "text"
                                        placeholder = "Enter the Duration"
                                        // value = {movieDuration}
                                        // onChange = {(e) => setMovieDuration(e.target.value)}
                                    >
                                    </Input> */}
                                    <Select
                                        placeholder="Select the Duration"
                                        // value={movieDuration}
                                        // onChange={(value) => setMovieDuration(value)}
                                    >
                                        <Option value="1h">1 hour</Option>
                                        <Option value="2h">2 hours</Option>
                                        <Option value="3h">3 hours</Option>
                                        <Option value="4h">4 hours</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name = "releaseDate" label="Released Date"
                                    rules={[
                                        {
                                            required:true,
                                            whitespace:true,
                                            message: 'Please enter the released date',
                                        },
                                        ]}>
                                    <Input
                                        // type = "text"
                                        type = "date"
                                        placeholder = "Enter the released date"
                                        // value={releaseDate} 
                                        // onChange={(e) => setReleaseDate(new Date(e.target.value))}
                                        // value = {releaseDate}
                                        // onChange = {(e) => setReleaseDate(e.target.value)}
                                    >
                                    </Input>
                                    {/* <DatePicker
                                            selected={releaseDate} // Set the selected date
                                            onChange={(date) => setReleaseDate(date)} // Handle date changes
                                            dateFormat="yyyy-MM-dd" // Specify the date format
                                            placeholderText="Select a date" // Placeholder text when no date is selected
                  /> */}
                                </Form.Item>

                                 <Form.Item>
                                    <Button className = "btn btn-success" type="primary" htmlType="submit"
                                        /*onClick = {(e) => saveOrUpdateMovie(e)}*/ >Submit </Button>
                                 </Form.Item>
                                 
                                 <Form.Item>
                                    <Link to="/Movie" className="btn btn-danger"> Cancel </Link>
                                </Form.Item>
                            </Form>

                            {/* {errorMessage && (
                                        <Alert
                                            message="Error"
                                            description={errorMessage}
                                            type="error"
                                            showIcon
                                            closable
                                            onClose={() => setErrorMessage('')}
                                        />
                                    )} */}


                        </div>
                        
                    
                

           

        
  )
}

export default AddMovie2;
