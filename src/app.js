const express = require("express");

const productsRoute = require("./routes/products");

const app = express();

app.use(express.json());

app.use("/products", productsRoute);

app.get("/", (req, res) => {
  res.send("CodeVector Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});