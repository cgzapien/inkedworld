import React, {useEffect, useState} from "react";
import { Button, Typography, TextField, Divider, Icon } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";
import CommentOnComment from "./CommentOnComment";

const userAxios = axios.create()
  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

export default function Comments(props){
  const {threadcomment, _id, deleteComment, dateCreated, user } = props
  
  const initComment = {
    commentOnComment: ""
  }
  const [commentReply, setCommentReply] = useState(false)
  const [commentsInput, setCommentsInput] = useState(initComment)
  const [commentsOnCommentsList, setCommentsOnCommentsList] = useState([])
  const [username, setUsername] = useState("") 
  function toggleCommentReply(){
    setCommentReply(prevStatus => !prevStatus)
  }
  function handleChange(e) {
    const {name, value} = e.target
    setCommentsInput(prevComments => ({...prevComments, [name]: value}))
  }
  function handleSubmit(id){
    setCommentReply(prevStatus => !prevStatus) 
    postCommentOnComment(id, commentsInput)
    setCommentsInput({
      commentOnComment: ""
    })
  }
  const date = new Date(dateCreated).toLocaleDateString()
  //---POST COMMENT ON COMMENT---//
  function postCommentOnComment(commentId, comment){
    userAxios.post(`/api/thread/comment/commented/${commentId}`, comment)
    .then(res => setCommentsOnCommentsList(prevComments => [...prevComments, res.data]))
    .catch(err => console.log(err))
  }
  //---GET COMMENTS ON COMMENTS---//
  function getCommentsOnComments(){
    userAxios.get(`/api/thread/comment/commented/${_id}`)
      .then(res => setCommentsOnCommentsList(() => [...res.data]))
      .catch(err => console.log(err))
  }
  function getUser(){
    axios.get(`/auth/${user}`)
      .then(res => setUsername(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getCommentsOnComments()
    getUser()
  }, [])
  return (
    <div style={{margin: "10px 0px"}}>
      <Icon fontSize="small"><PersonIcon/></Icon> <span>{username} - {threadcomment}</span> <span>{date}</span><br/>
      {/* <Button style={{marginLeft: '20px'}} onClick={() => deleteComment(_id)}><Typography variant="caption">-Delete-</Typography></Button> */}
      <Button style={{marginLeft: '20px'}} onClick={toggleCommentReply} ><Typography variant="caption">-Reply-</Typography></Button>
      <br/>
      {commentsOnCommentsList === undefined ? 
        <></>
        :
        commentsOnCommentsList.map(comment => <CommentOnComment key={comment._id} {...comment}/>)
      }
      <Divider/>
      {commentReply ? 
        <>
          <TextField
          variant="standard"
          name="commentOnComment"
          value={commentsInput.commentOnComment}
          onChange={handleChange}
          placeholder="comment"
          ></TextField>
          <Button onClick={toggleCommentReply}><Typography variant="caption">-cancel-</Typography></Button>
          <Button onClick={() => handleSubmit(_id)}><Typography variant="caption">-submit comment-</Typography></Button>
        </>
        :
        <></> 
      }
    </div>
  )
}