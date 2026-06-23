const express = require("express");

const productsRoute = require("./routes/products");

const app = express();

app.use(express.json());

app.use("/products", productsRoute);

app.get("/", (req, res) => {
  res.send("CodeVector Backend Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});