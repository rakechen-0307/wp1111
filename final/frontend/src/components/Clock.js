import './css/Clock.css';
import * as Tone from 'tone';
import low from "./library/sound/low.wav";
import high from "./library/sound/high.wav";
import {useState} from 'react';

const Clock = ({countdown})=>{
    
    return(
        <>
            <p id='countdown'>{countdown}</p>
        </>

    )
}

export default Clock;