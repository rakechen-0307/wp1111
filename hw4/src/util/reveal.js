/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, boardSize, remainFlagNum) => {

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    const checkAdjacentZero = (zero_cell) => {
      let add_zero_cell = []
      for(let i=0 ; i<zero_cell.length ; i++){
        if (zero_cell[i][0]-1 >= 0){
          if (board[zero_cell[i][0]-1][zero_cell[i][1]].revealed !== true){
            board[zero_cell[i][0]-1][zero_cell[i][1]].revealed = true
            newNonMinesCount --
            if (board[zero_cell[i][0]-1][zero_cell[i][1]].value === 0){
              add_zero_cell.push([zero_cell[i][0]-1, zero_cell[i][1]])
            }
            if (board[zero_cell[i][0]-1][zero_cell[i][1]].flagged === true){
              remainFlagNum --
            }
          }
        }
        if (zero_cell[i][0]+1 < boardSize){
          if (board[zero_cell[i][0]+1][zero_cell[i][1]].revealed !== true){
            board[zero_cell[i][0]+1][zero_cell[i][1]].revealed = true
            newNonMinesCount --
            if (board[zero_cell[i][0]+1][zero_cell[i][1]].value === 0){
              add_zero_cell.push([zero_cell[i][0]+1, zero_cell[i][1]])
            }
            if (board[zero_cell[i][0]+1][zero_cell[i][1]].flagged === true){
              remainFlagNum --
            }
          }
        }
        if (zero_cell[i][1]-1 >= 0){
          if (board[zero_cell[i][0]][zero_cell[i][1]-1].revealed !== true){
            board[zero_cell[i][0]][zero_cell[i][1]-1].revealed = true
            newNonMinesCount --
            if (board[zero_cell[i][0]][zero_cell[i][1]-1].value === 0){
              add_zero_cell.push([zero_cell[i][0], zero_cell[i][1]-1])
            }
            if (board[zero_cell[i][0]][zero_cell[i][1]-1].flagged === true){
              remainFlagNum --
            }
          }
        }
        if (zero_cell[i][1]+1 < boardSize){
          if (board[zero_cell[i][0]][zero_cell[i][1]+1].revealed !== true){
            board[zero_cell[i][0]][zero_cell[i][1]+1].revealed = true
            newNonMinesCount --
            if (board[zero_cell[i][0]][zero_cell[i][1]+1].value === 0){
              add_zero_cell.push([zero_cell[i][0], zero_cell[i][1]+1])
            }
            if (board[zero_cell[i][0]][zero_cell[i][1]+1].flagged === true){
              remainFlagNum --
            }
          }
        }
      }

      zero_cell = add_zero_cell
      return zero_cell

    }

    if (board[x][y].revealed !== true){
      board[x][y].revealed = true
      newNonMinesCount --
      if (board[x][y].value === 0){
        let zero_cell = [[x,y]]
        while (zero_cell.length !== 0){
          zero_cell = checkAdjacentZero(zero_cell)
        }
      }
    }

    return { board, newNonMinesCount, remainFlagNum };
};
