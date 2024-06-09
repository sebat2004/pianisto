const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Transcription = require("./models/transcriptions");

const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

app.get("/transcriptions/song/:id", async (req, res) => {
  console.log(req.params.id);
  const transcription = await Transcription.findById(req.params.id);
  console.log(transcription);
  return res.status(200).send(transcription);
});

app.post("/transcriptions", async (req, res) => {
  console.log(req.body);
  console.log(req.body.NoteSequence);
  const transcription = new Transcription({
    name: req.body.name,
    ytUrl: req.body.ytUrl,
    NoteSequence: req.body.NoteSequence,
    createdAt: new Date(),
    userId: req.body.userId,
  });
  transcription.save();
  return res.status(200).json({ message: "Worked!" });
});

app.get("/transcriptions/:userId", async (req, res) => {
  console.log(req.params.userId);
  const transcription = await Transcription.find({ userId: req.params.userId });
  return res.status(200).send(transcription);
});

app.listen(PORT, () => {
  console.log(`App is now running at port ${PORT}`);
});
