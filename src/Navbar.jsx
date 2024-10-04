import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const Navbar = () => {
  const auth = getAuth();
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <div className="nav">
      {user !== null && <a href="/">Home</a>}
      {user !== null && <a href="/about">About</a>}
      {user !== null && <a href="/doubt">Doubt</a>}
      {user === null && <a href="/login">Login</a>}
      {user === null && <a href="/signup">Signup</a>}
      {/* {user === null && <a href="/forgotpassword">Forgot Password</a>} */}
      {user !== null && <a href="/changepassword">Change Password</a>}
      {user !== null && <button onClick={logout}>Logout</button>}
    </div>
  );
};
export default Navbar;
