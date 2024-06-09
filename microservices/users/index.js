const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user");

const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Input validation for all endpoints
app.get("/user/:id", async (req, res) => {
  const response = await new User((id = req.params.id))
    .getUserById(req.params.id)
    .catch((error) => res.status(401).send(error.message));
  res.send(response);
});

app.post("/user/", async (req, res) => {
  // TODO: Salt + Hash password
  const response = await new User()
    .createUser(req.body.email, req.body.password)
    .catch((error) => res.status(401).send(error.message));
  res.send(response);
});

app.put("/user/", async (req, res) => {
  const response = await new User()
    .updateUser(req.body.id, req.body.email, req.body.password)
    .catch((error) => res.status(401).send(error.message));
  res.send(response);
});

app.delete("/user/:id", async (req, res) => {
  const response = await new User()
    .deleteUser(req.params.id)
    .catch((error) => res.status(401).send(error.message));
  res.send(response);
});

app.post("/user/login", async (req, res) => {
  const response = await new User().loginUser(
    req.body.email,
    req.body.password
  );
  console.log(response)
  if (response.status !== "success") {
    return res.status(401).send("Invalid credentials");
  }

  return res.send(response.data);
});

app.listen(PORT, () => {
  console.log(`App is now running at port, ${PORT}`);
});
