import React, {useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from "@mui/material";
import "../../css/ThreadForm.css"
export default function NewThreadForm(props){
  const {addThread,} = props
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
    <Box className="threadForm" component="form" onSubmit={handleSubmit}>
        <TextField
        name="threadName"
        value={threadName}
        placeholder="share something"
        variant="outlined"
        label="share something"
        onChange={handleChange}
        ></TextField>
      <FormControl >
        <InputLabel id="topics">topic</InputLabel>
        <Select
          variant="outlined"
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
      <Button style={{padding: "10px"}} type="submit" variant="outlined">Submit Thread</Button>
    </Box>
  )
}