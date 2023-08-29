import "./App.css";
import "./Mindev.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Forgotten_password from "./pages/forgottenp";
import Validation from "./pages/loginsignup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Default route */}
          <Route path="/">
            <Route index element={<Validation />} />
          </Route>

          {/* Signup route */}
          <Route path="/signup">
            <Route index element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
