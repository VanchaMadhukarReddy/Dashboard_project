const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors"); // Used to solve some backend errors caused in API fetching
const port = process.env.PORT || 5000;
const connectDB = require("./config/db.js");
dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();
// require("./db/config");
const user = require("./db/users");
const Product = require("./db/Product");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let result = new user(req.body);
  let result1 = await result.save();
  // resp.send(result1);
  //in response we dont want to send passward so we need to remove password from the response we got from database
  result1 = result1.toObject();
  delete result1.password;
  resp.send(result1);
});

app.get("/", async (req, resp) => {
  let result = await user.find({});
  resp.json(result);
});

app.post("/login", async (req, resp) => {
  // below we extract the data from mongodb and the data is stored in find_user[we stored  data by removing the password from the data]
  if (req.body.email && req.body.password) {
    let find_user = await user.findOne(req.body).select("-password");
    if (find_user) {
      resp.json(find_user);
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products/:id", async (req, resp) => {
  let products = await Product.find({ userId: req.params.id });
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "no products found" });
  }
});

app.delete("/delete/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "no record found" });
  }
});

app.put("/update/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/product/:id/:key", async (req, resp) => {
  let result = await Product.find({
    userId: req.params.id,
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});
app.listen(port, () => {
  console.log("Program is running on port", port);
});
