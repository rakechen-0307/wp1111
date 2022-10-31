import './App.css'
import React, { useState } from 'react';
import { guess, startGame, restart } from './axios'; 

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleStart = async () => {
    const checkedStarted = await startGame()
    if (checkedStarted === 'The game has started.'){
      setHasStarted(true)
    }
  }

  const handleNumber = (e) => {
    setNumber(e.target.value)
  }

  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  }
  
  const handleRestart = async () => {
    const checkRestart = await restart()
    if (checkRestart === 'The game has restarted.'){
      setHasWon(false)
      setNumber('')
      setStatus('')
    } 
  }

  const startMenu =
    <div>
      <button className='startbutton' onClick = {handleStart}>start game</button>
    </div>

  const gameMode =
    <div className='guesspanel'>
      <p className='text'>Guess a number between 1 to 100</p>
      {/* Get the value from input */}
      <input onInput={handleNumber} value={number}></input>
      {/* Send number to backend */}
      <button onClick={handleGuess} disabled={!number}>guess!</button>
      <p className='statustext'>{status}</p>
    </div>

  const winningMode = 
    <div className='winpanel'>
      <p className='text'>you won! the number was {number}.</p>
      {/* Handle restart for backend and frontend */}
      <button className='restartbutton' onClick={handleRestart}>restart</button>
    </div>

  return (<div className="App">{hasStarted ? (hasWon ? winningMode : gameMode) : startMenu}</div>)
}

export default App;
