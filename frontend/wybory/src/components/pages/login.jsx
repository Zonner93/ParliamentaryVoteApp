// import React from "react";
// import ReactDOM from "react-dom";
// import LoginInput from "../logininput.jsx"
// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom"


// function Login(){
//     const navigate = useNavigate();

// function login(loginData){
//     //POST
//     console.log(loginData)
//     navigate('/start');
// }


//     return (
// <div >
//       <LoginInput login={login}/>

// </div>

//     )
// }





// export default Login;

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import LoginInput from "../logininput.jsx"
import { BrowserRouter as Router, Routes, Route,  Navigate, useNavigate } from "react-router-dom"



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {



    const navigate = useNavigate();

    function login(loginData){
        //POST
        console.log(loginData)
        navigate('/start');
    }





  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="div" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <LoginInput login={login}/>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}