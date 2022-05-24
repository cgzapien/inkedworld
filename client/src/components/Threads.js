import React, {useContext} from "react";
import { Table, TableContainer, Typography, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { AppContext } from "../Context/AppProvider";
import PublicThreadDetails from "./PublicThreadDetails";

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
            {allThreads.map(thread => <PublicThreadDetails key={thread._id} {...thread}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}