import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Validation() {
  const [name, setName] = useState([]);
  const [pass, setPassword] = useState("");
  const [npass, setNpass] = useState([]);
  const [email, setEmail] = useState("");
  const [view, setView] = useState([]);

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
    toast("Successfully logged in", { duration: 3000, icon: "✔" });
  };

  return (
    <div>
      <form onSubmit={handlesub}>
        <div className="mainContainer">
          <Toaster />

          <div className="valds">
            <div className="maincontvalds">
              <div className="forms">
                <div className="headercont">
                  <h1 className="Signup">SIGNUP</h1>
                </div>
                <hr></hr>
                <div className="emailInputdiv">
                  <input
                    type="text"
                    placeholder=""
                    className="emailInput"
                    onChange={handleEmail}
                    value={email}
                    required
                  ></input>
                  <label>Name</label>
                </div>

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
                    <input
                      className="viewpass"
                      type="checkbox"
                      onChange={handleChecked}
                    ></input>
                    <label className="view" htmlFor="viewpass">
                      {view ? `Show` : `Hide`} password
                    </label>
                  </div>
                  <div className="logbtndiv">
                    <button className="logbtn" type="submit">
                      {" "}
                      Welcome
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="imgcont">
            <h2>THE NOTEBOOK</h2>
          </div>
        </div>{" "}
      </form>
    </div>
  );
}
