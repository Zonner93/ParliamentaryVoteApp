import React, {useState} from "react";
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function LoginInput(props) {

    const[currentInput, setInput] = useState({
        login: "",
        password: ""
    })

    function handleChange(event) {
        const{name,value} = event.target;
        setInput(function(prevValue){
            return {
                ...prevValue,
                [name] : value
            };
        });
    };

    return (
        <form>
        <TextField id="outlined-basic" label="Login" name="login" value={currentInput.login} onChange={handleChange} placeholder="Wprowadź login" />
        <TextField id="outlined-basic" label="Hasło" name="password" value={currentInput.password} onChange={handleChange} placeholder="Wprowadź hasło"/>
        <Button variant="outlined" onClick ={function(event){
            props.login(currentInput)
            setInput({
                login: "",
                password: ""
            });
            event.preventDefault()
           }
           }> Zaloguj</Button>
        </form> 
    )
}


export default LoginInput;