import './App.css';
import React from 'react'
import ReactDOM from "react-dom"
import Login from "./components/pages/login.jsx"
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"

import Start from "./components/pages/start"
import GetAllCandidates from "./components/pages/getAllCandidates"
import AddCandidate from "./components/pages/addCandidate"
import DeleteCandidate from "./components/pages/deleteCandidate"



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
        <Route path='/deletecandidate' element={<DeleteCandidate/>} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
