import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute } from '../APIRoutes';
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import ChatContainer from '../Components/ChatContainer';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat] = useState(undefined);
  const [isLoading,setIsLoading] = useState(false);
console.log(contacts);

  // Check if the user is in localStorage and set currentUser
  useEffect(() => {
    console.log(contacts);
    
    const checkUser = async () => {
      const user = localStorage.getItem("chat-app-user");
      console.log("User from localStorage:", user); // Log user from localStorage

      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(user));
        setIsLoading(true);
      }
    };
    checkUser();
  }, [navigate]);

  // Fetch contacts when currentUser is set
  useEffect(() => {
    console.log(contacts);
    
    const fetchContacts = async () => {
      if (currentUser) {
        console.log("Fetching contacts for user:", currentUser._id); // Log currentUser to ensure it's set
        
        if (currentUser.isAvatarImageSet) {
          console.log("I am in");
          try {
            console.log(allUsersRoute);
            const { data } = await axios.get(`http://localhost:5000/api/auth/allUsers`);
            console.log("I am in");
            console.log("API response data:", data); // Log the entire API response
            
            if (data?.data) { 
              setContacts(data.data);
              console.log("Contacts have been set:", data.data); // Log contacts after state update
            } else {
              console.error("No contacts data found");
            }
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      } else {
        console.log("currentUser is undefined");
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);
console.log(contacts);
const handleChatChange = (chat)=>{
  setCurrentChat(chat)
}
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {isLoading && currentChat===undefined ?(
          currentUser && <Welcome currentUser={currentUser} />): (<ChatContainer currentUser={currentUser}/>)}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 20% 80%;
    }
  }
`;

export default Chat;
