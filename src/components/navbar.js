import { TiThMenu } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import AuthProvided from "../lib/auth";
import { GrAdd } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { getName } from "../lib/helper";
import { BsBook } from "react-icons/bs";
import "../designs/home.css";
import "../designs/homemindev.css";

const Navbar = () => {
  const [searchT, setSearchT] = useState(false);
  const [onSearch, setOnSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const { signOutF, userId } = AuthProvided();
  const nav = useNavigate();
  const [yourname, setYourname] = useState("");

  const { pathname } = useLocation();
  /*getName(userId)
    .then((userName) => {
      console.log(userName); // Access userName when the promise resolves
      setYourname(userName);
    })
    .catch((error) => {
      console.error("Error fetching name:", error);
    });
*/
  const searching = (event) => {
    setOnSearch(event.target.value);
  };
  const toggleOpen = () => {
    setToggle(!toggle);
  };

  const isOpen = () => {
    setSearchT(!searchT);
  };

  return (
    <div className="navoacont">
      <div className="containerr">
        <div className="navbar">
          <div className="navcont">
            <header className="navbar-head">
              <TiThMenu onClick={toggleOpen} className="menubar" />
              <Link
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <h1
                  style={{
                    fontSize: "larger",
                    position: "relative",
                    top: "10px",
                  }}
                >
                  THE NOTEBOOK
                </h1>
              </Link>
              <BsBook className="bookicon" />
            </header>
            {pathname !== "/noteform" &&
              pathname !== "/updateform" &&
              pathname !== "/profile" &&
              pathname !== "/about" && (
                <button onClick={isOpen} className="searchIcondiv">
                  <BiSearchAlt className="searchIcon" />
                </button>
              )}
            <ul className="list-items">
              <li>
                <Link to="/noteform">
                  <button className="addbutton">
                    <GrAdd />
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          {pathname !== "/noteform" &&
            pathname !== "/updatenote" &&
            pathname !== "/profile" &&
            pathname !== "/about" && (
              <div className={searchT ? "searchBar" : "searchbar"}>
                <input
                  type="search"
                  value={onSearch}
                  onChange={searching}
                  placeholder="Search notes..."
                ></input>
              </div>
            )}
        </div>
        <div className={toggle ? "hsidebarcont" : "hsidebarconts"}>
          <ul className="sb-items">
            {pathname === "/profile" ? (
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <li style={{ background: "white", color: "black" }}>
                  <div>
                    <img className="profimg" src="notebook1.png"></img>
                  </div>
                  PROFILE
                </li>
              </Link>
            ) : (
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <li>
                  <div>
                    <img className="profimg" src="notebook1.png"></img>
                  </div>
                  PROFILE
                </li>
              </Link>
            )}
            {pathname === "/favorite" ? (
              <Link
                to="/favorite"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <li style={{ background: "white", color: "black" }}>
                  <div>
                    <BsFillBookmarkHeartFill />
                  </div>
                  Favourites
                </li>
              </Link>
            ) : (
              <Link
                to="/favorite"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <li>
                  <div>
                    <BsFillBookmarkHeartFill />
                  </div>
                  Favourites
                </li>
              </Link>
            )}

            {pathname === "/LN" ? (
              <Link
                to="/LN"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <li style={{ background: "white", color: "black" }}>
                  <div>
                    <AiFillLock />
                  </div>
                  Locked notes
                </li>
              </Link>
            ) : (
              <Link
                to="/LN"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <li>
                  <div>
                    <AiFillLock />
                  </div>
                  Locked notes
                </li>
              </Link>
            )}

            <li
              onClick={() => {
                signOutF().then(() => {
                  nav("/");
                });
              }}
            >
              <div>
                <LuLogOut />
              </div>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
