const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

cors();

app.listen(3000, () => {
  console.log("App is now running at port");
});
