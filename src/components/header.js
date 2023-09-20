import "../designs/home.css";
import "../designs/homemindev.css";
const Header = () => {
  return (
    <div className="nothead_div">
      <header className="nothead">
        THE NOTEBOOK
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svgnotebook"
          style={{ position: "absolute", top: "0.4rem", left: "31.2rem" }}
          width="28"
          height="29"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-book-open"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </header>
    </div>
  );
};

export default Header;
