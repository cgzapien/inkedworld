const express = require("express")
const req = require("express/lib/request")
const ThreadRouter = express.Router()
const Thread = require("../models/Thread")

//---NEW THREAD---//
ThreadRouter.route("/")
  .post((req, res, next) => {
    req.body.user = req.user._id
    const newThread = new Thread(req.body)
    console.log('newThread: ', newThread);
    newThread.save((err, savedThread) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedThread)
    })
  })
//---GET THREAD BY USER ID---//
ThreadRouter.route("/user")
  .get((req, res, next) => {
    const {_id} = req.user
    console.log('_id: ', _id);
    Thread.find({ user: _id }, (err, threads) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(threads)
    })
  })
//---GET ALL THREADS---//
ThreadRouter.route("/")
  .get((req, res, next) => {
    Thread.find((err, threads) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(threads)
    })
  })
//---DELETE THREAD---//
ThreadRouter.route("/:threadId")
  .delete((req,res,next) => {
    Thread.findOneAndDelete(
      { _id: req.params.threadId, user: req.user._id },
      (err, deletedThread) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(deletedThread)
      }
    )
  })
//---GET THREAD BY ID---//  
  .get((req,res,next) => {
    Thread.findById(req.params.threadId, (err, thread) => {
      if(err){
        res.status(500)
        return next(err)
      } else if(!thread){
        res.status(404)
        return next(new Error(`No thread found.`))
      }
      return res.status(201).send(thread)
    })
  })
//---GET THREAD BY TOPIC---//
  ThreadRouter.route("/search/topic")
    .get((req,res,next) => {
      Thread.find({topic: req.query.topic}, (err, topic) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(topic)
      })
    }) 
module.exports = ThreadRouter