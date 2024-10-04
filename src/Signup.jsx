import { useState, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "./Firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const nav = useNavigate();
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      nav("/");
    }
  });

  const rMail = useRef();
  const rPass = useRef();
  const rCpass = useRef();

  const [msg, setMsg] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const hMail = (e) => {
    setMail(e.target.value);
  };

  const hPass = (e) => {
    setPass(e.target.value);
  };

  const hCpass = (e) => {
    setCpass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mail === "" || pass === "" || cpass === "") {
      setMsg("Email and Password should not be empty");
      return;
    }
    if (pass === cpass) {
      createUserWithEmailAndPassword(auth, mail, pass)
        .then((res) => {
          setMsg("User Created Successfully...redirecting to login page");
          setTimeout(() => {
            nav("/login");
          }, 2000);
        })
        .catch((err) => {
          setMsg("Error occured: " + err.message);
        });
    } else {
      setMsg("Password and Confirm Password should be same");
      setCpass("");
      rCpass.current.focus();
    }
  };

  return (
    <>
      <center>
        <h1>SignUp Page</h1>
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
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={rCpass}
            onChange={hCpass}
            value={cpass}
          />
          <br />
          <br />
          <input type="submit" value="SignUp" />
        </form>
        <h2>{msg}</h2>
      </center>
    </>
  );
};
export default SignUp;
