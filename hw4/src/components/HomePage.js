/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  
  const handleShowPanel = () => {
    setShowPanel(true)
  }

  const handleError = () => {
    if (mineNum > boardSize*boardSize){
      setError(true)
    }
    else{
      setError(false)
    }
  }

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implement start button */}
      <button className='btn' onClick={startGameOnClick}>Start Game</button>

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>
        <button className='btn' onClick={handleShowPanel}>Difficulty Adjustment</button>
        <div className='controlWrapper' style={{display:showPanel ? '' : 'none'}}>
          <div className='error' style={{display:error ? '' : 'none'}}>ERROR:Mines number and board size are invalid!</div>
          <div className='controlPanel'>
            <div className='controlCol'>
              <p className='controlTitle'>Mines Number</p>
              <input type="range" min="1" max="50" step="1" defaultValue="10" onChange={(event) => {handleError(); mineNumOnChange(event.target.value)}} />
              <p className='controlNum'>{mineNum}</p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board Size(n×n)</p>
              <input type="range" min="1" max="15" step="1" defaultValue="8" onChange={(event) => {handleError(); boardSizeOnChange(event.target.value)}} />
              <p className='controlNum'>{boardSize}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}
export default HomePage;   