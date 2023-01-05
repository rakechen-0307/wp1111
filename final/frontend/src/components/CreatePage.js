import * as React from 'react';
import { createTheme, tabScrollButtonClasses, ThemeProvider, Typography } from '@mui/material';
import './css/CreatePage.css'
import { message } from 'antd';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Fuzzy Bubbles',
      'Arial',
    ].join(','),
  },});

const CreatePage = ({fileName, composer, setFileName, setComposer, 
                    EnterPlayingPage, works, setWorks, makeID, bpm, setBpm})=>{

    const start_playing = () => {
        if (fileName === '') {
            message.error("Please enter a name for your work")
        }
        else if (composer === '') {
            message.error("Please enter the composer")
        }
        else if (!Number.isInteger(Number(bpm))||bpm<=0||bpm>=300) {
            message.error("bpm setting is invalid")
            setBpm(120);
        }
        else {
            const ID = makeID()
            EnterPlayingPage()
        }
    }
  
    return (
        <ThemeProvider theme={theme}>
            <Typography >
                <div id= 'createPageWrapper'>
                    <p id='Title'>Create your new file</p>
                    <div className ="inputFileName field">
                        <input type="input" className="inputFileName__field" name="inputFileName"
                            id='inputFileName' value = {fileName}
                            onChange = {(e)=>{setFileName(e.target.value)}} required />
                        <label htmlFor="inputFileName" className="inputFileName__label">File Name</label>
                    </div>
                    <div className="inputComposer field">
                        <input type="input" className="inputComposer__field" name="inputComposer"
                            id='inputComposer' value = {composer}
                            onChange = {(e)=>{setComposer(e.target.value)}} required />
                        <label htmlFor="inputComposer" className="inputComposer__label">Composer</label>
                    </div>
                    <div className ="inputBPM field">
                        <input type="input" className="inputBPM__field" name="inputBPM"
                            id='inputBPM' value = {bpm}
                            onChange = {(e)=>{setBpm(e.target.value)}} required />
                        <label htmlFor="inputBPM" className="inputBPM__label">BPM</label>
                    </div>
                    <br></br>
                    <button id='StartBtn' onClick={start_playing}>Start Playing</button>
                </div>
            </Typography>
        </ThemeProvider>
    );
}
export default CreatePage;