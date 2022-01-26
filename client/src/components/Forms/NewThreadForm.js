import React, {useState} from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from "@mui/material";

export default function NewThreadForm(props){
  const {addThread} = props
  const threadInitInputs = {
    threadName: "",
    topic: ""
  }
  const [threadInputs, setThreadInputs] = useState(threadInitInputs)
  const { threadName, topic } = threadInputs
  function handleChange(e){
    const {name, value} = e.target
    setThreadInputs(prevInputs => ({...prevInputs, [name]: value}))
  }
  function handleSubmit(e){
    e.preventDefault()
    addThread(threadInputs)
    setThreadInputs({
      threadName: "",
      topic: ""
    })
  }
  return (
    <Box sx={{margin: 5}} component="form" onSubmit={handleSubmit}>
        <TextField
        name="threadName"
        value={threadName}
        placeholder="thread name"
        variant="standard"
        label="thread name"
        onChange={handleChange}
        ></TextField>
      <FormControl style={{marginLeft: "10px"}} >
        <InputLabel id="topics">topic</InputLabel>
        <Select
          variant="standard"
          labelId="topics"
          id="demo-simple-select"
          name="topic"
          value={topic}
          label="topic"
          onChange={handleChange}
          autoWidth
          // style={{width: "100px"}}
          sx={{minWidth: "100px"}}
        >
          <MenuItem name="topic" value="general">general</MenuItem>
          <MenuItem name="topic" value="tips">tips</MenuItem>
          <MenuItem name="topic" value="styles">styles</MenuItem>
          <MenuItem name="topic" value="materials">materials</MenuItem>
        </Select>
      </FormControl>
        <Button type="submit" variant="standard">Submit Thread</Button>
    </Box>
  )
}