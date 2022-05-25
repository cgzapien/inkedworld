import React, { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import { Button, Container, CssBaseline, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';


export default function UserThread(props){
  const { deleteThread } = useContext(AppContext)
  const {threadName, topic, _id, dateCreated} = props
  const date = new Date(dateCreated).toLocaleDateString()
  return (
    <div className="userThread">
      <CssBaseline/>
      <Container
      >
        <Paper variant="outlined" square >
          <Typography>Title: {threadName}</Typography>
          <Typography>Topic: {topic}</Typography>
          <Typography>Created on: {date}</Typography>
          <Button onClick={() => deleteThread(_id)}><Typography variant="caption">Delete</Typography></Button>
        </Paper>
      </Container>
    </div>
  )
}