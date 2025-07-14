import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components"
import loader from '../assets/loader.gif'
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import { setAvatarRoute } from '../APIRoutes';
import { Buffer } from 'buffer';
// import { log } from 'console';

function SetAvatar() {

    const api = 'https://api.dicebear.com/7.x/pixel-art/svg?seed=';
    const navigate=useNavigate();
    const [avatars,setAvatar] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);

   
    
    




    const toastOptions = {
        position:'bottom-right',
        theme:"dark",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true
       }
       useEffect(()=>{
      
        
        if(!localStorage.getItem("chat-app-user")){
            navigate('/login');
        }
        
              },[])


              const setProfilePicture = async () => {
                if (selectedAvatar === undefined) {
                  toast.error("Please select an avatar", toastOptions);
                } else {
                  const user = await JSON.parse(localStorage.getItem("chat-app-user"));
              
                  // Log avatar data before sending it
                  // console.log('Selected Avatar Image:', avatars[selectedAvatar]);
              
                  try {
                    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                      image: avatars[selectedAvatar],
                    });
              
                    // Log the response data
                    console.log('Response from server:', data);
              
                    if (data.isSet) {
                      user.isAvatarImageSet = true;
                      user.avatarImage = data.image;
                      localStorage.setItem("chat-app-user", JSON.stringify(user));
                      navigate("/");
                    } else {
                      toast.error("Error setting avatar. Please try again", toastOptions);
                    }
                  } catch (error) {
                    console.error('Error in setting avatar:', error);
                    toast.error("There was an error setting your avatar", toastOptions);
                  }
                }
              };
              



    useEffect(()=>{
        // console.log(avatars);
        
        async function fetchData() {
            const data = [];
            for(let i=0;i<4;i++){
                const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}.svg`,{responseType:"text"})
                data.push(btoa(unescape(encodeURIComponent(image.data))));
            }
            setAvatar(data);
            setIsLoading(false);
        }
        fetchData();
    },[])
    
  return (
    <>
    {
        isLoading?<Container>
            <img src={loader} alt="loader" className='loader'/>
        </Container>:
    (<Container>
       <div className="title-container">
        <h1>
            Pick an avatar for your profile picture
        </h1>
       </div>
       <div className="avatars">
        {
            avatars.map((avatar,index)=>{
                return(
                    <div className={`avatar ${selectedAvatar==index?"selected":""}`} key={index}>
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)}  />
                    </div>
                )
            })

          }
          

       </div>
       <button className='submitBtn' onClick={setProfilePicture}>Set as Profile Picture</button>
       <div className='linkToDp'><Link to="/upload">Do you want to select your own image as avatar?</Link></div>
    </Container>
)}
    <ToastContainer/>
    </>
  )
}

export default SetAvatar

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-color:#131324;
height:100vh;
width:100vw;
.loader{
    max-inline-size:100%;
}
.title-container{
    h1{
        color:white;
}
}
.avatars{
    display:flex;
gap:2rem;
.avatar{
    border:0.4rem solid transparent;
    padding:0.4rem;
    border-radius:5rem;
display:flex;
margin-top:0.5rem;
margin-bottom:0.5rem;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
img{
    height:6rem;
    width:6rem;
    border-radius:50%;
    padding:0.2rem;
}
}
.selected{
    border:0.4rem solid #4e0eff;
}
}
.submitBtn{
background-color:#997af0;
color:white;
padding:1rem 2rem;
border:none;
font-weight:bold;
cursor:pointer;
border-radius:0.4rem;
font-size:1rem;
text-transform:uppercase;
transition: 0.5s ease-in-out;
&:hover{
background-color:#4e0eff;
}
}
.linkToDp{
  margin-top: 20px;
  font-size: 1.2rem;
  color: #4e0eff;
}
`