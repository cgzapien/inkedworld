import { Icon, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";

export default function CommentOnComment(props){
  const {commentOnComment, user, _id, dateCreated } = props
  const [username, setUsername] = useState("")
  const date = new Date(dateCreated).toLocaleDateString()
  function getUser(){
    axios.get(`/auth/${user}`)
      .then(res => setUsername(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div style={{marginLeft: "25px", marginBottom: '5px'}}>
      <Typography><Icon fontSize="small"><PersonIcon></PersonIcon></Icon> {username} - {commentOnComment} - {date}</Typography>
    </div>
  )
}