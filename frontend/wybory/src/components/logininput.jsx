import React, {useState} from "react";
import ReactDOM from "react-dom";

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
        <label>Login</label>
        <input name="login" value={currentInput.login} onChange={handleChange} placeholder="Wprowadź login"/>
        <label>Hasło</label>
        <input name="password" value={currentInput.password} onChange={handleChange} placeholder="Wprowadź hasło"/>
        <button type="submit" onClick ={function(event){
            props.login(currentInput)
            setInput({
                login: "",
                password: ""
            });
            event.preventDefault()
           }
           }> Zaloguj</button>
        </form> 
    )
}


export default LoginInput;