import React from 'react';
import TableRow from './TableRow';

const GameBoard = (props) => {
    const rowIds = [];
    for (let i = 0; i < 6; i++) {
        rowIds.push("row" + i)
    }
    const tableRows = rowIds.map(row =>
            <TableRow
                key={row}
                handleClick={props.handleClick}
                cellRow={row.charAt(3)}
                rowId={row}
                gameWon={props.gameWon}
             />)

    return(
        <table id="board">
            <tbody>
                {tableRows}
            </tbody>    
        </table>
    )
}

export default GameBoard;