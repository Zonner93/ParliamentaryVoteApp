import React from "react"
import ReactDOM from "react-dom"
import './menuItem.css'
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function MenuItem(props){

    


    return(
        <>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
            <ListItemButton className="menuItem" variant="contained" onClick={function(event){
                props.goTo(props.route)}
                }>{props.name}</ListItemButton>
            </List>
            </Box>
        </>

    );
}




export default MenuItem;