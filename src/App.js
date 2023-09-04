import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Forgotten_password from './pages/forgottenp';
import Validation from './pages/loginsignup';
import Home from './pages/home';
import AuthProvider from './lib/authProvider';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Default route */}
            <Route path='/'>
              <Route index element={<Validation />} />
            </Route>

            {/* Signup route */}
            <Route path='/signup'>
              <Route index element={<Signup />} />
            </Route>
            <Route path='/forgottenp'>
              <Route index element={<Forgotten_password />} />
            </Route>

            <Route path='/home'>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
