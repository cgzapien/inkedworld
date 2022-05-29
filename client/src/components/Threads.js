import React, {useContext} from "react";
import { Table, TableContainer, Typography, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { AppContext } from "../Context/AppProvider";
import PublicThreadDetails from "./PublicThreadDetails";

export default function Threads(){
  const {allThreads} = useContext(AppContext)
  return(
    <div style={{marginLeft: "10px", height: "100vh"}}>
      <Typography variant="h4" textAlign="center">Public Threads</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Topic</b></TableCell>
              <TableCell><b>Created by</b></TableCell>
              <TableCell><b>Date created</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allThreads.map(thread => <PublicThreadDetails key={thread._id} {...thread}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}