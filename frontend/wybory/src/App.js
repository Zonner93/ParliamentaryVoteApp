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


function grabId(id){
  return id

}


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
        <Route path='/allelections' element={<AllElections details={grabId}/>} />
        <Route path='/elections/1' element={<GetOneElection id ={1}/>} />
        <Route path='/elections/2' element={<GetOneElection id ={2}/>} />
        <Route path='/elections/3' element={<GetOneElection id ={3}/>} />
        <Route path='/elections/4' element={<GetOneElection id ={4}/>} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
