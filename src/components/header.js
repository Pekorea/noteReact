import "../designs/home.css";
import "../designs/homemindev.css";
import { BsBook } from "react-icons/bs";
const Header = () => {
  return (
    <div className="nothead_div">
      <header className="nothead">
        THE NOTEBOOK
        <BsBook
          style={{ width: "2rem", height: "2.4rem", paddingLeft: "6px" }}
        />
      </header>
    </div>
  );
};

export default Header;
