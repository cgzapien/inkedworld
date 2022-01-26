const express = require("express")
const CommentonCommentRouter = express.Router()
const Comment = require("../models/CommentOnComment")
//---POST COMMENT ON COMMENT---//
CommentonCommentRouter.route("/:commentId")
  .post((req,res,next) => {
    req.body.threadcomment = req.params.commentId
    // req.body.thread = req.thread._id
    req.body.user = req.user._id
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedComment)
    })
  })
//---GET COMMENTS ON COMMENTS BY THREADCOMMENT ID---//
CommentonCommentRouter.route("/:threadcommentId")
  .get((req,res,next) => {
    Comment.find({"threadcomment": req.params.threadcommentId}, (err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(comments)
    })
  })
module.exports = CommentonCommentRouter