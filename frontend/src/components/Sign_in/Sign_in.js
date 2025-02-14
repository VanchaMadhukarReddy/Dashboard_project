import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_in.css";

const Signin = () => {
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
    // alert("check name email and paswd");
    //the result variable will store response from the req send through fetch api function
    let result = await fetch(
      "https://dashboard-project-air6.onrender.com/login",
      {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "content-Type": "application/json" }, //this header part is case sensitive any change in the case sensitive will give the error
      }
    ); //fetch is an api integration method which takes two parameters one is url and other is body,header and all other stuf
    result = await result.json(); //we need to convert the result to json in order to prin the result
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("enter correct details");
    }
  };

  return (
    <div className="inputfields">
      <h1 style={{ margin: "0px" }}>Register</h1>
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
        Sign-in
      </button>
    </div>
  );
};

export default Signin;
