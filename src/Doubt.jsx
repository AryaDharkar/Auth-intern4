import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import app from "./Firebase";
import emailjs from "@emailjs/browser";

const Doubt = () => {
  const auth = getAuth(app);
  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [doubt, setDoubt] = useState("");
  const [msg, setMsg] = useState("");

  const hName = (e) => {
    setName(e.target.value);
  };

  const hDoubt = (e) => {
    setDoubt(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        nav("/login");
      } else {
        setUser(user.email);
      }
    });

    return () => unsubscribe();
  }, [auth, nav]);

  const Send = (e) => {
    e.preventDefault();
    if (name === "" || doubt === "") {
      setMsg("Name and Doubt should not be empty");
      return;
    }

    const data = { name, doubt };

    emailjs
      .send("intern_task4", "template_test2", data, "NUrqCKSIjdq4DcbMl")
      .then((res) => {
        console.log(res);
        setMsg("Doubt Sent Successfully");
        setName("");
        setDoubt("");
      })
      .catch((err) => {
        console.log(err);
        setMsg("Error occurred: " + err.message);
      });
  };

  return (
    <center>
      <h1>Doubt Page</h1>
      <form onSubmit={Send}>
        <h3>Enter your doubt {user}</h3>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={hName}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter your doubt"
          value={doubt}
          onChange={hDoubt}
        />
        <br />
        <br />
        <input type="submit" value="Send Doubt" />
      </form>
      <p>{msg}</p>
    </center>
  );
};

export default Doubt;
