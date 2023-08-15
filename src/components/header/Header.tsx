import React, { FC, ReactElement, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { ICreateNewList } from "../../types/interfaces/ICreateNewList";

interface IHeader {
    username: string
}


const Header: FC<IHeader> = (props): ReactElement => {
const {username = 'shopper'} = props 
const [title, setTitle] = useState<string>("")
const [open, setOpen] = useState<boolean>(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const handleCreateList = () => {
    let newList: ICreateNewList = { title: "My list" } 
    if (title !== "") {
        newList.title = title
    }
    console.log(newList)
}

return (
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" >
        <Toolbar variant="dense" sx={{width: "100%"}}>
        <Button color="inherit" onClick={handleOpen} >New list</Button>
        <Dialog onClose={handleClose} open={open}>
            <Container>
            <Box sx={{m:2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" align="center">List title</Typography>
      <TextField id="outlined-basic" variant="outlined" size="small" onChange={(e) => setTitle(e.target.value)}/>
      <Button onClick={handleCreateList}>Create list</Button>
      </Box>
      </Container>
    </Dialog>
        <Link to="/lists">
        <Button color="inherit">Old lists</Button>
                </Link>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
)
}



export default Header