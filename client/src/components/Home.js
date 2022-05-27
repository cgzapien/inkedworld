import { Button, Typography } from "@mui/material";
import {useContext, useState} from "react";
import {AppContext} from "../Context/AppProvider";
import NewThreadForm from "./Forms/NewThreadForm";
import UserThread from "./UserThreads";
import "../css/Home.css"
export default function Home(){
  const [toggleForm, setToggleForm] = useState(false)
  const {user: {username}, userThreads, addThread} = useContext(AppContext)
  const user = username[0].toUpperCase() + username.slice(1)
  return (
    <div style={{display: "relative", marginLeft: "10px", height: "100vh"}}>
      <Typography 
      sx={{textAlign: "center", marginTop: 5}} 
      variant="h5"
      >Welcome to Inked World, a tattoo artist community. Where you can interact with other artists relating to the tattoo world. Here you can post threads about certain topics and other users are able to comment on them. Our goal is to provide a sense of community to tattoo artist across the world.
      </Typography>
      <br/>
      <div className="Home">
        <NewThreadForm addThread={addThread} setToggleForm={setToggleForm}/>
        {/* {toggleForm ? 
          <NewThreadForm addThread={addThread} setToggleForm={setToggleForm}/>
        :
        <div style={{textAlign: "center"}}>
          <Button variant="outlined" onClick={() => setToggleForm((prevState) => !prevState )}>Create Thread</Button>
        </div>
        } */}
        <div 
        style={{marginTop: "55px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}
        >
          {userThreads !== undefined ? 
            userThreads.map(thread => <UserThread key={thread._id} {...thread}/>)
            :
            <></>
          }
        </div>
      </div>
    </div>
  )
}
