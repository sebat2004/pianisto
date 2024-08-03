const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ytdownloader/", async (req, res) => {
  console.log(req.query.url);
  const response = await fetch(
    `http://localhost:5011/download?url=${req.query.url}&presets=audio`
  )
    .then((response) => response.json())
    .catch((error) => res.status(400).send(error.message));

  console.log(`http://localhost:5011/extract_info?url=${req.query.url}`);
  const info = await fetch(
    `http://localhost:5011/extract_info?url=${req.query.url}`
  )
    .then((response) => response.json())
    .catch((error) => res.status(400).send(error.message));
  console.log(info.title);
  let title = info.title.replace(/[ |&]+/g, "_");
  title = title.replace(/[()&]/g, "");
  res.sendFile(__dirname + "/downloads/audio/" + title + ".mp3");
});

app.listen(PORT, () => {
  console.log(`App is now running at port, ${PORT}`);
});
