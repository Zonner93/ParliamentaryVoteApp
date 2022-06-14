import React,{useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Candidate from './candidate';
import "./pages/listCandidates.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';


function EditCandidateModal(props){
    console.log(props)
    const[open, setOpen] = useState(false);
    const[candidate,setCandidate]= useState(props.candidateData)
    const[editedCandidate, setEditedCandidate] = useState(props.candidateData)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };



    function handleOpen() {setOpen(true)}
    function handleClose() {setOpen(false)}

    function handleChange(event){
        const{name,value} = event.target
        setEditedCandidate(function(prevValue){
            return {
                ...prevValue,
                [name] : value
            }
        })
    }

    function patchCandidate(id){

        axios({
            method:'patch',
            url:'http://localhost:8080/api/candidates/'+id,
            data: editedCandidate
        }).then(
            function(response){
                candidate.updateCandidate()
                handleClose()
                NotificationManager.success("Pomyślnie edytowano dane kandydata")
            }).catch({

        })


    }

    function cancelChanges(){
        setEditedCandidate(candidate);
        handleClose()
    }


return(
<>
    <EditIcon onClick={handleOpen}></EditIcon>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edycja danych kandydata
          </Typography>
          <TextField name ="firstName" id="standard-basic" label="Imię" variant="standard" value={editedCandidate.firstName} onChange={handleChange} />
          <TextField name ="lastName" id="standard-basic" label="Nazwisko" variant="standard" value={editedCandidate.lastName} onChange={handleChange}/>
          <TextField name ="politicalGroup" id="standard-basic" label="Partia" variant="standard" value={editedCandidate.politicalGroup} onChange={handleChange}/>
          <Button variant="text" onClick={function(event){patchCandidate(editedCandidate.id); event.preventDefault()}}>Zapisz zmiany</Button>
          <Button variant="text" onClick={function(event){cancelChanges(); event.preventDefault()}}>Anuluj</Button>
        </Box>
       </Modal>
</>)
}


export default EditCandidateModal;