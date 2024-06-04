const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("App is now running at port");
});
