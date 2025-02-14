import React, { useEffect, useState } from "react";
import "./Product_list.css";
import { Link } from "react-router-dom";
const Product_list = () => {
  const [products, setProducts] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`http://localhost:5000/products/${userId}`);
    console.log(userId);
    result = await result.json();
    console.log(result);
    setProducts(result);
  };

  const deleteproduct = async (id) => {
    let result = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "Delete",
    });
    getProducts();
    console.log(result);
  };

  const Searchhandle = async (event) => {
    if (!event.target.value) {
      getProducts();
    }
    console.warn(event.target.value);
    let key = event.target.value;
    let result = await fetch(`http://localhost:5000/product/${userId}/${key}`);
    result = await result.json();
    if (result.length > 0) {
      setProducts(result);
    }
  };

  return (
    <div className="products">
      <h1 style={{ margin: "0px" }}>Product List</h1>
      <input
        type="text"
        placeholder="search"
        className="search"
        onChange={Searchhandle}
      />
      <ul
        className="product_list"
        style={{ margin: "0px", padding: "0px", listStyle: "none" }}
      >
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li
          style={{
            minWidth: "170px",
          }}
        >
          Operation
        </li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul
            key={product.id}
            className="product_list"
            style={{ margin: "0px", padding: "0px", listStyle: "none" }}
          >
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>{product.company}</li>
            <li
              style={{
                minWidth: "170px",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                height: "30px",
              }}
            >
              <Link
                to={"/update/" + product._id} // Assuming you have the `to` attribute pointing to the correct route
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  margin: "0px",
                  padding: "0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: "skyblue",
                    border: "none",
                    borderRadius: "5px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => {}}
                >
                  Update
                </button>
              </Link>

              <button
                style={{
                  backgroundColor: "red",
                  border: "none",
                  borderRadius: "5px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  deleteproduct(product._id);
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h3>no data found</h3>
      )}
    </div>
  );
};

export default Product_list;
