import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import app from "./Firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();

  const [msg, setMsg] = useState("");
  const [user, setUser] = useState("");

  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nav("/login");
    } else {
      setUser(user.email);
    }
  });

  const logout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        setMsg("User signed out successfully");
        setTimeout(() => {
          nav("/login");
        }, 3000);
      })
      .catch((error) => {
        setMsg("Error signing out:" + error.message);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };
  return (
    <>
      <center>
        <h1>Home Page</h1>
        <h3>Welcome {user}</h3>
        <form onSubmit={logout}>
          <button type="submit">Logout</button>
          <p>{msg}</p>
        </form>
      </center>
    </>
  );
};
export default Home;
