import './App.css';
import React, {useState} from 'react'
import ReactDOM from "react-dom"
import Login from "./components/pages/login.jsx"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from "react-router-dom"

import Start from "./components/pages/start"
import GetAllCandidates from "./components/pages/getAllCandidates"
import AddCandidate from "./components/pages/addCandidate"
import DeleteCandidate from "./components/pages/deleteCandidate"
import CreateElection from "./components/pages/createElection"
import AllElections from "./components/pages/allElections"
import GetOneElection from './components/pages/getOneElection';
import Header from './components/header';
import Navbar from './components/navbar'
import { getFormLabelUtilityClasses } from '@mui/material';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function App() {

  return (
    <Router>
    <NotificationContainer />
    <Header/>
      <Routes> 
        <Route exact path='/' element={<Login/>} />
        <Route path='/start'  element={<><Navbar/> <Start/></>} />
        <Route path='/getallcandidates' element={<><Navbar/><GetAllCandidates/></>} />
        <Route path='/addcandidate' element={<><Navbar/><AddCandidate/></>} />
        <Route path='/createelection' element={<><Navbar/><CreateElection/></>} />
        <Route path='/allelections' element={<><Navbar/><AllElections/></>} />
        <Route path='/elections/:electionID' element={<><Navbar/><GetOneElection/></>} />
        {/* <Route path='/elections/1' element={<GetOneElection id ={1}/>} />
        <Route path='/elections/3' element={<GetOneElection id ={3}/>} />
        <Route path='/elections/4' element={<GetOneElection id ={4}/>} />
        <Route path={'/elctions/:id'} render={({ match: { params } }) => <ToDoContainer id={params.id} />} /> */}
      </Routes>
      
    </Router>

  );
}

export default App;
