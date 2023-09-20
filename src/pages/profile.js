import "../designs/homemindev.css";
import "../designs/home.css";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthProvided from "../lib/auth";
import AuthCheck from "../components/AuthComp";
import { useQuery } from "@tanstack/react-query";
import { GetData } from "../lib/helper";

export default function Profile() {
  const [toggle2, setToggle2]= useState(false)
  const { userId } = AuthProvided();
  const [fileInput, setFileInput] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    try{
    setFileInput(URL.createObjectURL(e.target.files[0]));
    console.log(fileInput);
    setToggle2(true)
  }catch(e){
    toast(e,{duration:2000,icon:'🎈🎈'})
  }
    
  }
 

  return (
    <div className="cont">
      <Toaster />

      <div className="mainNc">
        <div className="notescont">
          <div className="anotes">
            <h1
              style={{
                display: "flex",
                fontSize: "larger",
                fontSize: "22px",
                justifyContent: "center",
              }}
            >
              PROFILE
            </h1>
            <hr
              style={{ marginBottom: "20px", border: "2px dashed white" }}
            ></hr>
            <div className="profilediv">
            <div className="profileimg_div">
            <div className="profimgborder">
            <img className="aprofileimg" src={toggle2?fileInput:'notebook1.png'} alt="Profile Picture" />
            </div>

            <input
              accept="image/png,image/jpeg"
              onChange={handleChange}
              className="profileFile"
              type="file"
              />

              <label className="toggle2">{fileInput == null ? `Add a` : `Change`} profile Picture</label>

            </div>
            <div className="personalinfo">
              <h3>Personal Information</h3>
              <div className="persdiv">
                <label>Name:</label>
                <input type="text"></input>
              </div>
              <div className="persdiv">
                <label>Email:</label>
                <input type="text"></input>
              </div>
              <div className="persdiv">
                <label>Locked notes password</label>
                <input defaultValue={123343} disabled type="password"></input>
              </div>
              
              
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
