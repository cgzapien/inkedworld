import React from "react";

import { Grid, Paper, Avatar, TextField, Button, Typography, Link, CssBaseline, Box } from "@mui/material"
import tattooImage from "/Users/zapien/Desktop/deployed apps/Ink/client/src/media/artist.jpg"
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';

export default function AuthForm(props){
  const { 
    formtitle, 
    formbtn, 
    toggleform, 
    handlechange,
    inputs: {
      username,
      password
    }, 
    submit,
    errmsg
  } = props  
  return (
    <>
      <Grid component="main" container sx={{height: "100vh"}}>
        <CssBaseline/>
          <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${tattooImage})`,
                backgroundRepeat: 'no-repeat',
                // backgroundColor: (t) =>
                // t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: 'fixed'
                
              }}
          />
      <Grid item xs={12} sm={8} md={5} component={Paper}  elevation={10} textAlign="center">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Box item xs={12} sm={8} md={5} component="form" onSubmit={submit}>
          <Avatar style={{backgroundColor: "#102B3F", margin: "auto"}}>
            <LockIcon />
          </Avatar>
          <Typography component="h1"  variant="h4" style={{marginTop: "10px"}}>{formtitle}</Typography>
          <Typography style={{color: 'red'}}>{errmsg}</Typography>
          <TextField
            style={{marginTop: "10px"}}
            required
          
            label="username"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={handlechange}
          >
          </TextField>
          <br/>  
          <TextField
            style={{marginTop: "10px"}}
            required
            type="password"
            label="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={handlechange}
          >
          </TextField>
          <br/>
          <Button
            style={{marginTop: "10px"}}
            
            type="submit"
            variant="outlined"
            endIcon={<SendIcon/>}>{formbtn}</Button>
          {formtitle === "Sign In" ?
            <Typography style={{marginTop: "10px"}}>Don't have an account?  <Link component="button" onClick={toggleform}>Click here</Link></Typography>  
            :
            <Typography style={{marginTop: "10px"}}>Already a user? <Link component="button" onClick={toggleform}>Click here</Link></Typography>
          }
        </Box>
          <Typography variant="body2" color="text.secondary" align="center" >
            Copyright © <Link color="inherit" href="#">
              www.Inked.com
            </Link> {new Date().getFullYear()}.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </>
  )
}