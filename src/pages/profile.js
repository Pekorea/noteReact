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
  const { userId } = AuthProvided();
  const [fileInput, setFileInput] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFileInput(URL.createObjectURL(e.target.files[0]));
    console.log(fileInput);
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
                <img className="aprofileimg" src={fileInput}></img>
              </div>

              <input
                accept="image/png,image/jpeg"
                onChange={handleChange}
                className="profileFile"
                type="file"
              ></input>

              <p>{fileInput===null ?`Add a`:`Change`} profile Picture</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
