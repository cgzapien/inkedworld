import { Typography } from "@mui/material";
import React, {useContext} from "react";
import {AppContext} from "../Context/AppProvider";
import NewThreadForm from "./Forms/NewThreadForm";
import UserThread from "./UserThread";

export default function Home(){
  const {user: {username}, userThreads, addThread} = useContext(AppContext)
  return (
    <div style={{display: "relative", marginLeft: "10px", height: "100vh"}}>
      <Typography sx={{textAlign: "center"}} variant="body1">Welcome to Inked, a tattoo artist community. Where you can interact with other artist relating to the tattoo world. Here you can post threads about certain topics and other users are able to comment on them. Our goal is to provide a sense of community to tattoo artist across the world.</Typography>
      <NewThreadForm addThread={addThread}/>
      <Typography>Threads you've created</Typography>
      {userThreads !== undefined ? 
        userThreads.map(thread => <UserThread key={thread._id} {...thread}/>)
        :
        <></>
      }
    </div>
  )
}

//style={{backgroundImage: `url(${tattoogun})`, height: "100vh",  backgroundSize: "cover",backgroundPosition: 'fixed'}}