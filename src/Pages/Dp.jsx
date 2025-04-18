import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dpRoute } from "../APIRoutes";
import avatar from "../assets/avatar.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function Dp() {
  const [dp, setDp] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDp(file);
      setPreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
    console.log(file);
  };
  console.log(dp);

  const toastOptions = {
    position: "bottom-right",
    theme: "dark",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);


  

  const handleUpload = async () => {
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    const formData = new FormData();
    formData.append("image", dp); // now this is the actual file
    try {
      const response = await axios.post(`${dpRoute}/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      // Log the response data
      console.log("Response from server:", data);

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    } catch (error) {
      console.error("Error in setting avatar:", error);
      toast.error("There was an error setting your avatar", toastOptions);
    }
  };

  return (
    <>
      <Container>
        <img className="dp" src={preview || avatar} alt="" />
        <input
          className="choose"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button className="submitBtn" onClick={handleUpload}>
          Set as Profile Picture
        </button>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Dp;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .choose {
    padding: 1rem;
    border-radius: 0.4rem;
    border: 1px solid #997af0;
    background-color: #997af0;
    font-family: sans-serif;
    cursor: pointer;
    margin-bottom: 1.4rem;
  }

  .dp {
    margin-bottom: 1.2rem;
    width: 13rem;
    height: 13rem;
  }

  .submitBtn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
