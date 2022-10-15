/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setNonMineCount(boardSize*boardSize-mineNum)
        setMineLocations(newBoard.mineLocations)
        setRemainFlagNum(0)
        setBoard(newBoard.board)
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if (newBoard[x][y].revealed === false){
            if (newBoard[x][y].flagged === true){
                newBoard[x][y].flagged = false
                newFlagNum = newFlagNum - 1
            }
            else{
                newBoard[x][y].flagged = true
                newFlagNum = newFlagNum + 1
            }
        }
        setRemainFlagNum(newFlagNum)
        setBoard(newBoard)
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged){
            return;
        }
        let newBoard = JSON.parse(JSON.stringify(board));

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        if (newBoard[x][y].value === '💣'){
            for (let i=0 ; i<mineLocations.length ; i++){
                newBoard[mineLocations[i][0]][mineLocations[i][1]].revealed = true
            }
            setBoard(newBoard)
            setGameOver(true)
        }
        else{
            let board_reveal = revealed(newBoard, x, y, nonMineCount, boardSize, remainFlagNum)
            if (board_reveal.newNonMinesCount === 0){
                setWin(true)
                setGameOver(true)
            }
            setBoard(board_reveal.board)
            setNonMineCount(board_reveal.newNonMinesCount)
            setRemainFlagNum(board_reveal.remainFlagNum)
        } 
    };

    let i = 0
    const getID = () => {
        const id = 'row'+ i
        i = i + 1
        return id
    }

    const Board = 
        <div className='boardContainer'>
            <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} restartGame={restartGame}></Dashboard>
                {board.map((row, index1) => {
                    return (
                        <div id={getID()} key={index1} style={{display:'flex'}}>
                            {row.map((cell, index2) => {
                                return (
                                    <Cell key={index2} rowIdx={cell.x} colIdx={cell.y} detail={{x:cell.x, y:cell.y, value:cell.value, flagged:cell.flagged, revealed:cell.revealed}} updateFlag={updateFlag} revealCell={revealCell}></Cell>
                                )
                            })}
                        </div>
                    )
                })}
        </div>

    return (
        <div className='boardPage'>
            <div className='boardWrapper'>
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                {(!gameOver) ? 
                    <div>{Board}</div>
                    :
                    <div>
                        {Board}
                        <Modal restartGame={restartGame} backToHome={backToHome} win={win}></Modal>
                    </div>
                }
            </div>
        </div>
    );
}

export default Board