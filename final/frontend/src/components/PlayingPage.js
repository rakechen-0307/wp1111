import Piano from './Piano';
import Clock from './Clock';
import { useState } from 'react'
import './css/PlayingPage.css'

const PlayingPage = ({countdown, startPlaying}) => {

    return (
        <div>
            <h3 id='recording'>{startPlaying ? 'Recording...' : ''}</h3>
            <Clock countdown={countdown}></Clock>
            <Piano></Piano>
        </div>
    )
}

export default PlayingPage