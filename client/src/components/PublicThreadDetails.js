import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function PublicThreadDetails(props) {
  const [username, setUsername] = useState("")

  const {
    dateCreated,
    _id,
    threadName,
    topic,
    user
  } = props
  const date = new Date(dateCreated).toLocaleDateString()
  const linkStyles = {
    color: "#000000"
  }
  function getUser(){
    axios.get(`/auth/${user}`)
      .then(res => setUsername(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <TableRow >
      <TableCell><Link to={`/thread/${_id}`} className="threadLink" >{threadName}</Link></TableCell>
      <TableCell>{topic}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{date}</TableCell>
    </TableRow>
  )
}
