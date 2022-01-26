import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Typography, TextField, Divider } from "@mui/material";

import Comments from "./Comments"

const userAxios = axios.create()
  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

export default function ThreadDetails(){
  const initComment = {
    threadcomment: ""
  }
  const [commentInput, setCommentInput] = useState(initComment)
  
  const {threadId} = useParams()
  const [thread, setThread] = useState({})
  const {threadName, topic, _id} = thread
  const[commentsList, setCommentsList] = useState([])
  const [toggleReply, setToggleReply] = useState(false)
  
  function handleChange(e){
    const {name, value} = e.target
    setCommentInput(prevComment => ({
      ...prevComment, [name]: value
    }))
  }
  function handleSubmit(threadId){
    setToggleReply(prevCommentState => !prevCommentState)
    addComment(threadId, commentInput)
    setCommentInput({
      threadcomment: ""
    })
  }
  
  function toggleComment(){
    setToggleReply(prevCommentState => !prevCommentState)
  }
  
  function getThread(){
    userAxios.get(`/api/thread/${threadId}`)
    .then(res => {setThread(() => ({...res.data}))})
      .catch(err => console.log(err))
  }
  //---GET COMMENTS---//
  function getComments(){
    userAxios.get(`/api/thread/comment/threadcomments/${threadId}`)
      .then(res => {console.log(res)
      setCommentsList(() => [...res.data])
      })
      .catch(err => console.log(err))
  }
//---POST NEW COMMENT---//
  function addComment(id, input){
    userAxios.post(`/api/thread/comment/${id}`, input)
    .then(res => setCommentsList(prevComments => [...prevComments, res.data]))
    .catch(err => console.log(err))
  }
//---DELETE COMMENT---//
  function deleteComment(id){
    userAxios.delete(`/api/thread/comment/${id}`)
      .then(res => {console.log(res)
      setCommentsList(prevComments => prevComments.filter(comment => comment._id !== id))
      })
      .catch(err => console.log(err))

  }
  useEffect(() => {
    getThread()
    getComments()
  }, [])
  return (
    <div style={{marginLeft: "10px"}}>
      <Typography variant="h5"><u>Title: </u>{threadName}</Typography>
      <Typography variant="h5"><u>Topic: </u>{topic}</Typography>
      <Button onClick={toggleComment}><Typography variant="caption">-comment-</Typography></Button>
      <br/>
      {commentsList === undefined ?
        <></>
        :
      commentsList.map(comment => <Comments key={comment._id} {...comment} deleteComment={deleteComment}/>  )}
      {toggleReply ? 
        <>
          <TextField
          variant="standard"
          name="threadcomment"
          value={commentInput.threadcomment}
          onChange={handleChange}
          placeholder="comment"></TextField>
          <Button onClick={toggleComment}><Typography variant="caption">-cancel-</Typography></Button>
          <Button onClick={() => handleSubmit(_id)}><Typography variant="caption">-submit comment-</Typography></Button>
        </>
        :
        <></> 
      }
    </div>
  )
}