import React, { useState } from "react";
import "./Add_product.css";

const Add_product = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [buttonText, setButtonText] = useState("Add Product");

  const addProduct = async () => {
    // Reset error state
    setError(false);

    // Validate inputs
    if (!name || !price || !category || !company) {
      setError(true);
      return; // Exit the function if there's an error
    }

    // Proceed with API call if no error
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ userId, name, price, category, company }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(userId);
    result = await result.json();
    console.log(result);

    if (result) {
      setName("");
      setPrice("");
      setCategory("");
      setCompany("");
    }
    setButtonText("Product Added");
    setTimeout(() => {
      setButtonText("Add Product");
    }, 500);
  };

  return (
    <div className="inputs">
      <div className="inputfields1">
        <h1 style={{ margin: "0px" }}>Add Product</h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="box"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {error && !name && <span>Enter name</span>}
        <input
          type="text"
          placeholder="Enter Product Price"
          className="box"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        {error && !price && <span>Enter price</span>}
        <input
          type="text"
          placeholder="Enter Product Category"
          className="box"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        {error && !category && <span>Enter category</span>}
        <input
          type="text"
          placeholder="Enter Product Company"
          className="box"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />
        {error && !company && <span>Enter company</span>}
        <button className="btn" onClick={addProduct}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Add_product;
