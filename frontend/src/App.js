import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sign_up from "./components/Sign_up/Sign_up";
import Privatecomponent from "./components/Privatecomponent";
import Signin from "./components/Sign_in/Sign_in";
import Add_product from "./components/Add_product/Add_product";
import Product_list from "./components/Product_list/Product_list";
import Update_product from "./components/Update_product/Update_product";
const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Privatecomponent />}>
            <Route path="/" element={<Product_list />} />
            <Route path="/add" element={<Add_product />} />
            <Route path="/update/:id" element={<Update_product />} />
            <Route path="/logout" element={<h1>Logout components</h1>} />
            <Route path="/profile" element={<h1>profile components</h1>} />
          </Route>
          <Route path="/signup" element={<Sign_up />} />
          <Route path="/login" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
// youtube channal=>code step by step playlist ecommerce dashboard
