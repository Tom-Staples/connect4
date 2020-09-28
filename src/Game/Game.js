import React, {Component} from 'react';
import Output from './Output/Output';
import GameBoard from './GameBoard/GameBoard';
import Players from './Players/Players';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            activePlayer: "",
            inactivePlayer: "",
            gameWon: false,
            counterColour: "",
            clickedCellsP1: [],
            clickedCellsP2: [] 
        };
    }

    validClick = (event) => {
        const {id, parentElement} = event.target;
        if (
            this.state.clickedCellsP1.indexOf(id) !== -1 ||
            this.state.clickedCellsP2.indexOf(id) !== -1
        ) {
            return false;
        }
        else if(
            this.state.clickedCellsP1.indexOf(((id / 1) + 10).toString()) !== -1 ||
            this.state.clickedCellsP2.indexOf(((id / 1) + 10).toString()) !== -1
        ) {
            return true;
        }
        else if (parentElement.id === "row5") {
            return true;
        }
        else {
            return false;
        }
    }


    verticalCheck = (event, clickedCells) => {
        const {id} = event.target;
        let counter = 1;
        for (let i = (id / 1) + 10; counter <=4; i = i + 10) {
            if (counter === 4) {
                return true;
            }
            else if (clickedCells.indexOf(i.toString()) !== -1) {
                counter++;
            }
            else {
                return false;
            }
        }
    }

    horizontalCheck = (event, clickedCells) => {
        const {id} = event.target;
        let counter = 1;
        for (let i = (id / 1) - 1; counter <=4; i--) {
            if (counter === 4) {
                return true;
            }
            else if (clickedCells.indexOf(i.toString()) !== -1) {
                counter++;
            }
            else {
                for (let j = (id / 1 ) + 1; counter <=4; j++) {
                    if (counter === 4) {
                        return true;
                    }
                    else if (clickedCells.indexOf(j.toString()) !== -1) {
                        counter++;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }

    diagonalCheck = (event, clickedCells) => {
        const {id} = event.target;
        let counter = 1;
        for (let i = (id / 1) - 9; counter <= 4; i = i - 9) {
            if (counter === 4) {
                return true;
            }
            else if (clickedCells.indexOf(i.toString()) !== -1) {
                counter++
            }
            else {
                for (let j = (id / 1) + 9; counter <= 4; j = j + 9) {
                    if (counter === 4) {
                        return true;
                    }
                    else if (clickedCells.indexOf(j.toString()) !== - 1) {
                        counter++;
                    }
                    else {
                        counter = 1;
                        for (let k = (id / 1) - 11; counter <= 4; k = k - 11) {
                            if (counter === 4) {
                                return true;
                            }
                            else if (clickedCells.indexOf(k.toString()) !== -1) {
                                counter++;
                            }
                            else {
                                for (let l = (id / 1) + 11; counter <= 4; l = l + 11) {
                                    if (counter === 4) {
                                        return true;
                                    }
                                    else if (clickedCells.indexOf(l.toString()) !== -1) {
                                        counter++;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    winClick = (event) => {
        const clickedCells = this.state.activePlayer === "player1" ? this.state.clickedCellsP1 : this.state.clickedCellsP2;
        if (this.verticalCheck(event, clickedCells) || this.horizontalCheck(event, clickedCells) || this.diagonalCheck(event, clickedCells)) {
           return true;
       }
       return false;
    }

    handleClick = (event) => {
        const {id, style} = event.target;
       if(this.validClick(event) && !this.winClick(event)) {
            style.backgroundColor = this.state.counterColour;

            this.setState(prevState => {
                const p1Cells = prevState.clickedCellsP1;
                const p2Cells = prevState.clickedCellsP2;
                if (prevState.activePlayer === "player1") {
                    p1Cells.push(id);
                    return {
                        activePlayer: "player2",
                        inactivePlayer: "player1",
                        counterColour: "#ffa500",
                        clickedCellsP1: p1Cells
                    }
                }
                else {
                 p2Cells.push(id);
                    return {
                        activePlayer: "player1",
                        inactivePlayer: "player2",
                        counterColour: "#0099cc",
                        clickedCellsP2: p2Cells
                    }
                }
            })
       }
       else if(this.validClick(event) && this.winClick(event)) {
           style.backgroundColor = this.state.counterColour;

           this.setState(prevState => {
               const p1Cells = prevState.clickedCellsP1;
               const p2Cells = prevState.clickedCellsP2;
               if (prevState.activePlayer === "player1") {
                   p1Cells.push(id);
                   return {
                       clickedCellsP1: p1Cells,
                       gameWon: true
                   }
               }
               else {
                   p2Cells.push(id);
                   return {
                       clickedCellsP2: p2Cells,
                       gameWon: true
                   }
               }
           })
       }
       else {
           return;
       }
    }

    UNSAFE_componentWillMount() {
        const number = Math.floor(Math.random() * 2);
        if (number === 0) {
            this.setState({
                activePlayer: "player1",
                inactivePlayer: "player2",
                counterColour: "#0099cc"
            })
        }
        else {
            this.setState({
                activePlayer: "player2",
                inactivePlayer: "player1",
                counterColour: "#ffa500"
            })
        }
    }

    render() {
        return(
            <div>
                <Output
                    activePlayer={this.state.activePlayer}
                    inactivePlayer={this.state.inactivePlayer}
                    gameWon={this.state.gameWon}
                    p1Cells={this.state.clickedCellsP1}
                    p2Cells={this.state.clickedCellsP2}
                />
                <GameBoard
                    handleClick={this.handleClick}
                    gameWon={this.state.gameWon}
                />
                <Players
                    activePlayer={this.state.activePlayer}
                />
            </div>    
        ) 
    }
}

export default Game;