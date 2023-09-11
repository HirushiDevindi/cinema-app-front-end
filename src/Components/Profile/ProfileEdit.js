import React, { useState } from 'react';
import{Form, Button,Input,Select, Typography, Divider} from 'antd';
//import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
//import { useDispatch ,useSelector} from "react-redux";
//npm inimport UserService from './Service/UserService';
import "./ProfileEdit.css";
import { getUserDataFromLocalStorage } from "../Utils/LocalStorage";
import { setUserDataToLocalStorage } from "../Utils/LocalStorage";


import { getPasswordFromLocalStorage } from '../Utils/LocalStorage';



function ProfileEdit(){

    const userData = getUserDataFromLocalStorage();


    const[username, setUsername] = useState(userData.username);
    const [confirmPassword, setPassword] = useState("");
    const [email, setEmail] = useState(userData.email);
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);



    // const { isSignIn, signInError } = useSelector((state) => state.user)

    //  const dispatch = useDispatch();
     const navigate = useNavigate();


    async function update(event){
        event.preventDefault();
        console.log('User ID:', userData.userId);

        if (!firstName || !lastName || !email || !username || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
          }
        

        try{
                const response = await axios.put(`http://localhost:8000/api/user/${userData.userId}`, {
                firstName: firstName,
                lastName:lastName,
                email:email,
                username:username,
                password:confirmPassword

            }, {
                auth: {
                  username: getUserDataFromLocalStorage().username, 
                  password: getPasswordFromLocalStorage(), 
                },
              });
                const message = response.data;

                if(message.message==="User is updated successfully!."){
                    alert("Your profile is updated succesfully");
                    setUserDataToLocalStorage(message.user);
                    navigate("/SignIn");
    
                }
            
        }catch(error){
            //alert(e);
            if (error.response) {
                
                const errorMessage = error.response.data;
                alert(errorMessage);
                navigate("/Home");
            } else {
                alert("An error occurred while processing your request.");
                navigate("/Home");
            }
        }finally{
            //Reset form fields
            setUsername("");
            setPassword("");
            setEmail("");
            setFirstName("");
            setLastName("");
        }
    }


    return(
        <div className="ProfileEdit">
            <Form className='editform' onFinish={update} labelCol={{span:10}} autoCapitalize='off'>
                <Typography.Title>PROFILE</Typography.Title>


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
                    <Button type="primary" htmlType="submit" onClick={update} >
                                        Update
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default ProfileEdit;