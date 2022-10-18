/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const ids = [0, 1, 2, 3, 4, 5]

const Board = ({ turn, guesses, curGuess }) => {
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {ids.map((id) => {
                return ((turn === id) ? <CurRow id={'row_'+id} key={'row_'+id} curGuess={curGuess} rowIdx={id}></CurRow> : <Row id={'row_'+id} key={'row_'+id} turn={turn} guess={guesses} rowIdx={id}></Row>)
            })}
        </div>
    )
};
export default Board;
