import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Users from "./components/Users/Users";


const App = () => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*" element={<Dialogs />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/users" element={<Users />}></Route>
          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
