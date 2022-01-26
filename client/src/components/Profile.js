import React, {useState, useContext} from "react";
import { Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel'
import { AppContext } from "../Context/AppProvider";
import axios from "axios";
import { ClassNames } from "@emotion/react";

export default function Profile(){
  const {user: { membersince, _id} } = useContext(AppContext)
  const userinfo = JSON.parse(localStorage.getItem("user"))
  const profileDetails = {
    username:  userinfo.username || "",
    firstname: userinfo.firstname || "",
    lastname: userinfo.lastname || "",
    email: userinfo.email || ""
  }
  const [profileInputs, setProfileinputs] = useState(profileDetails)
  const { firstname, lastname, email, username} = profileInputs
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const date = new Date(membersince)
  const month = date.getMonth()
  const year = date.getFullYear()
  const monthAndYear = `${monthNames[month]}, ${year}`

  function handleChange(e){
    const {name, value} = e.target
    setProfileinputs(prevState => ({
      ...prevState, [name]: value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    updateProfile(profileInputs)
  }
  function updateProfile(inputs){
    axios.put(`/auth/${_id}`, inputs)
      .then(res => {
        console.log(res)
        const { user:{username, firstname, lastname, email} } = res.data
        const newUsername = {...userinfo, username, firstname, lastname, email}
        localStorage.setItem("user", JSON.stringify(newUsername))
        setProfileinputs(prevState => ({...prevState, username, firstname, lastname, email}))
      })
      .catch(err => console.log(err))
  }
  const labelPos = {
    postion: "relative",
    top: "15px"
  }
  return (
    <Grid style={{textAlign: "center", height: "100vh"}} >
      <Box component="form" onSubmit={handleSubmit} sx={{padding: "20px"}}>
        <Typography><u>Member since: {monthAndYear}</u></Typography>
        <br/>
        {/* <Typography>username:</Typography> */}
        <FormLabel style={labelPos}>username:</FormLabel>
        <TextField
          placeholder="username"
          //label="username"
          value={username.toLowerCase()}
          name="username"
          onChange={handleChange}
          style={{marginBottom: "10px", marginLeft: "15px"}}
        />
        <br/>
        <FormLabel style={labelPos}>First Name:</FormLabel>
        <TextField
          placeholder="first name"
          //label="first name"
          name="firstname"
          value={firstname}
          onChange={handleChange}
          style={{marginBottom: "10px", marginLeft: "6px"}}
        />
        <br/>
        <FormLabel style={labelPos}>Last name:</FormLabel>
        <TextField
          placeholder="last name"
          //label="last name"
          name="lastname"
          value={lastname}
          onChange={handleChange}
          style={{marginBottom: "10px", marginLeft: "10px"}}
        />
        <br/>
        <FormLabel style={labelPos}>Email:</FormLabel>
        <TextField
          type="email"
          placeholder="email"
          //label="email"
          name="email"
          value={email}
          onChange={handleChange}
          style={{marginLeft: "45px"}}
        />
        <br/>
        <Button sx={{marginTop: 2}} type="submit">
          Save profile
        </Button>
      </Box>
    </Grid>
  )
}