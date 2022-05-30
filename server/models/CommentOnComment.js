const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentOnCommentSchema = new Schema({
  commentOnComment: {
    type: String
  },
  threadcomment: {
    type: Schema.Types.ObjectId,
    ref: "ThreadComment",
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  // thread: {
  //   type: Schema.Types.ObjectId, //w
  //   ref: "Thread",
  //   required: true
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("CommentOnComment", CommentOnCommentSchema)