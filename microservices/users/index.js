const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user");

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Input validation for all endpoints
app.get("/:id", async (req, res) => {
  const response = await new User((id = req.params.id)).getUserById(
    req.params.id
  );
  res.send(response);
});

app.post("/", async (req, res) => {
  // TODO: Salt + Hash password
  const response = await new User().createUser(
    req.body.email,
    req.body.password
  );
  res.send(response);
});

app.put("/", async (req, res) => {
  const response = await new User().updateUser(
    req.body.id,
    req.body.email,
    req.body.password
  );
  res.send(response);
});

app.delete("/:id", async (req, res) => {
  const response = await new User().deleteUser(req.params.id);
  res.send(response);
});

app.listen(PORT, () => {
  console.log("App is now running at port");
});
