import "../designs/homemindev.css";
import "../designs/home.css";
import { CgProfile } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthProvided from "../lib/auth";
import AuthCheck from "../components/AuthComp";
import { useQuery } from "@tanstack/react-query";
import { GetData, getName } from "../lib/helper";

export default function Profile() {
  const [yourname, setYourname] = useState("");
  const [toggle2, setToggle2] = useState(false);
  const { userId } = AuthProvided();
  getName(userId)
    .then((userName) => {
      setYourname(userName);
    })
    .catch((error) => {
      console.error("Error fetching name:", error);
    });
  const [fileInput, setFileInput] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    try {
      setFileInput(URL.createObjectURL(e.target.files[0]));
      console.log(fileInput);
      setToggle2(true);
    } catch (e) {
      toast(e, { duration: 2000, icon: "🎈🎈" });
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
              <CgProfile className="profileIcon" />
            </h1>
            <hr className="cnhr"></hr>
            <div className="profilediv">
              <div className="profileimg_div">
                <div className="profimgborder">
                  <img
                    className="aprofileimg"
                    src={toggle2 ? fileInput : "notebook1.png"}
                    alt="Profile Picture"
                  />
                </div>

                <input
                  accept="image/png,image/jpeg"
                  onChange={handleChange}
                  className="profileFile"
                  type="file"
                />

                <label className="toggle2">
                  {fileInput == null ? `Add a` : `Change`} profile Picture
                </label>
              </div>
              <div className="personalinfo">
                <h3>Personal Information</h3>
                <div className="persdiv">
                  <label>Name:</label>
                  <input type="text" defaultValue={yourname}></input>
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
