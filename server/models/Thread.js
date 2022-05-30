const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ThreadSchema = new Schema({
  threadName: {
    type: String
  },
  topic: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Thread", ThreadSchema)