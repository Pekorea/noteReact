import "../designs/homemindev.css";
import "../designs/home.css";
//import { PopupboxContainer, PopupboxManager } from 'react-popupbox';
import { Toaster, toast } from "react-hot-toast";
import { PopupboxContainer, PopupboxManager } from "react-popupbox";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillDelete, AiFillLock } from "react-icons/ai";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthProvided from "../lib/auth";
import AuthCheck from "../components/AuthComp";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLock, deleteNote, updateNote, useGetLocked } from "../lib/helper";
import useGetData from "../lib/hooks/getData";
import { AuthContext } from "../lib/context";
import Loading from "./loading";

function Locked() {
  const [toggle, setToggle] = useState("");
  const { userId } = useContext(AuthContext);

  const { data, isLoading } = useGetLocked(userId);

  if (isLoading) return <Loading />;
  console.log(data);

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

  return (
    <div className="cont">
      <Toaster />

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
                LOCKED NOTES
              </h1>
              <hr
                style={{ marginBottom: "20px", border: "2px dashed white" }}
              ></hr>
              {!data.length ? (
                <div className="no_notes">
                  <h1>No locked notes📒🖋</h1>
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
                        onClick={(e) =>
                          updateNote(item.id, userId, {
                            isLocked: !item.isLocked,
                          })
                        }
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
                        <BsFillBookmarkHeartFill />
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
      </AuthCheck>
    </div>
  );
}

export default Locked;
