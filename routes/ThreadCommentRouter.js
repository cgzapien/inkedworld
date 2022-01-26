const express = require("express")
const CommentRouter = express.Router()
const Comment = require("../models/ThreadComment")
const ObjectId = require("mongodb").ObjectId
//---CREATE COMMENT ON THREAD---//
CommentRouter.route("/:threadId")
  .post((req,res,next) => {
    console.log(req.params.threadId)
    req.body.thread = req.params.threadId
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
//---GET COMMENT BY ID---//
CommentRouter.route("/:commentId")
  .get((req,res,next) => {
    Comment.findById(req.params.commentId, (err, foundComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(foundComment)
    })
  })
//---DELETE COMMENT BY ID---//
  .delete((req,res,next) => {
    Comment.findByIdAndDelete({_id: req.params.commentId}, (err, deletedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(deletedComment)
    })
  })
//---UPDATE COMMENT BY ID---//
  .put((req,res,next) => {
    Comment.findOneAndUpdate(
      {_id: req.params.commentId, user: req.user._id},
      req.body,
      { new: true },
      (err, updatedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedComment)
      }
    )
  })
//---GET ALL COMMENTS BY THREAD ID---//
CommentRouter.route("/threadcomments/:threadId")
  .get((req,res,next) => {
    console.log(req.params.threadId)
    Comment.find({"thread": req.params.threadId}, (err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(comments)
    })
  })
module.exports = CommentRouter