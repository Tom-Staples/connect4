import React from 'react';   

const Output = (props) => {
    let activeMessage = "";
    if (props.gameWon) {
        activeMessage = props.activePlayer + " wins!";
    }
    else if (props.p1Cells.length === 21 && props.p2Cells.length === 21) {
        activeMessage = "It's a draw!";
    }
    else {
        activeMessage = "It's your turn " + props.activePlayer;
    }
    return(
        <p id="output">{activeMessage}</p>
    )
}

export default Output;