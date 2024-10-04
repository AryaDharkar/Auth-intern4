import "./App.css";
import Home from "./Home";
import About from "./About";
import Doubt from "./Doubt";
import Navbar from "./Navbar";
import Login from "./Login";
import SignUp from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doubt" element={<Doubt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route
          path="*"
          element={
            <center>
              <h1>404 Not Found</h1>
            </center>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
