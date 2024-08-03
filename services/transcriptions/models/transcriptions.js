const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose.connect(process.env.MONGODB_CONNECT_STRING);

const transcriptionSchema = new Schema({
  name: String,
  ytUrl: String,
  NoteSequence: {
    notes: [
      {
        pitch: Number,
        velocity: Number,
        startTime: Number,
        endTime: Number,
      },
    ],
    totalTime: Number,
  },
  userId: Number,
  createdAt: Date,
});

const Transcription = model("Transcription", transcriptionSchema);

module.exports = Transcription;
