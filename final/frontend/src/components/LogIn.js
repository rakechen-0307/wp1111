import './css/LogIn.css';
import * as React from 'react';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { FindUser, createLogin} from '../axios';
import { message } from 'antd'
import { useState } from 'react';

const theme = createTheme({
    typography: {
      fontFamily: [
        'Fuzzy Bubbles',
        'Arial',
      ].join(','),
    },});

const LogIn = ( { EnterMainPage, setUser, setWorks } ) => {
    const [user, setLocalUser] = useState("Ric");
    const [password, setPassword] = useState("testpassword");    
    const [secretPassword, setSecretPassword] = useState('************');

    const log_in = async () => { //not used
        const Message = await FindUser(user);
        if (Message === `not existed`) {
            message.error("User does not exist");
        }
        else {
            if (Message.password !== password) {
                message.error("Password is wrong");
            }
            else {
                setWorks(Message.works)
                EnterMainPage()
            }
        }
    }

    const loginFunc = async()=>{
        const data = await createLogin(user, password);
        // console.log(data);
        if (data.message === "login success") {
          message.info(data.message);
          setUser(data.name);
          setWorks(data.songID);
          EnterMainPage();
        }
        else {message.error(data.message);}
    }

    const Sec = (password) => {
        const star = '*'
        return star.repeat(password.length)
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography >
                <div id='LogInPage'>
                    <h1 id='Title'>Online Music DAW</h1>
                    <div class="Name field">
                        <input type="input" class="name__field" name="name" id='name'
                            value = {user}
                            onChange = {(e)=>{setLocalUser(e.target.value)}}
                            required />
                        <label for="name" class="name__label">Name</label>
                    </div>
                    <div class="Password field">
                        <input type="input" class="password__field" name="password" id='password'
                            value = {secretPassword}
                            onKeyDown = {(e)=>{if(e.code === "Enter") loginFunc()}}
                            onChange = {(e)=>{setPassword(e.target.value); setSecretPassword(Sec(e.target.value))}} required />
                        <label for="password" class="password__label">Password</label>
                    </div>
                    <br />
                    <button id='StartBtn' onClick={loginFunc}>Log In</button>
                </div>
            </Typography>
        </ThemeProvider>
    )
}

export default LogIn;