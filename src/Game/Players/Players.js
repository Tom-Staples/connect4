import React from 'react';

const Players = props => {
    const activeStyle = {
        backgroundColor: "#00FF40"
    };
    const inactiveStyle = {
        backgroundColor: "#FFFFFF"
    };
    return(
        <div id="players">
            <span id="player1" style={props.activePlayer === "player1" ? activeStyle : inactiveStyle}>Player 1</span>
            <span id="player2" style={props.activePlayer === "player2" ? activeStyle : inactiveStyle}>Player 2</span>
        </div>
    )
}

export default Players;