import './App.css';
import React from 'react'
import ReactDOM from "react-dom"
import Login from "./components/pages/login.jsx"
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"

import Start from "./components/pages/start"
import GetAllCandidates from "./components/pages/getAllCandidates"
import AddCandidate from "./components/pages/addCandidate"
import DeleteCandidate from "./components/pages/deleteCandidate"
import CreateElection from "./components/pages/createElection"
import AllElections from "./components/pages/allElections"
import GetOneElection from './components/pages/getOneElection';



function App() {

  return (
    <Router>
    <div className="App">
    <p>Wybory Parlamentarne</p>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route path='/start'  element={<Start/>} />
        <Route path='/getallcandidates' element={<GetAllCandidates/>} />
        <Route path='/addcandidate' element={<AddCandidate/>} />
        <Route path='/createelection' element={<CreateElection/>} />
        <Route path='/allelections' element={<AllElections/>} />
        <Route path='/elections/5' element={<GetOneElection/>} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
