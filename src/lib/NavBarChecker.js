import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
export default function NavBarChecker() {
  const location = useLocation();
  const path = location.pathname;

  return (path !== "/" && path !== "/signup" && path !== "/forgottenp") && <Navbar />;
}
