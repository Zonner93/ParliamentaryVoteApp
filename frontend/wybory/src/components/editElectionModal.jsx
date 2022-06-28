import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';




 function EditElectionModal(props) {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      
  let data = props.electionInfoData

  if(!Array.isArray(data)){
   data = Object.create(props.electionInfoData);
   data.id = props.electionInfoData.id;
   data.name = props.electionInfoData.name;
   data.description = props.electionInfoData.description;
   data.candidateList = props.electionInfoData.candidateList;
   data.startDate = props.electionInfoData.startDate.slice(0,10);
   data.endDate = props.electionInfoData.endDate.slice(0,10);
  }

  const[electionInfo, setElectionInfo] = useState(data)
  const[editedElectionInfo, setEditedElectionInfo] = useState(data)
  const[open, setOpen] = React.useState(false);



    function handleChange(event){
    const{name, value} = event.target
    setEditedElectionInfo(function(prevValue){
      let {name,value} = event.target;
      if(name == 'startDate') {
          const d1 = new Date(value);
          const d2 = new Date(prevValue.endDate)
          if(d1 > d2) {
              value = prevValue.endDate
          }
      } else if(name == 'endDate') {
          const d1 = new Date(value);
          const d2 = new Date(prevValue.startDate)
          if(d1 < d2) {
              value = prevValue.startDate;
          }
      }
        return {
            ...prevValue,
            [name] : value
        }
    })
    }


    function patchElection(id){
      let election = Object.create(editedElectionInfo);
      election.id = editedElectionInfo.id;
      election.name = editedElectionInfo.name;
      election.description = editedElectionInfo.description;
      election.candidateList = editedElectionInfo.candidateList;
      election.startDate = editedElectionInfo.startDate+" 00:00:00";
      election.endDate = editedElectionInfo.endDate+" 23:59:59";
        axios({
            method:'patch',
            url: 'http://localhost:8080/api/elections/'+id,
            data: election,
            auth: {
              username: sessionStorage.email,
              password: sessionStorage.password
              }
        }).then(function(response){
            props.updateElectionInfo()
            handleClose()
            NotificationManager.success("Pomyślnie edytowano dane głoswania")
        }).catch(function(err){
            NotificationManager.error(err.message)
        })
    }

    function cancelChanges(){
        setEditedElectionInfo(electionInfo);
        handleClose()
    }

  const handleOpen = async () => {setOpen(true)
    await props.refresh()
    debugger
    setEditedElectionInfo(data)}

  const handleClose = () => {
  setOpen(false)

  }
  ;

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Edytuj głosowanie</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Edycja głosowania
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
          <div className='wrapperInputs'>
            <TextField name ="name" id="standard-basic" label="Nazwa" variant="standard" value={editedElectionInfo.name} onChange={handleChange} />
            <TextField type="date" name ="startDate" id="standard-basic" label="Data rozpoczęcia" variant="standard" value={editedElectionInfo.startDate} onChange={handleChange}/>
            <TextField type="date" name ="endDate" id="standard-basic" label="Data zakończenia" variant="standard" value={editedElectionInfo.endDate} onChange={handleChange}/>
            <TextField name ="description" id="standard-basic" label="Opis" variant="standard" value={editedElectionInfo.description} onChange={handleChange}/>
          </div>
          <div className='controller'>
            <Button variant="contained" onClick={function(event){patchElection(props.electionInfoData.id); event.preventDefault()}}>Zapisz zmiany</Button>
            <Button variant="contained" onClick={function(event){cancelChanges(); event.preventDefault()}}>Anuluj</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}


export default EditElectionModal;