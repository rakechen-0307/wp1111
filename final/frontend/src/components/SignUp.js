import './css/SignUp.css';
import * as React from 'react';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { CreateUser ,createRegister } from '../axios'
import { message } from 'antd'
import { useState } from 'react';

const theme = createTheme({
    typography: {
      fontFamily: [
        'Fuzzy Bubbles',
        'Arial',
      ].join(','),
    },});

const SignUp = ( { EnterMainPage, setGlobalUser} ) => {
    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [secretPassword, setSecretPassword] = useState('');
    const [secretPassword2, setSecretPassword2] = useState('');

    const sign_up = async () => { //not used
        const Message = await CreateUser(user, password);
        if (Message === 'existed') {
            message.error("Username has already existed. Please choose another name")
        }
        else {
            createRegister(user,password);
            setGlobalUser(user);
            EnterMainPage()
        }
    }

    const Sec = (password) => {
        const star = '*'
        return star.repeat(password.length)
    }

    const Sec2 = (passwordAgain) => {
        const star = '*'
        return star.repeat(passwordAgain.length)
    }

    const signUpFunc = async () => {
        if (password === "" || passwordAgain === "" || user === "") message.error("input is empty");
        else {
        if (password === passwordAgain) {
          const Message = await createRegister(user, password);
          if(Message === "existed"){
            message.error("Username has already existed. Please choose another name")
          }
          else{
            message.info("account created");
            setGlobalUser(user);
            EnterMainPage();
            }
        } 
        else message.error("password is different");
        }
      };


    return (
        <ThemeProvider theme={theme}>
            <Typography >
                <div id='SignUpPage'>
                    <h1 id='Title'>Online Music DAW</h1>
                    <div class="Name field">
                        <input type="input" class="name__field" name="name" id='name'
                            value = {user}
                            onChange = {(e)=>{setUser(e.target.value)}} required />
                        <label for="name" class="name__label">Name</label>
                    </div>
                    <div class="Password field">
                        <input type="input" class="password__field" name="password" id='password' 
                            value = {secretPassword} 
                            onChange = {(e) => {setPassword(e.target.value); setSecretPassword(Sec(e.target.value))}} required />
                        <label for="password" class="password__label">Password</label>
                    </div>
                    <div class="checkPassword field">
                        <input type="input" class="checkpassword__field" name="checkpassword" id='checkpassword'
                            value = {secretPassword2} 
                            onChange = {(e) => {setPasswordAgain(e.target.value); setSecretPassword2(Sec2(e.target.value))}}
                            onKeyDown = {(e)=>{if(e.code === "Enter") signUpFunc()}}
                            required />
                        <label for="checkpassword" class="checkpassword__label">Enter Password Again</label>
                    </div>
                    <br />
                    <button id='StartBtn' onClick={signUpFunc}>Sign Up</button>
                </div>
            </Typography>
        </ThemeProvider>
    )
}

export default SignUp;