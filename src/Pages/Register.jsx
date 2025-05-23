import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import { registerRoute } from '../APIRoutes';
function Register() {
const navigate = useNavigate();
const [values, setValues] = useState({
  username:"",
  email:"",
  password:"",
  confirmPassword:"",
})

const toastOptions = {
  position:'bottom-right',
  theme:"dark",
  autoClose:8000,
  pauseOnHover:true,
  draggable:true
 }
useEffect(()=>{
  if(localStorage.getItem("chat-app-user")){
    navigate("/");
  }
 },[])
  const handleSubmit = async(event)=>{
    event.preventDefault();
   if(handleValidation()){
    const {username,email,password,confirmPassword} = values;
    const {data} = await axios.post(registerRoute,{
      username,
      email,
      password,
      
    })
    console.log(data.status);
    
    if(data.status===false){
      toast.error(data.msg,toastOptions)
    }
    if(data.status===true){
      console.log(data.user);
      
      localStorage.setItem("chat-app-user",JSON.stringify(data.user));
      console.log("User data stored:", JSON.parse(localStorage.getItem("chat-app-user")));
      navigate("/");
    }
   }
  }


  const handleValidation =  ()=>{
    console.log("I am on",registerRoute);
    
    const {username,email,password,confirmPassword} = values;
   if(password!==confirmPassword){
     toast.error("password and confirm password must be same", toastOptions);
     return false;
   }
   else if(username.length<3){
    toast.error("Username should be greater than 3 characters", toastOptions);
    return false;
   }
   else if(password.length<8){
    toast.error("Password should be greater than or equal to 8 characters", toastOptions);
    return false;
   }
   else if(email==""){
    toast.error("Enter a valid email", toastOptions);
   }
   return true;
  }

  const handleChange = (event)=>{
    setValues({...values,[event.target.name]:event.target.value})
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Snappy</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(e )=>handleChange(e)} />
          <input type="email" placeholder='Email' name='email' onChange={(e )=>handleChange(e)} />
          <input type="password" placeholder='Password' name='password' onChange={(e )=>handleChange(e)} />
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e )=>handleChange(e)} />
          <button type='submit'>Create User</button>
          <span>Already have an account?<Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}
const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:#131324;
.brand{
display:flex;
justify-content:center;
align-items:center;
gap:1rem;
img{
height:5rem;
}
h1{
color:white;
text-transform:uppercase;
}
}

form{
display:flex;
flex-direction:column;
gap:2rem;
background-color:#00000076;
border-radius:2rem;
padding: 3rem 5rem;
input{
background-color:transparent;
padding:1rem;
border:0.1rem solid #4e0eff;
border-radius: 0.4rem;
color:white;
width:100%;
font-size: 1rem;
&:focus{
border: 0.1rem solid #997af0;
outlint:none;
} 
}
button{
background-color:#997af0;
color:white;
padding:1rem 2rem;
border:none;
font-weight:bold;
cursor:pointer;
border-radius:0.4rem;
font-szie:1rem;
text-transform:uppercase;
transition: 0.5s ease-in-out;
&:hover{
background-color:#4e0eff;
}
}
span{
color:white;
text-transform:uppercase;
a{
color:#4e0eff;
text-decoration:none;
font-weight:bold;
margin-left:1rem;
}
}
}
`;
export default Register
