import React from 'react';

const TableRow = (props) => {
    const cellIds  = [];
    for (let i = 0; i < 7; i++) {
        cellIds.push(props.cellRow + i)
    }
    const cells = cellIds.map(id =>
        <td 
            id={id}
            key={id}
            onClick={!props.gameWon ? props.handleClick : null}
        ></td>);
    
    return(
        <tr id={props.rowId}>
            {cells}
        </tr>
    )
}

export default TableRow;