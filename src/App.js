import Locked from "./pages/lockednotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Forgotten_password from "./pages/forgottenp";
import Updateform from "./pages/updatenote";
import Validation from "./pages/loginsignup";
import Home from "./pages/home";
import AuthProvider from "./lib/authProvider";
import Notesform from "./pages/notesform";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBarChecker from "./lib/NavBarChecker";
import Favourites from "./pages/favorite";
import Profile from "./pages/profile";
const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NavBarChecker />
            <Routes>
              <Route path="/">
                <Route index element={<Validation />} />
              </Route>

              <Route path="/noteform">
                <Route index element={<Notesform />} />
              </Route>

              <Route path="/:userId/updateform/:id">
                <Route index element={<Updateform />} />
              </Route>

              <Route path="/LN">
                <Route index element={<Locked />} />
              </Route>

              <Route path="/signup">
                <Route index element={<Signup />} />
              </Route>

              <Route path="/forgottenp">
                <Route index element={<Forgotten_password />} />
              </Route>

              <Route path="/profile">
                <Route index element={<Profile />} />
              </Route>

              <Route path="/home">
                <Route index element={<Home />} />
              </Route>
              <Route path="/favorite">
                <Route index element={<Favourites />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
