import "../designs/homemindev.css";
import "../designs/home.css";

import { PopupboxContainer, PopupboxManager } from "react-popupbox";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillDelete, AiFillLock } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import Loading from "./loading";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvided from "../lib/auth";
import AuthCheck from "../components/AuthComp";
import { useQuery } from "@tanstack/react-query";
import { GetData } from "../lib/helper";

function Home() {
  const current_date = new Date();
  const current_day = current_date.getDate();
  const current_month = current_date.getMonth() + 1;
  const current_year = current_date.getFullYear();
  const current_time =
    current_date.getHours() + ":" + current_date.getMinutes();
  const date = `${current_day}/${current_month}/${current_year}-${current_time}`;
  //console.log(`${current_day}/${current_month}/${current_year}-${current_time}`);
const nav = useNavigate();
  const [toggle, setToggle] = useState("");
  const { userId } = AuthProvided();
  const [display, setDisplay] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: ["todos", userId],
    queryFn: () => GetData(userId),
  });

  if (isLoading) return <Loading/>;
  console.log(data);

  const updateinc= ()=>{
    nav('/updateform')
  }
  /*
  console.data(data.docs);
  const closePopupbox = () => {
    PopupboxManager.close();
  };

  const openPopupbox = () => {
    const content = (
      <div>
        <p>This is a modal popup!</p>
        <button onClick={closePopupbox}>Close</button>
      </div>
    );

    PopupboxManager.open({ content });
  };*/
  //<p>{current_date}</p>
  return (
    <div className="cont">
      <Toaster />

      <PopupboxContainer />
      <AuthCheck>
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
                NOTES
              </h1>
              <hr
                style={{ marginBottom: "20px", border: "2px dashed white" }}
              ></hr>
              <div className="notelist">
                {!data.length ? (
                  <div className="no_notes">
                    <h1>Create a note📒🖋</h1>
                  </div>
                ) : (
                  
                  data.map((item) => (
                    <div className="notes" key={item.id}>
                      <div onClick={updateinc} className="acN">
                        <h3>{item.title}</h3>
                        <hr className="hrN"></hr>
                        <p>{item.body}</p>
                      </div>
                      <div className="btn_div">
                        <button className="btn1">
                          <AiFillLock />
                        </button>
                        <button className="btn2">
                          <BsFillBookmarkHeartFill />
                        </button>
                        <button className="btn3">
                          <AiFillDelete />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </div>
  );
}

export default Home;
