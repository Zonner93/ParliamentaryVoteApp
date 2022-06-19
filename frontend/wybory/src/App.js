import './App.css';
import React, {useState} from 'react'
import Login from "./components/pages/login.jsx"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from "react-router-dom"
import StartAdmin from "./components/pages/startAdmin"
import StartUser from "./components/pages/startUser"
import GetAllCandidates from "./components/pages/getAllCandidates"
import AddCandidate from "./components/pages/addCandidate"
import CreateElection from "./components/pages/createElection"
import AllElections from "./components/pages/allElections"
import GetOneElection from './components/pages/getOneElection';
import Header from './components/header';
import Navbar from './components/navbar'
import NavbarUser from './components/navbarUser'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function App() {

  const[loggedIn, setLoggedIn] = useState()

  function getLogin(login) {
    setLoggedIn(login)
  }

  function renderStart(name) {
    if(name === undefined)
      return '/'
    if(name === 'user' )
      return '/start/user'
    if(name === 'admin')
      return '/start/admin'
  }




  return (
    <Router>
    <NotificationContainer />
    <Header/>
      <Routes>
      {/* <Route exact path="/" render={() => (loggedIn ? <Redirect to={renderStart} /> : <Login />)}/>; */}
        <Route exact 
        path='/' 
        element={<Login getLogin={getLogin}  
        />} />
        <Route path='/start/user' 
        element={
          loggedIn === 'user' ? 
        <><NavbarUser/> <StartUser/></>
        :
        <Login />} />
        <Route path='/start/admin'  element={<><Navbar/> <StartAdmin/></>} />
        <Route path='/getallcandidates' element={<><Navbar/><GetAllCandidates editPossibility="true"/></>} />
        <Route path='/addcandidate' element={<><Navbar/><AddCandidate/></>} />
        <Route path='/createelection' element={<><Navbar/><CreateElection/></>} />
        <Route path='/allelections' element={<><Navbar/><AllElections/></>} />
        <Route path='/user/allelections' element={<><NavbarUser/><AllElections/></>} />
        <Route path='/elections/:electionID' element={<><Navbar/><GetOneElection/></>} />
      </Routes>
    </Router>
  );
}

export default App;
