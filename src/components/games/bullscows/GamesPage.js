import React from 'react';
//import { original } from 'immer';
import { isEmptyStatement } from '@babel/types';
//import { FaBeer } from 'react-icons/fa';

class GamesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
   state = {};
    getInitialState = () => {
        const initialState = 
        {
           bullsCows: {
               guessed: 0,
               exist: 0,
               match: 0,
               stage: 0,
               digits: [-1, -2, -3, -4]
            },
            status: {
                status: 0, 
                timer: ""
            },
           Timer: {
               second: 0,
               minut: 0,
               hour: 0,
               runs: 0
           },
            Orignal: {
               digits: [-1, -2, -3, -4]
           },
            enteredNumber: {
               numbers: [0, 0, 0, 0, 0, 0, 0],
               exists: [0, 0, 0, 0, 0, 0, 0],
               matches: [0, 0, 0, 0, 0, 0, 0]
               }
        };
        return initialState;
    }
    handleCheckClick = event => {
        var cowBull = this.state.bullsCows;
        if (this.state.status.status === 1 || this.state.status.status === 2 ) { return false;}                   //-if game has finished somehow
        if (isAllDigitsAreProper(this.state.cowBull.digits) === false) { return false; }                         
        var tempStage = this.state.bullsCows.stage;
        var orignalArray = [];
        if (tempStage === 0) {                                                                                                           //-if game is starting
            orignalArray = getRandomNo();                                                                                       //-get random number
            var tempOrignal = this.state.Orignal;                                                                               //
            tempOrignal.digits = orignalArray;
            this.setState({ tempOrignal });                                                                                        //-update state with random/orignal number
        }
        else {
            orignalArray = this.state.Orignal.digits;
        }
        var enteredArray = this.state.cowBull.digits;
        tempStage++;
        var gameStatus = this.state.status;
        var numberEntered = this.state.enteredNumber;
        
        switch (tempStage) {                                                                                                        //-:> code should be improve but not getting idea how to do that
            case 1:
                numberEntered.numbers[0] = getNumberFromArray(enteredArray);
                numberEntered.exists[0] = digitsExist(orignalArray, enteredArray);
                numberEntered.matches[0] = digitsMatch(orignalArray, enteredArray);
                this.resetTimer();
                break;
            case 2:
                numberEntered.numbers[1] = getNumberFromArray(enteredArray);
                numberEntered.exists[1] = digitsExist(orignalArray, enteredArray);
                numberEntered.matches[1] = digitsMatch(orignalArray, enteredArray);
                break;
            case 3:
                numberEntered.numbers[2] = getNumberFromArray(enteredArray);
                numberEntered.exists[2] = digitsExist(orignalArray, enteredArray);
                numberEntered.matches[2] = digitsMatch(orignalArray, enteredArray);
                break;
            case 4:
                numberEntered.numbers[3] = getNumberFromArray(enteredArray);
                numberEntered.exists[3] = digitsExist(orignalArray, enteredArray);
                numberEntered.matches[3] = digitsMatch(orignalArray, enteredArray);
                break;
            case 5:
                numberEntered.numbers[4] = getNumberFromArray(enteredArray);
                numberEntered.exists[4] = digitsExist(orignalArray, enteredArray);
                numberEntered.matches[4] = digitsMatch(orignalArray, enteredArray);
                break;
            case 6:
                numberEntered.numbers[5] = getNumberFromArray(enteredArray);
                numberEntered.exists[5] = digitsExist(orignalArray, enteredArray);
                numberEntered.matches[5] = digitsMatch(orignalArray, enteredArray);
                break;
            case 7:
                numberEntered.numbers[6] = getNumberFromArray(enteredArray);
                numberEntered.exists[6] = digitsExist(orignalArray, enteredArray);
                numberEntered.matches[6] = digitsMatch(orignalArray, enteredArray);
                break;
			default:;
        }
        this.setState(numberEntered);
        cowBull = this.state.bullsCows;
        cowBull.stage = tempStage;
        cowBull.digits = [-1, -2, -3, -4];
        this.setState({ cowBull });

        if (digitsMatch(orignalArray, enteredArray) === 4) {                    
            gameStatus = this.state.status;
            gameStatus.status = 1;
            //this.setState({ gameStatus });
            errorMsg(4);
            this.stopTimer();
        }

        if (tempStage === 7 && gameStatus !== 1 && digitsMatch(orignalArray, enteredArray) !== 4) {
            gameStatus.status = 2;
            errorMsg(5);
            this.setState({ gameStatus });
            this.stopTimer();
            return false;
        }
        this.setState({ gameStatus });
        setEmptyDigitFields();
    } 
    handleClickDigit = (value, id) => {
        if (this.state.status.status === 1 || this.state.status.status === 2) { return false;  }
        var cowBull = this.state.bullsCows;
        var isValid = true;
        isValid = isDigitUnique(value, cowBull.digits);
        if (!isValid) { resetField(id); return false; }
        var fieldIDs = ["digit1", "digit2", "digit3", "digit4"];
        var resetValues = [-1, -2, -3, -4];
        if (value === "" || value === null || value === "" || isEmptyStatement(value)) {                          //-reseting 
            cowBull.digits[fieldIDs.indexOf(id)] = resetValues.indexOf(id);
        }
        else if (value < 0 || value > 9) {
            cowBull.digits[fieldIDs.indexOf(id)] = resetValues.indexOf(id);
            resetField(id);
        }
        else if (value === 0 && id === "digit1") { isValid = false; resetField(id); errorMsg(2); }                                   //- first digit should not be zero
        else { cowBull.digits[fieldIDs.indexOf(id)] = value; }
        if (isValid) { this.setState({ cowBull }); }
    }
    workingTimer = () => {
        var increaseTimer = this.state.Timer;
        increaseTimer.second = increaseTimer.second + 1;
        if (increaseTimer.second > 59) {
            increaseTimer.second = 0; increaseTimer.minut = increaseTimer.minut + 1;
            if (increaseTimer.minut > 59) {
                increaseTimer.minut = 0; increaseTimer.hour = increaseTimer.hour + 1;
            }
        }
        this.setState({ increaseTimer });
    }    
    resetTimer= () => {
        var resetTimer = this.state.Timer;
        resetTimer.second = 0; resetTimer.minut = 0; resetTimer.hour = 0;
        this.setState({ resetTimer });
        if (resetTimer.runs === 0) {
            var gameStatus = this.state.status;
            gameStatus.timer = setInterval(() => { this.workingTimer() }, 1000);
            this.setState({ gameStatus});
             resetTimer.runs = 1;
            this.setState({ resetTimer });
        }
    }
    newGame = () => {
        setEmptyDigitFields();
        this.setState(this.getInitialState());
        errorMsg(6);
     }
    stopTimer = () => {
        clearInterval(this.state.status.timer);
    }
    enterPressed = (e) => {
       if (e.key === 'Enter') {
             this.handleCheckClick(); 
       }
    }
    enterPressedLast = (e) => {
        if (e.key === 'Enter') {
			this.handleCheckClick(); 
        }
        else if (e.keyCode === 9) {
            document.getElementById("focusguard-1").focus();
        }
    }
    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-5 border">
                        <div className="row headPad">
                            <div className="col-3"><button type="button" className="btn btn-info btn-sm mt-1" onClick={this.handleCheckClick} id="checkButton" >Check </button> </div>
                            <div className="col-7"><span className="tempFontOpenSans pt-3 h-100"> &#8506; BullsCows </span></div>
                            <div className="col-2 noPadding"><button type="button" onClick={this.newGame} className="btn btn-info btn-sm mt-1">Reset </button> </div>
                        </div>                        <hr />
                        <div className="row">
                            <div className="col-4">Enter No.</div>
                            <div className="focusguard" id="focusguard-1" tabIndex="1"></div>
                            <div className="col-2 noPadding"><input type="number" className="form-control" autoFocus min="0" max="9" step="1" id="digit1" tabIndex="2" onKeyDown={this.enterPressed} onChange={e => this.handleClickDigit(e.target.value, "digit1")} />  </div>       
                            <div className="col-2 noPadding"><input type="number" className="form-control" min="0" max="9" step="1" id="digit2" tabIndex="3" onKeyDown={this.enterPressed} onChange={e => this.handleClickDigit(e.target.value, "digit2")}/></div>       
                            <div className="col-2 noPadding"><input type="number" className="form-control" min="0" max="9" step="1" id="digit3" tabIndex="4" onKeyDown={this.enterPressed} onChange={e => this.handleClickDigit(e.target.value, "digit3")}  /></div>       
                            <div className="col-2 noPadding"><input type="number" className="form-control" min="0" max="9" step="1" id="digit4" tabIndex="5" onKeyDown={this.enterPressedLast} onChange={e => this.handleClickDigit(e.target.value, "digit4")} /></div>       
                           </div>                        <hr />
                        <div className="row">
                            <div className="col-12"><span className="small">Msg: </span> <span id="msgShow" className={this.state.status.status === 1 ? "small text-success" : (this.state.status.status === 2 ? "small text-danger" : "small text-info")}> </span></div>
                        </div>                        <hr />
                        <div className="row">
                            <div className="col-6">{this.state.Timer.hour} : {this.state.Timer.minut} : {this.state.Timer.second} </div>
                            <div className="col-6"><span className="small">Hidden No.  </span>
                                <span className={this.state.status.status === 0 ? "text-warning  h5" : "text-success h3"} >
                                        {this.state.status.status === 0 ? "????" : getNumberFromArray(this.state.Orignal.digits)}
                                </span>
                            </div>
                       </div>                        <hr />
                        <div className="row">
                            <div className="col-6"> <u>Guessed  </u></div>
                            <div className="col-3"> <u>Exist</u></div>  
                            <div className="col-3"> <u>Match</u> </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess-1" value={this.state.bullsCows.stage > 0 ? (this.state.enteredNumber.numbers[0]) : ''} disabled /></div>
                            <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Exis" value={this.state.bullsCows.stage > 0 ? (this.state.enteredNumber.exists[0]) : ''} disabled /></div>
                            <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Match" value={this.state.bullsCows.stage > 0 ? (this.state.enteredNumber.matches[0]) : ''} disabled /> </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess2" value={this.state.bullsCows.stage > 1 ? (this.state.enteredNumber.numbers[1]) : ''} disabled /></div>
                            <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Exis" value={this.state.bullsCows.stage > 1 ? (this.state.enteredNumber.exists[1]) : ''} disabled/></div>
                            <div className="col-3"> <input type="test" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Match" value={this.state.bullsCows.stage > 1 ? (this.state.enteredNumber.matches[1]) : ''} disabled/> </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess3" value={this.state.bullsCows.stage > 2 ? (this.state.enteredNumber.numbers[2]) : ''} disabled /></div>
                            <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Exis" value={this.state.bullsCows.stage > 2 ? (this.state.enteredNumber.exists[2]) : ''} disabled/></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Match" value={this.state.bullsCows.stage > 2 ? (this.state.enteredNumber.matches[2]) : ''} disabled/> </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess4" value={this.state.bullsCows.stage > 3 ? (this.state.enteredNumber.numbers[3]) : ''} disabled/></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Exis" value={this.state.bullsCows.stage > 3 ? (this.state.enteredNumber.exists[3]) : ''} disabled /></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Match" value={this.state.bullsCows.stage > 3 ? (this.state.enteredNumber.matches[3]) : ''} disabled/> </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess5" value={this.state.bullsCows.stage > 4 ? (this.state.enteredNumber.numbers[4]) : ''} disabled/></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Exis" value={this.state.bullsCows.stage > 4 ? (this.state.enteredNumber.exists[4]) : ''} disabled /></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Match" value={this.state.bullsCows.stage > 4 ? (this.state.enteredNumber.matches[4]) : ''} disabled/> </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess6" value={this.state.bullsCows.stage > 5 ? (this.state.enteredNumber.numbers[5]) : ''} disabled /></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Exis" value={this.state.bullsCows.stage > 5 ? (this.state.enteredNumber.exists[5]) : ''} disabled/></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Match" value={this.state.bullsCows.stage > 5 ? (this.state.enteredNumber.matches[5]) : ''} disabled /> </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess7" value={this.state.bullsCows.stage > 6 ? (this.state.enteredNumber.numbers[6]) : ''} disabled /></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Exis" value={this.state.bullsCows.stage > 6 ? (this.state.enteredNumber.exists[6]) : ''} disabled/></div>
                            <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" min="0" max="9" step="1" id="digit1Match" value={this.state.bullsCows.stage > 6 ? (this.state.enteredNumber.matches[6]) : ''} disabled/> </div>
                        </div>
                    </div>
                    <GameInfoRowShow />
                </div>
           </div>
        );
    }
}

const GameInfoRowShow = () => {
    return (
        <div className="col-md-6 pl-5">
            <div className="text-left  text-dark">
                <div className="h4">  &#8506; BullsCows </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Goal &#10095; </span> simple logic development</li>
                    <li className="list-group-item"><span className="small text-info">Objective &#10095; </span>find a 4 digit hidden number with in 7 chances</li>
                    <li className="list-group-item"><span className="small text-info">Procudure &#10095;</span><br />
                        <ul>
                            <li>Enter 1st digit in 1st input-box, 2nd digit in 2nd box and so. All input-boxes should be filled with unique digits.</li>
                            <li>Press <kbd className="bg-dark text-white">Enter</kbd> from keyboard or press <kbd className="bg-info">Check</kbd> button on screen</li>
                            <li>There can be two types of result: number is found OR number is not found</li>
                            <li className="text-success">If number is found, then task is accomplished, well-done, player won the game</li>
                            <li>Otherwise, there will visible three types of numbers: <br />
                                <ul>
                                    <li><b>Guessed</b>: player entered number</li>
                                    <li><b>Exist</b>: number of digits exists in Gussed number  and Hidden number. <br /> <span className="small">Eg. Gussed number is 4317 but Hidden number is 1897, so Exist = 2 because [1, 7] are existed in both numbers</span>  </li>
                                    <li><b>Match</b>: number of digist located at same location in both numbers <br /><span className="small">Eg. in case of 4317 as Gussed and 1897 as Hidden number, then Match= 1 because 7 is only digit which exists not only in both number but also at correct location.  </span></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="list-group-item"><span className="small text-info">Tips &#10095; </span> Have fun..</li>
                </ul>
            </div>
        </div>
    )
}


function isAllDigitsAreProper(array) {
    var result = true
    for (var i = 0; i < array.length; i++) {
        if (array[i] < 0  || array[i] > 9) {
            result = false;
            errorMsg(3);
            break;
        }
    } 
   
    return result;
}
function errorMsg(errorCode) {
    var errors = [
        "Error-0, system error, kindly contact to administrator", 
        "Error-1, each digit should be unique",
        "Error-2, number cannot start with 0",
        "Enter all 4 digits between [0,9], both included.",
        "Weldone: you have guessed the right number!!",
        "Unfortunately, you lost the game",
        ""
    ]
    document.getElementById('msgShow').innerHTML = errors[errorCode];
}
function getRandomNo() {
    
    var nos = [0, -2, -3, -4];
    var counter = 0;
    while (counter < 4) {
        var tempNo = Math.floor((Math.random() * 10) + 0);
        var exists = false;
        for (var i = 0; i < counter + 1; i++) {
            if (nos[i] === tempNo) { exists = true; }
        }
        if (exists === false) {
            nos[counter] = tempNo;
            counter++;
        }
    }
    return nos;
}
function getNumberFromArray(arry) {
    var textVal = "";
    for (var i = 0; i < arry.length; i++) {
        textVal += arry[i]
    }
    return parseInt(textVal, 10);
}
function digitsExist(orignalArray, enteredArray) {
    var existedNumber = 0;
    for (var i = 0; i < orignalArray.length; i++) {
        for (var j = 0; j < enteredArray.length; j++) {
            if (orignalArray[i] == enteredArray[j]) { existedNumber++;}
        }
    }
    return existedNumber;
}
function digitsMatch(orignalArray, enteredArray) {
    var matchedNumbers = 0;
    for (var i = 0; i < 4; i++) {
        if (orignalArray[i] == enteredArray[i]) {
            matchedNumbers++;
        }
    }
    return matchedNumbers;
}
function setEmptyDigitFields() {
    document.getElementById("digit1").value = "";
    document.getElementById("digit2").value = "";
    document.getElementById("digit3").value = "";
    document.getElementById("digit4").value = "";
    document.getElementById("digit1").focus();
}
function isDigitUnique(value, savedAray) {
    var result = true;
    for (var i = 0; i < 4; i++) {
        if (value === savedAray[i]) { result = false; break;   }
    }
    return result;
}
function resetField(id) {
    document.getElementById(id).value = "";
    document.getElementById(id).focus();
    errorMsg(1)
}

export default GamesPage;