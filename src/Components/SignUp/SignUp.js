import React, { useState } from 'react';
import{Form, Button,Input,Select, Typography, Divider} from 'antd';
//import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
//import { useDispatch ,useSelector} from "react-redux";
//npm inimport UserService from './Service/UserService';
import "./SignUp.css";


function SignUp(){

    const [form] = Form.useForm();

    


    const[username, setUsername] = useState("");
    const [confirmPassword, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");



    // const { isSignIn, signInError } = useSelector((state) => state.user)

    //  const dispatch = useDispatch();
     const navigate = useNavigate();


    async function signup(event){
        //event.preventDefault();

        try {
            const values = await form.validateFields(); // This will trigger form validation
            // If validation passes, you can proceed with your API call
            // ...
           

        if (!firstName || !lastName || !email || !username || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
          }
        
        try{
            const response = await axios.post("http://localhost:8000/api/user/signup", {
                firstName: firstName,
                lastName:lastName,
                email:email,
                username:username,
                password:confirmPassword

            });
                const message = response.data;

                if(message==="Username is already taken!"){
                    alert("Username is already taken!");
                    navigate("/");
                }else if(message==="Email is already taken!"){
                    alert("Email is already taken!");
                    navigate("/");
                }else if(message==="User registered successfully"){
                    alert("You are registered successfully");
                    navigate("/SignIn");
    
                }
            
        
            // ;
            // alert("Registrtion is successed");
            // setUsername("");
            // setPassword("");
            // setEmail("");
            // setFirstName("");
            // setLastName("");
        }catch(error){
            //alert(e);
            if (error.response) {
                // The error.response.data will contain the response message
                const errorMessage = error.response.data;
                alert(errorMessage);
                navigate("/");
            } else {
                alert("An error occurred while processing your request.");
                navigate("/");
            }
        }finally{
            //Reset form fields
            setUsername("");
            setPassword("");
            setEmail("");
            setFirstName("");
            setLastName("");
        }
    }catch (errorInfo) {
        // Validation failed, error messages will be displayed near the form fields
        console.error('Validation Failed:', errorInfo);
      }
    }
    
    


    return(
        <div className="SignUp">
            <Form className='loginform' form={form}  onFinish={signup} labelCol={{span:10}} autoCapitalize='off'>
                <Typography.Title>WELCOME</Typography.Title>


                <Form.Item name="firstName" label="First Name" 
                    rules={[
                        {required:true},
                        { whitespace:true},
                        ]}
                        hasFeedback
                > 
                    <Input placeholder='Enter your first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>



                <Form.Item name="lastName" label="Last Name" 
                        rules={[
                            {required:true},
                            {whitespace:true},
                            ]}
                            hasFeedback
                >
                    <Input placeholder='Enter your last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>




                <Form.Item 
                    name="email" 
                    label="Email" 
                    rules={[
                        {
                            required:true,
                            type:"email",
                            message:"Please enter a valid email"
                        },
                        ]}
                        hasFeedback
                >
                    <Input placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>





                <Form.Item name="username" label="Username" 
                    rules={[
                        {required:true},
                        {whitespace:true},
                        ]}
                        hasFeedback
                >
                    <Input placeholder='Enetr a User name' value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>




                <Form.Item name="password" label="Password" 
                    rules={[
                        {required:true, message: 'Please enter a password'},
                        {whitespace:true, message: 'Password cannot contain whitespace'},
                        {min:3, message: 'Password must be at least 3 characters long'},
                        {
                            validator:(_,value)=>{
                                if (!value) {
                                    return Promise.reject('Please enter a password');
                                  }
                                  if (!/[A-Z]/.test(value)) {
                                    return Promise.reject('Password must contain at least one capital letter');
                                  }
                                  return Promise.resolve();
                                },
                            },
                            //value && value.includes('A') ? Promise.resolve():Promise.reject('Password doesnot match the criteria')
                        
                        ]}
                        hasFeedback
                >
                    <Input.Password placeholder='Enter a password' />
                </Form.Item>





                <Form.Item name="confirmPassword" label="Confirm Password" 
                    dependencies={["password"]}
                    rules={[
                        {required:true},
                        {whitespace:true},
                        ({getFieldValue})=>({
                            validator(_,value){
                                if(!value || getFieldValue('password')=== value){
                                    return Promise.resolve()
                                }
                                return Promise.reject('The two password that you entered does not match.');
                            }
                        }),
                        ]}
                        hasFeedback
                >
                    <Input.Password placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>






                <Form.Item >
                    <Button type="primary" htmlType="submit" 
                    // onClick={signup}
                     >
                                        Sign Up
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default SignUp;