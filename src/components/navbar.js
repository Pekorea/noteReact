import { TiThMenu } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import AuthProvided from "../lib/auth";
const Navbar = () => {
  const [searchT, setSearchT] = useState(false);
  const [onSearch, setOnSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const { signOutF } = AuthProvided();
  const nav = useNavigate();
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
          </header>
          <button onClick={isOpen} className="searchIcondiv">
            <BiSearchAlt className="searchIcon" />
          </button>
          <ul className="list-items">
            <li>About</li>
          </ul>
        </div>

        <div className={searchT ? "searchBar" : "searchbar"}>
          <input
            type="search"
            value={onSearch}
            onChange={searching}
            placeholder="Search notes..."
          ></input>
        </div>
      </div>
      <div className={toggle ? "hsidebarcont" : "hsidebarconts"}>
        <ul className="sb-items">
          <li>
            <div>
              <img className="profimg" src="notebook1.png"></img>
            </div>
            Account
          </li>
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
          <li>
            <div>
              <AiFillLock />
            </div>
            Locked notes
          </li>
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
  );
};

export default Navbar;
