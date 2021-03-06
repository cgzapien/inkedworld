import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../css/PublicThreads.css"
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
  useEffect(() => {
    axios.get(`/auth/${user}`)
      .then(res => setUsername(res.data))
      .catch(err => console.log(err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
