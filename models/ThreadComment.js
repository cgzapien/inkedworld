const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ThreadCommentSchema = new Schema({
  threadcomment: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  thread: {
    type: Schema.Types.ObjectId,
    ref: "Thread",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("ThreadComment", ThreadCommentSchema)