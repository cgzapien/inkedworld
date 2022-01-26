import React, {useContext, useEffect, useState} from "react";
import { Table, TableContainer, Typography, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { AppContext } from "../Context/AppProvider";
import { Link } from "react-router-dom"
import axios from "axios"


export default function Threads(){
  const {allThreads} = useContext(AppContext)

  return(
    <div style={{marginLeft: "10px"}}>
      <Typography variant="h4" textAlign="center">Threads that have been created</Typography>
      <TableContainer>
        <Table>
        <TableHead>
            <TableCell>Title</TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Date created</TableCell>
          </TableHead>
          <TableBody>
            {allThreads.map(thread => {
              const date = new Date(thread.dateCreated).toLocaleDateString()
              // const [username, setUsername] = useState("")
              // const linkStyles = {
              //   color: "#000000"
              // }
              // function getUser(){
              //   axios.get(`/auth/${thread.user}`)
              //     .then(res => setUsername(res.data))
              //     .catch(err => console.log(err))
              // }
              // useEffect(() => {
              //   getUser()
              // }, [])
              return (
                <TableRow key={thread._id}>
                  <TableCell><Link to={`/thread/${thread._id}`} className="threadLink" >{thread.threadName}</Link></TableCell>
                  <TableCell>{thread.topic}</TableCell>
                  {/* <TableCell>{username}</TableCell> */}
                  <TableCell>{date}</TableCell>
                </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}