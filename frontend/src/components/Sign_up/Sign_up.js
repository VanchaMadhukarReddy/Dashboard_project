import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_up.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);
  const collectionData = async () => {
    alert("check name email and paswd");
    //the result variable will store response from the req send through fetch api function
    let result = await fetch(
      "https://dashboard-project-air6.onrender.com/register",
      {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: { "content-Type": "application/json" }, //this header part is case sensitive any change in the case sensitive will give the error
      }
    ); //fetch is an api integration method which takes two parameters one is url and other is body,header and all other stuf
    result = await result.json(); //we need to convert the result to json in order to prin the result
    console.warn(result);
    //storing the data in the local storage
    //in locolstarage there is a function called setItem(used to store data in local storage) that takes two arguments one is key, other is value i.e data ,key can be anything jest as an id to indicate the data [open inspect go to application and open localstorage the data will be stored in local storage]
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="inputfields">
      <h1 style={{ margin: "0px" }}>Register</h1>
      <input
        type="text"
        placeholder="Enter name"
        className="box"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="email"
        placeholder="Enter email"
        className="box"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="box"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="btn" onClick={collectionData}>
        Sign-up
      </button>
    </div>
  );
};

export default Signup;
