import {
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import app from "./Firebase";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth(app);
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      nav("/");
    }
  });

  const reset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        alert("Reset Email Sent Successfully");
        setMsg("Redirecting to login page");
        setTimeout(() => {
          nav("/login");
        }, 3000);
      })
      .catch((error) => {
        alert("Error sending reset email:" + error.message);
      });
  };

  return (
    <>
      <center>
        <h1>Forgot Password Page</h1>
        <form onSubmit={reset}>
          <input
            type="email"
            placeholder="Enter Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" value={"Send Reset Email"} />
          <p>{msg}</p>
        </form>
      </center>
    </>
  );
};
export default ForgotPassword;
