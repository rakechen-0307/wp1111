/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';

const Row = ({ turn, guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div id={{rowIdx}+'-0'} key={{rowIdx}+'-0'} className={(guess[rowIdx] === undefined) ? 'Row-wordbox' : 'Row-wordbox '+ guess[rowIdx][0].color}>{(guess[rowIdx] === undefined) ? '' : guess[rowIdx][0].char}</div>
                <div id={{rowIdx}+'-1'} key={{rowIdx}+'-1'} className={(guess[rowIdx] === undefined) ? 'Row-wordbox' : 'Row-wordbox '+ guess[rowIdx][1].color}>{(guess[rowIdx] === undefined) ? '' : guess[rowIdx][1].char}</div>
                <div id={{rowIdx}+'-2'} key={{rowIdx}+'-2'} className={(guess[rowIdx] === undefined) ? 'Row-wordbox' : 'Row-wordbox '+ guess[rowIdx][2].color}>{(guess[rowIdx] === undefined) ? '' : guess[rowIdx][2].char}</div>
                <div id={{rowIdx}+'-3'} key={{rowIdx}+'-3'} className={(guess[rowIdx] === undefined) ? 'Row-wordbox' : 'Row-wordbox '+ guess[rowIdx][3].color}>{(guess[rowIdx] === undefined) ? '' : guess[rowIdx][3].char}</div>
                <div id={{rowIdx}+'-4'} key={{rowIdx}+'-4'} className={(guess[rowIdx] === undefined) ? 'Row-wordbox' : 'Row-wordbox '+ guess[rowIdx][4].color}>{(guess[rowIdx] === undefined) ? '' : guess[rowIdx][4].char}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;