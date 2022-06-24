
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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginInput from "../logininput.jsx"
import { BrowserRouter as Router, Routes, Route,  Navigate, useNavigate } from "react-router-dom"
import axios from 'axios';



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

export default function Login(props) {

    const navigate = useNavigate();

    const users = [
      {
        "email": "admin@gmail.com",
        "name": "admin",
        "password": "admin123",
        "surname": "",
        "role": "ROLE_ADMIN"
       },
       {
      "email": "user@gmail.com",
      "name": "Karolina",
      "password": "123456789",
      "surname": "Krawczyk",
      "role": "ROLE_USER"
       },
      {
      "email": "user1@gmail.com",
      "name": "Adam",
      "surname": "Kot",
      "password": "123456789",
      "role": "ROLE_USER"
  },
      {
      "email": "user2@gmail.com",
      "name": "Jerzy",
      "surname": "Kowalski",
      "password": "123456789",
      "role": "ROLE_USER"
  }
  ]



    function login(loginData){
      let credential = false;
      for(const user of users) {
        if(user.email == loginData.login && user.password == loginData.password){
          credential = user;
        }
      }      
      
      if(credential) {
          props.setUser(credential)
          renderStart(credential.role)
        }

    }

    function renderStart(role) {
    
      if(role === 'ROLE_USER' ){
        navigate( '/start/user')
        window.location.reload(false);
      } else if (role === 'ROLE_ADMIN'){
        navigate( '/start/admin')
        window.location.reload(false);

      } else {
        navigate( '/login')
        window.location.reload(false);

      }
    }


  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
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