import React, {useState} from "react";
import { Form, Button, Input,Typography, Divider } from "antd";
import { useNavigate, Link} from "react-router-dom";
import axios from "axios";
import"./SignIn.css";
import { setUserDataToLocalStorage } from "../Utils/LocalStorage";
import { setPasswordToLocalStorage } from "../Utils/LocalStorage";


function SignIn(){

    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    async function signin(event){
        event.preventDefault();
    try{
        const response = await axios.post("http://localhost:8000/api/user/signin",{
            username:username,
            password:password
        });

        const message = response.data;

                if(message.message==="Login Failed"){
                    alert("Login Failed");
                    navigate("/");
                }else if(message.message==="Password Not Match"){
                    alert("Password Not Match");
                    navigate("/");
                }else if(message.message==="Login Success"){
                    alert("User Login Success");
                    setUserDataToLocalStorage(message.user);
                    setPasswordToLocalStorage(password);
                    navigate("/Home2");
                }else if(message.message==="Username Not exits"){
                    alert("Username Not exits");
                    navigate("/");
                }

    }catch(error){
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
    }
}





    return(
        <div className="SignIn">
            <Form className="loginform" onFinish={signin} abelCol={{span:10}} autoCapitalize='off'>
            <Typography.Title>Welcome Back !</Typography.Title> 



            <Form.Item name="username" label="Username" 
                    rules={[
                        {required:true},
                        {whitespace:true},
                        {message:"Please enter your username"},
                        ]}
                        //hasFeedback
            >
                    <Input placeholder='Enetr your Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>


            <Form.Item name="password" label="Password" 
                    rules={[
                        {required:true},
                        {whitespace:true},
                        {message:"Please enter your password"},
                        
                        ]}
                        //hasFeedback
            >
                    <Input.Password placeholder='Enter your password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>

            <Button type="primary" htmlType="submit" onClick={signin} >
                                        Sign In
            </Button>

            <Divider style={{borderColor:"black"}}>Don't have an account ?</Divider>

            <Form.Item>
            <nav className="navi">
                    <div className="navi-box">
                        <div className="navi-links">
                            {/* <Link to="/SignUp">Sign Up</Link> */}
                            <Link to="/SignUp">Sign Up
                                {/* <Button type="default">Go to Sign Up</Button> */}
                            </Link>
                            
                        </div>
                    </div>
            </nav>
            </Form.Item>





            </Form>
        </div>
    )
}
export default SignIn;