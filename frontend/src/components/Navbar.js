import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navvar = () => {
  const auth = localStorage.getItem("user");
  console.log("checking the local storage value before and after signup");
  console.log(auth);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="navbar">
      {auth ? (
        <ul className="list1" style={{ padding: "0px", listStyle: "none" }}>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>

          <li>
            <Link onClick={logout} to="/signup">
              {/* auth is in string format since the local storage data is stored in string ,we need to convert the string to json and then we can retrieve the name from json data */}
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <div className="list2">
          <ul
            className="two_options"
            style={{ margin: "0px", padding: "0px", listStyle: "none" }}
          >
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navvar;
