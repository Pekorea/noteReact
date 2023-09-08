import { useState } from "react";
import {useNavigate} from 'react-router'
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Header from "../components/header";
import { Auth } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthProvided from "../lib/auth";

export default function Validation() {
  const [name, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [npass, setNpass] = useState("");
  const [email, setEmail] = useState("");
  const [view, setView] = useState(true);
  const { signIn } = AuthProvided();

  const nav = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleChecked = () => {
    setView(!view);
  };
  const handlesub = (e) => {
  e.preventDefault();
  signIn(email, pass)
  /*
  .then((userCredential) => {
    const user = userCredential.user;
    if(user && userCredential){
      
      toast("Successfully logged in", { duration: 3000, icon: "✔" });
      setTimeout(() => {
          nav('/home');
          }, 3000); 
    }
    else{
      toast("Wrong password or email", {duration:2000,icon:'❌❌'});
    }
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/user-not-found") {
        toast("User does not exist",{duration:2000,icon:'👀👀'});
      } else {
        console.log("Login failed: " + errorMessage);
      }
    });*/
  };

  return (
    <div className="cont">
      <Header />
      <form onSubmit={handlesub}>
        <div className="mainContainer">
          <Toaster />

          <div className="valds">
            <div className="maincontvalds">
              <div>
                <div className="form">
                  <div className="headercont">
                    <h1
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "44px",
                      }}
                      className="login"
                    >
                      LOGIN
                    </h1>
                  </div>
                  <hr></hr>

                  <div className="inputs">
                    <div className="emailInputdiv">
                      <input
                        type="email"
                        placeholder=""
                        className="emailInput"
                        onChange={handleEmail}
                        value={email}
                        required
                      ></input>
                      <label>Email</label>
                    </div>

                    <div className="passwordInputdiv">
                      <input
                        value={pass}
                        onChange={handlePass}
                        type={view ? "password" : "text"}
                        className="passwordInput"
                        required
                      ></input>
                      <label>Password</label>
                    </div>
                    <div className="checkbos">
                      <Link className="linkto" to="/forgottenp">
                        <p>Forgot Password?</p>
                      </Link>
                      <div>
                        <input
                          className="viewpass"
                          type="checkbox"
                          onChange={handleChecked}
                        ></input>
                        <label
                          style={{ color: "white", fontSize: "small" }}
                          className="view"
                          htmlFor="viewpass"
                        >
                          {view ? `Show` : `Hide`} password
                        </label>
                      </div>
                    </div>
                    <div className="logbtndiv">
                      <button className="logbtn" type="submit">
                        {" "}
                        PROCEED
                      </button>
                    </div>
                  </div>
                </div>
                <Link
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                  className="linkto"
                  to="/signup"
                >
                  <p>DON'T HAVE AN ACCOUNT? SIGN UP</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="imgcont">
            <h2 className="TN">THE NOTEBOOK</h2>
          </div>
        </div>
      </form>
    </div>
  );
}
