import "../designs/homemindev.css";
import "../designs/home.css";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthProvided from "../lib/auth";
import AuthCheck from "../components/AuthComp";
import { updateNote, deleteNote, useGetFave } from "../lib/helper";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillDelete, AiFillLock } from "react-icons/ai";
import Loading from "./loading";

export default function Favourites() {
  const { userId } = AuthProvided();
  const { data, isloading, error } = useGetFave(userId);
  if (isloading) return <Loading />;

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
                FAVOURITES
                <BsFillBookmarkHeartFill className="profileIcon" />
              </h1>
              <hr className="cnhr"></hr>
              <div className="notelist">
                {!data.length ? (
                  <div className="no_notes">
                    <h1>No favorite notes📒🖋</h1>
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
                            color: "black",
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
        </div>
      </AuthCheck>
    </div>
  );
}
