import './App.css';
import React, {useState, useEffect} from 'react'
import Login from "./components/pages/login.jsx"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from "react-router-dom"
import StartAdmin from "./components/pages/startAdmin"
import StartUser from "./components/pages/startUser"
import GetAllCandidates from "./components/pages/getAllCandidates"
import AddCandidate from "./components/pages/addCandidate"
import CreateElection from "./components/pages/createElection"
import AllElections from "./components/pages/allElections"
import AllElectionsActive from "./components/pages/allElectionsActive"
import GetOneElection from './components/pages/getOneElection';
import Header from './components/header';
import Navbar from './components/navbar'
import NavbarUser from './components/navbarUser'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import HomePage from './components/pages/homepage';
import VoteResults from './components/pages/voteResults';
import AllFinishedElections from './components/pages/allFinishedElections';


function App() {


  const [user, setUser] = useState(
    (user) => {
      return user
    }
  )

  useEffect(() => {
    if(user){
      
      for(const key in user){
       sessionStorage[key] = user[key];
      }
      return false
    }
  }, [user])
  


  function renderHomePage(){
    
    if(sessionStorage.role === "ROLE_USER") {
      return <><NavbarUser/><HomePage/></>

    }
    else if(sessionStorage.role === "ROLE_ADMIN"){
      return <><Navbar/><HomePage/></>

    }
    else  {
      return <HomePage/>

    }
    
  }


  return (
    <Router>
    <NotificationContainer />
    <Header/>
      <Routes>
      {/* <Route exact path="/" render={() => (loggedIn ? <Redirect to={renderStart} /> : <Login />)}/>; */}
        <Route exact
        path='/'
        element={renderHomePage()} />

      <Route exact
        path='/login'
        element={<Login setUser={setUser}/>} />

        <Route path='/start/user'
        element={
          sessionStorage.role == 'ROLE_USER' ?
        <><NavbarUser/> <StartUser/></>
        :
        renderHomePage()} />

        <Route path='/start/admin'
        element={
          sessionStorage.role == 'ROLE_ADMIN' ?
        <><Navbar/> <StartAdmin/></>
        :
        renderHomePage()} />

       
        <Route path='/getallcandidates' element={ sessionStorage.role == 'ROLE_ADMIN' ? <><Navbar/><GetAllCandidates editPossibility="true"/></>: renderHomePage()} />
        <Route path='/addcandidate' element={ sessionStorage.role == 'ROLE_ADMIN' ?<><Navbar/><AddCandidate/></>: renderHomePage()} />
        <Route path='/createelection' element={ sessionStorage.role == 'ROLE_ADMIN' ?<><Navbar/><CreateElection/></>: renderHomePage()} />
        {/* <Route path='/allelections' element={ sessionStorage.role == 'ROLE_USER' ?<><NavbarUser/><AllElections/></>: renderHomePage()} /> */}
        <Route path='/allelections' element={ sessionStorage.role == 'ROLE_ADMIN' || 'ROLE_USER' ? sessionStorage.role == 'ROLE_ADMIN' ? <><Navbar/><AllElections/></> : <><NavbarUser/><AllElections/></> : renderHomePage()} />
        {/* <Route path='/allelections' element={ sessionStorage.role == 'ROLE_USER' ?<><NavbarUser/><AllElections/></>: renderHomePage()} /> */}
        <Route path='/user/allelections' element={sessionStorage.role == 'ROLE_USER' ?<><NavbarUser/><AllElections/></>: renderHomePage()} />
        <Route path='/user/allelections/active' element={sessionStorage.role == 'ROLE_USER' ?<><NavbarUser/><AllElectionsActive/></>: renderHomePage()} />
        <Route path='/user/allelections/finished' element={sessionStorage.role == 'ROLE_USER' ?<><NavbarUser/><AllFinishedElections/></>: renderHomePage()} />
        <Route path='/elections/:electionID' element={sessionStorage.role == 'ROLE_ADMIN' || 'ROLE_USER' ? sessionStorage.role == 'ROLE_ADMIN' ? <><Navbar/><GetOneElection/></>: <><NavbarUser/><GetOneElection/></> : renderHomePage()} />
        <Route path='/results/:electionID' element={sessionStorage.role == 'ROLE_USER' ? <><NavbarUser/><VoteResults/></>: renderHomePage()} />
        <Route path='*' element={renderHomePage()} />

      </Routes>
    </Router>
  );
}

export default App;


// <Route path='/getallcandidates' element={<><Navbar/><GetAllCandidates editPossibility="true"/></>} />
// <Route path='/addcandidate' element={<><Navbar/><AddCandidate/></>} />
// <Route path='/createelection' element={<><Navbar/><CreateElection/></>} />
// <Route path='/allelections' element={<><Navbar/><AllElections/></>} />
// <Route path='/user/allelections' element={<><NavbarUser/><AllElections/></>} />
// <Route path='/user/allelections/active' element={<><NavbarUser/><AllElectionsActive/></>} />
// <Route path='/elections/:electionID' element={<><Navbar/><GetOneElection/></>} />
// <Route path='*' element={renderHomePage()} />
//   {/* <Route path='http://localhost:8080/'  element={<><Navbar/> <StartAdmin/></>} /> */}
//    {/* <Route path='/start/admin'  element={<><Navbar/> <StartAdmin/></>} /> */}