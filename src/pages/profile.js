import "../designs/homemindev.css";
import "../designs/home.css";
import { CgProfile } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import AuthProvided from "../lib/auth";
//import AuthCheck from "../components/AuthComp";
//import { useQuery } from "@tanstack/react-query";
import { getPc, getName, updatePasscode } from "../lib/helper";

export default function Profile() {
  const [yourname, setYourname] = useState("");
  const [yourpc, setYourpc] = useState("");
  const [oldpc, setOldpc] = useState("");
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(true);
  const [togglepc, setTogglepc] = useState(true);
  const { userId } = AuthProvided();

  getName(userId)
    .then((userName) => {
      setYourname(userName);
    })
    .catch((error) => {
      console.error("Error fetching name:", error);
    });
  getPc(userId)
    .then((userpc) => {
      setYourpc(userpc);
      console.log(userpc);
      if (userpc.length === 0 || userpc == null) {
        setTogglepc(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching Passcode:", error);
    });

  const [fileInput, setFileInput] = useState();
  const [newpc, setNewpc] = useState("");
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

  const updatepc = () => {
    if (newpc.length === 0) {
      toast("Enter the field!");
    } else if (yourpc !== oldpc) {
      toast("Wrong Passcode!", { duration: 1200, icon: "🚩🚩" });
    } else {
      try {
        updatePasscode(newpc, userId);
        toast("PassCode Updated!", { duration: 1200, icon: "✔" });
        setNewpc("");
        setOldpc("");
      } catch (e) {
        console.error("An error occurred: ", e);
        toast("Error updating PassCode", { duration: 2000, icon: "❌" });
      }
    }
  };
  const dispc = () => {
    setToggle3(!toggle3);
  };

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
                  <input type="text" disabled defaultValue={yourname}></input>
                </div>

                {togglepc ? (
                  <div className="passcodediv">
                    <div className="persdivs">
                      <label>Old LPasscode</label>
                      <input
                        value={oldpc}
                        onChange={(E) => {
                          setOldpc(E.target.value);
                        }}
                        type={toggle3 ? "password" : "text"}
                      ></input>
                    </div>

                    <div className="persdivs">
                      <label>New LPasscode</label>
                      <input
                        type={toggle3 ? "password" : "text"}
                        value={newpc}
                        onChange={(e) => {
                          setNewpc(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="btns_div">
                      <button onClick={updatepc} type="button">
                        UPDATE
                      </button>
                      <button onClick={dispc} type="button">
                        {toggle3 ? "SHOW" : "HIDE"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="CPC_div">
                    <button className="CPC">Create Passcode for Notes</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
