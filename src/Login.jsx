import { useState, useRef } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "./Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth(app);
  const nav = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      nav("/");
    }
  });

  const rMail = useRef();
  const rPass = useRef();

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const hMail = (e) => {
    setMail(e.target.value);
  };

  const hPass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mail === "" || pass === "") {
      setMsg("Email and Password should not be empty");
      return;
    }
    signInWithEmailAndPassword(auth, mail, pass)
      .then((res) => {
        console.log(res);
        setMsg("User Login Successfully...redirecting to home page");
        setTimeout(() => {
          nav("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.message);
        setMsg("Error occured: " + err.message);
      });
  };

  return (
    <>
      <center>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            ref={rMail}
            onChange={hMail}
            value={mail}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            ref={rPass}
            onChange={hPass}
            value={pass}
          />
          <br />

          <a href="/forgotpassword" className="forgotpassword">
            Forgot password?
          </a>

          <br />
          <input type="submit" value="Login" />
        </form>
        <h2>{msg}</h2>
      </center>
    </>
  );
};
export default Login;
