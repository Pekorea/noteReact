import "../designs/homemindev.css";
import "../designs/home.css";

import { PopupboxContainer, PopupboxManager } from "react-popupbox";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillDelete, AiFillLock } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import Loading from "./loading";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthProvided from "../lib/auth";
import AuthCheck from "../components/AuthComp";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetData, deleteNote, updateNote } from "../lib/helper";
import useGetData from "../lib/hooks/getData";
import { AuthContext } from "../lib/context";

function Home() {
  /* const current_date = new Date();
  const current_day = current_date.getDate();
  const current_month = current_date.getMonth() + 1;
  const current_year = current_date.getFullYear();
  const current_time =
    current_date.getHours() + ":" + current_date.getMinutes();
  const date = `${current_day}/${current_month}/${current_year}-${current_time}`;*/
  //console.log(`${current_day}/${current_month}/${current_year}-${current_time}`);
  const [toggle, setToggle] = useState("");
  const { userId } = useContext(AuthContext);
  const [display, setDisplay] = useState(true);
  const { data, isLoading } = useGetData(userId);

  if (isLoading) return <Loading />;

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
              <h1 className="anotesh">NOTES</h1>
              <hr className="cnhr"></hr>
              <div className="notelist">
                {!data.length ? (
                  <div className="no_notes">
                    <h1>Create a note📒🖋</h1>
                  </div>
                ) : (
                  data.map((item) => (
                    <div className="notes" key={item.id}>
                      <Link
                        className="acN"
                        to={`/${userId}/updateform/${item.id}`}
                      >
                        <h3>{item.title}</h3>
                        <hr className="hrN"></hr>
                        <p>{item.body}</p>
                      </Link>
                      <div className="btn_div">
                        <button
                          className="btn1"
                          onClick={(e) => {
                            setDisplay(!display); // Toggle the display state
                            updateNote(item.id, userId, {
                              isLocked: !item.isLocked, // Toggle the isLocked property
                            });
                          }}
                          style={{
                            background: item.isLocked ? "burlywood" : "",
                            color: item.isLocked ? "black" : "",
                          }}
                        >
                          <AiFillLock />
                        </button>
                        <button
                          className="btn2"
                          onClick={(e) =>
                            updateNote(item.id, userId, {
                              isFavorited: !item.isFavorited,
                            })
                          }
                          style={{
                            background: item.isFavorited ? "yellow" : "",
                            color: item.isFavorited ? "black" : "",
                          }}
                        >
                          <BsFillBookmarkHeartFill style={{ width: "20px" }} />
                        </button>
                        <button
                          onClick={async (e) => {
                            await deleteNote(item.id, userId);
                          }}
                          className="btn3"
                          type="button"
                        >
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
