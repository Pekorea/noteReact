import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Forgotten_password() {
  const [email, setEmail] = useState("");

  const handlefp = (e) => {
    e.preventDefault();
    reset();
  };
  const reset = () => {
    toast("the reset password link has been sent to your email", {
      duration: 3000,
      icon: "🔑",
    });
  };
  return (
    <div>
      <Toaster />
      <div className="mainCont">
        <form className="fpdiv" onSubmit={handlefp}>
          <div className="forp">
            <div className="fpheader">
              <h1 className="fheader">Forgotten Password</h1>
              <hr></hr>
            </div>
            <div className="ediv">
              <input
                value={email}
                onChange={(a) => {
                  setEmail(a.target.value);
                }}
                type="email"
                required
                className="Einput"
              ></input>
              <label className="Elabel">Email:</label>
            </div>

            <div className="btndiv">
              <button className="subbutton" type="submit">
                SUBMIT
              </button>
            </div>
          </div>
        </form>
        <div className="imgcontt">
          <h2>THE NOTEBOOK</h2>
        </div>
      </div>
    </div>
  );
}
