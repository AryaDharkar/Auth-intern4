import {
  getAuth,
  updatePassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "./Firebase";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const auth = getAuth(app);
  const nav = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nav("/login");
    }
  });

  const rPass = useRef();
  const rCpass = useRef();

  const [msg, setMsg] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const hPass = (e) => {
    setPass(e.target.value);
  };
  const hCpass = (e) => {
    setCpass(e.target.value);
  };

  const changepassword = (e) => {
    e.preventDefault();
    if (pass === "" || cpass === "") {
      setMsg("Password and Confirm Password should not be empty");
      return;
    }
    if (pass === cpass) {
      updatePassword(auth.currentUser, pass)
        .then(() => {
          setMsg("Password Changed Successfully...redirecting to login page");
          setTimeout(() => {
            signOut(auth);
          }, 3000);
        })
        .catch((err) => {
          setMsg("Error occured: " + err.message);
        });
    } else {
      setMsg("Password and Confirm Password should be same");
      setCpass("");
      setPass("");
      rCpass.current.focus();
    }
  };
  return (
    <>
      <center>
        <h1>Change Password Page</h1>
        <form onSubmit={changepassword}>
          <input
            type="password"
            placeholder="Enter new Password"
            value={pass}
            onChange={hPass}
            ref={rPass}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={cpass}
            onChange={hCpass}
            ref={rCpass}
          />
          <br />
          <br />
          <input type="submit" value="change password" />
        </form>
        <p>{msg}</p>
      </center>
    </>
  );
};
export default ChangePassword;
