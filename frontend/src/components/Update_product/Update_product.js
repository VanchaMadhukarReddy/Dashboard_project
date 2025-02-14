import React, { useEffect, useState } from "react";
import "./Update_product.css";
import { useNavigate, useParams } from "react-router-dom";
const Update_product = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [buttonText, setButtonText] = useState("Update product");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.warn(params.id);
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    console.log(params.id);
    let result = await fetch(
      `https://dashboard-project-air6.onrender.com/product/${params.id}`
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }
    let result = await fetch(
      `https://dashboard-project-air6.onrender.com/update/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({ name, price, category, company }),
        headers: { "content-Type": "application/json" },
      }
    );
    console.log(result);
    console.log({ name, price, category, category });
    setButtonText("product updated");
    setTimeout(() => {
      setButtonText("Update product");
    }, 800);
    navigate("/");
  };

  return (
    <div className="inputs">
      <div className="inputfields1">
        <h1 style={{ margin: "0px" }}>Update Product</h1>
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
        <button className="btn" onClick={updateProduct}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Update_product;
