import React from 'react';

class PlaceMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.fastTrackMainClass = this;
    }

    state = {};
    getInitialState = () => {
        const initialState =
        {
            timeCounter: { timeCounter: 0 },
            timerLink: { timerLink: "" },
            timer: { timer: 0 },
            round: { round: 1 },
            questions: {
                correctAnswer: 0,
                wrongAnswer: 0,
                questionNo: 0,
                score: 0
            },
            //-using
            numbers: {
                hidden: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                results: [-1, -1, -1, -1, -1, -1, -1, -1],
                noOneShow: -1,
                noTwoShow: -1
            },
            status: { status: 0 },
            disabled: { disabled: 0 },
            readyMsg: {
                readyNo: 0,
                readyTimerLink: ""
            },
            textInputIDs: ["textID0", "textID1", "textID2", "textID3", "textID4", "textID5", "textID6", "textID7", "textID8"],
            hasEntered: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        return initialState;
    }
    newGame = () => {
        if (Number(this.state.status.status) === 2) {
            this.resetForNewGame();
        }
        //- Get random hidden number
        //- Calculate result accordingly and save them
        //- Get first number to shwo
        //- Get second number to show
        //- Set values to the inpput box
        var tempNoArray = getRandNoArry();
        this.updateHiddenNos(tempNoArray);
        tempNoArray = calculateResults(tempNoArray);
        this.updateResults(tempNoArray);
        tempNoArray = getTwoIndex();
        this.updateIndex(tempNoArray);
        setDisabledValues(tempNoArray, this.state.numbers.hidden, this.state.textInputIDs);
       // this.updateStatus();
        this.startTimer();
        //alert(this.state.numbers.noOneShow + "  :  " + this.state.numbers.noTwoShow + "   ::  " + this.state.numbers.hidden);
    }
    updateHiddenNos = (hiddenArray) => {
        var gameNumbers = this.state.numbers;
        gameNumbers.hidden = hiddenArray;
        this.setState({ gameNumbers });
    }
    updateResults = (hiddenArray) => {
        var gameNumbers = this.state.numbers;
        gameNumbers.results = hiddenArray;
        this.setState({ gameNumbers });
    }
    updateIndex = (hiddenArray) => {
        var gameNumbers = this.state.numbers;
        gameNumbers.noOneShow = hiddenArray[0];
        gameNumbers.noTwoShow = hiddenArray[1];
        this.setState({ gameNumbers });
        //-Line 86
        var gameEntered = this.state.hasEntered;
        for (var i = 0; i < gameEntered.length; i++) {
            if (gameNumbers.hidden[hiddenArray[0]] === i || gameNumbers.hidden[hiddenArray[1]] === i) {
                gameEntered[i] = 1;
            } else {
                gameEntered[i] = 0;
            }
        }
        //gameEntered[gameNumbers.hidden[hiddenArray[0]]] = 1;
        //gameEntered[gameNumbers.hidden[hiddenArray[1]]] = 1;
        this.setState({ gameEntered });
    }
    checkResult = () => {
        if (Number(this.state.status.status) === 2) { return false; }
        var idsArray = this.state.textInputIDs;
        var enteredValues = [0, 0 , 0 , 0 , 0, 0 , 0, 0, 0];
        for (var i = 0; i < idsArray.length; i++) {
            var value = document.getElementById(idsArray[i]).value;
            if (checkEmptyStr(value)) { enteredValues[i] = Number(value); }
        }
        if (!isDigitUnique(enteredValues)) {
            errorMsg(13);
            return false;
        } else { errorMsg(4); }
        var tempArray = calculateResults(enteredValues);
        if (isEqual(tempArray, this.state.numbers.results)) { errorMsg(10); }
        else { errorMsg(9); }
        this.updateStatus(2);
        this.stopTimer();
    }
    updateStatus = (value) => {
        var gameStatus = this.state.status;
        gameStatus.status = value;
        this.setState({ gameStatus });
    }
    resetForNewGame = () => {
        var gameIDS = this.state.textInputIDs;
        for (var i = 0; i < 9; i++) {
            document.getElementById(gameIDS[i]).value = "";
        }
    }
    workingTimer = () => {
        var timeCounter = this.state.timeCounter;
        timeCounter.timeCounter = timeCounter.timeCounter + 1;
        if (timeCounter.timeCounter > 60) {
            var gameStatus = this.state.status;
            gameStatus.status = 2;
            this.stopTimer();
            errorMsg(7);
            this.setState({ gameStatus });
        }
        this.setState({ timeCounter });
    }
    startTimer = () => {
        var startTimer = this.state.timeCounter;
        var gameStatus = this.state.status;
        var gameTimer = this.state.timer;
        startTimer.timeCounter = 0;
        this.setState({ startTimer });
        gameStatus.status = 1;
        this.runTimer();
        this.setState({ gameStatus, gameTimer });
    }
    stopTimer = () => {
        clearInterval(this.state.timer.timer);
    }
    runTimer = () => {
        var gameReadyMsg = this.state.readyMsg;
        var gameDisabled = this.state.disabled;
        if (gameReadyMsg.readyNo < 3) {
            if (Number(gameReadyMsg.readyNo) === 0) { gameReadyMsg.readyTimerLink = setInterval(() => { this.runTimer() }, 400); }
            errorMsg(gameReadyMsg.readyNo);
            gameReadyMsg.readyNo = gameReadyMsg.readyNo + 1;
            this.setState({ gameReadyMsg });
        }
        else {
            clearInterval(this.state.readyMsg.readyTimerLink);
            errorMsg(4);
            var gameTimer = this.state.timer;
            gameReadyMsg.readyNo = 0;
            gameDisabled.disabled = 1;
            this.setState({ gameTimer });
            this.setState({ gameReadyMsg });
            this.setState({ gameDisabled });
            gameTimer.timer = setInterval(() => { this.workingTimer() }, 1200);
            document.getElementById("textID0").focus();
        }
    }
    enterPressedLast = (e) => {
        if (e.key === 'Enter') {
            this.checkResult();
        }
        else if (e.keyCode === 9) {
            document.getElementById("testDiv").focus();
        }
    }
    enterPressed = (e) => {
        if (e.key == 'Enter') {
            { this.checkResult(); }
        }
    }
    handleClickDigit = (value, id) => {
        // var enteredValues = this.state.hasEntered;
        // var isValid = true;
        // isValid = isDigitUnique(value, enteredValues);
        // if (!isValid) { resetField(id);     errorMsg(13);   return false; }
        // else {
        //     enteredValues[value] = 1;
        //     this.setState({ enteredValues });
        // }
         if (value > 9 || value < 1) { errorMsg(12);  resetField(id); return false; }
        // if (value === "" || value === null  ) {                         
        //     enteredValues[value] = 0;
        // }
    }
render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 border">
                        <NewGameButtonRow status={this.state.status.status} fullState={this.state} /> <hr />
                        <TimerShowRow timeCounter={this.state.timeCounter.timeCounter} /> <hr />
                        <ResponseMsgShowRow /> <hr />
                        <div className="h6">Enter digist: </div>
                        <QuestionsShowRow numbers={this.state.numbers} qNo={this.state.questions.questionNo} result={this.state.questions.result} disab={this.state.disabled.disabled} inputIDs={this.state.textInputIDs} status={this.state.status.status} />
                    </div>
                    <GameInfoShowRow />
                </div>
            </div>
        );
    }
}

const NewGameButtonRow = (props) => {
    return (
        <div className="row headPad">
            <div className="col-4"><button type="button" onClick={window.fastTrackMainClass.checkResult} className={Number(props.status) === 1 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 1 ? false : true}  >&#10140; Check result </button></div>
            <div className="col-4 py-1">&#9906; PlaceMe   {props.statuus}  </div>
            <div className="col-4 noPadding text-right"><button type="button" onClick={window.fastTrackMainClass.newGame} className={Number(props.status) === 0 || Number(props.status) === 2 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 0 || Number(props.status) === 2 ? false : true}  >&#9906;  New game </button> </div>
        </div>
    );
}
const TimerShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="progress gameWidth">
                    <div className={props.timeCounter < 35 ? "progress-bar bg-success" : props.timeCounter < 50 ? "progress-bar bg-info" : "progress-bar bg-danger"} role="progressbar" style={{ width: (props.timeCounter * 1.67) + '%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

            </div>
        </div>
    );
}
const QuestionsShowRow = (props) => {
    return (
        <aside>
            <div className="row">
                <div className="col-1"> </div>
                <div className="col-2"><input type="number" id="textIR4" className="form-control padd2  text-center bg-info text-white" value={props.numbers.results[6]} disabled /> </div>
                <div className="col-2"><input type="number" id="textIR3" className="form-control padd2  text-center bg-info text-white" value={props.numbers.results[3]} disabled /> </div>
                <div className="col-2"><input type="number" id="textIR2" className="form-control padd2  text-center bg-info text-white" value={props.numbers.results[4]}  disabled /> </div>
                <div className="col-2"><input type="number" id="textIR1" className="form-control  padd2  text-center bg-info text-white" value={props.numbers.results[5]} disabled /> </div>
                <div className="col-2"><input type="number" id="textIR0" className="form-control padd2  text-center bg-info text-white" value={props.numbers.results[7]}  disabled /> </div>
                <div className="col-1"> </div>
            </div>

            <div className="row pt-4">
                <div className="col-1"> </div>
                <div className="col-2"><input type="number" id="textIR5" className="form-control padd2 text-center  bg-info text-white" value={props.numbers.results[0]} disabled /> </div>
                <div className="col-2">
                    <span id="testDiv" className="" tabIndex="0"  ></span>
                    <input type="number" id="textID0" className=" form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID0")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 0 || Number(props.numbers.noTwoShow) === 0 || Number(props.status) === 2 ? true : false} />
                </div>
                <div className="col-2"><input type="number" id="textID1" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID1")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 1 || Number(props.numbers.noTwoShow) === 1 || Number(props.status) === 2 ? true : false} /> </div>
                <div className="col-2"><input type="number" id="textID2" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID2")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 2 || Number(props.numbers.noTwoShow) === 2 || Number(props.status) === 2? true : false}/> </div>
                <div className="col-2"> </div>
                <div className="col-1"> </div>
            </div>

            <div className="row pt-4">
                <div className="col-1"> </div>
                <div className="col-2"><input type="number" id="textIR6" className="form-control padd2 text-center  bg-info text-white" value={props.numbers.results[1]} disabled /> </div>
                <div className="col-2"><input type="number" id="textID3" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID3")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 3 || Number(props.numbers.noTwoShow) === 3 || Number(props.status) === 2? true : false}/> </div>
                <div className="col-2"><input type="number" id="textID4" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID4")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 4 || Number(props.numbers.noTwoShow) === 4|| Number(props.status) === 2? true : false}/> </div>
                <div className="col-2"><input type="number" id="textID5" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID5")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 5 || Number(props.numbers.noTwoShow) === 5 || Number(props.status) === 2? true : false}/> </div>
                <div className="col-2"> </div>
                <div className="col-1"> </div>
            </div>

            <div className="row pt-4">
                <div className="col-1"> </div>
                <div className="col-2"><input type="number" id="textIR7" className="form-control padd2  text-center bg-info text-white" value={props.numbers.results[2]} disabled /> </div>
                <div className="col-2"><input type="number" id="textID6" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID6")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 6 || Number(props.numbers.noTwoShow) === 6 || Number(props.status) === 2? true : false}/> </div>
                <div className="col-2"><input type="number" id="textID7" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID7")} onKeyDown={window.fastTrackMainClass.enterPressed} disabled={Number(props.numbers.noOneShow) === 7 || Number(props.numbers.noTwoShow) === 7 || Number(props.status) === 2? true : false}/> </div>
                <div className="col-2"><input type="number" id="textID8" className="form-control inputFont20" onChange={e => window.fastTrackMainClass.handleClickDigit(e.target.value, "textID8")} onKeyDown={window.fastTrackMainClass.enterPressedLast} disabled={Number(props.numbers.noOneShow) === 8 || Number(props.numbers.noTwoShow) === 8 || Number(props.status) === 2? true : false}/> </div>
                <div className="col-2"> </div>
                <div className="col-1"> </div>
            </div><br/>
        </aside>

    );
}
const GameInfoShowRow = () => {
    return (
        <div className="col-md-6 pl-5 mt-3">
            <div className="text-left  text-dark">
                <div className="h4"> &#9906; PlaceMe </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Goal &#10095; </span> Simple logic development</li>
                    <li className="list-group-item"><span className="small text-info">Objective &#10095; </span>Place 9 unique digits on proper place with in give time.</li>
                    <li className="list-group-item"><span className="small text-info">Procudure &#10095;</span><br />
                        <ul>
                            <li>Press  <kbd className="bg-success text-white"> &#9906; New game</kbd> button</li>
                            <li>Waite for 3 seconds to start</li>
                            <li>For each box write a unique digit between 1 and 9, so the sum of any three numbers should be equal to pre-calculated number in diagonal, horizontal or vertical direcation. e.g. <kbd className="bg-info">12 </kbd></li>
                            <li>To check the game-result, press <kbd className="bg-dark">Enter</kbd> key on keyboard <br/>or press <kbd className="bg-success">&#10140;Check Result</kbd> button</li>
                            <li>Player wins the game, if all 9 digits are properly placed with in given time</li>
                            <li>Player lost the game, either by putting digits on wrong place or can not placed digits with in given time</li>
                        </ul>
                    </li>
                    <li className="list-group-item"><span className="small text-info">Tips &#10095; </span> Have fun..</li>
                </ul>
            </div>
        </div>
    );
}
const ResponseMsgShowRow = () => {
    return (
        <div className="row">
            <div className="col-12"><span className="small">Msg: </span> <span id="msgShow" className="text-danger small"> </span></div>
        </div>
    );
}
function errorMsg(errorCode) {
    var errors = [
        "Ready to start",
        "Ready. 1",
        "Ready.. 2",
        "Ready... 3",
        "",
        "5",
        " Enter a valid numeric value..",
        " &#9785;  Sorry, game is finished...!! ",
        " &#10097; Press rest button to start next round...!! ",
        " &#9785; Sorry, you lost the game",
        " -> Weldone, you won the game..",
        "11",
        "- Digits between 1 and 9 are allowed, boht 1 & 9 are included..", 
        "- Each digit should be unique and each input box should be filled",
        ""
    ]
    document.getElementById('msgShow').innerHTML = errors[errorCode];
}
function getRandNoArry() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var numbersNew = [];
    for (var i = 0; i <9; i++) {
        var tempNo = Math.floor((Math.random() * numbers.length) + 0);
        numbersNew[i] = numbers[tempNo];
        var newArray = [];
        var tempIndex = 0;
        for (var j = 0; j < numbers.length; j++) {
            if (tempNo !== j) {
                newArray[tempIndex] = numbers[j];
                tempIndex++;
            }
        }
        numbers = newArray;
    }
    return numbersNew;
}
function calculateResults(hiddenNos) {
    var resultArray = [];
    //- 0 for horizontal row 1 and so on
    //- 3 for vertical column 1 and so on
    //- 6th for left diagonal value
    //- 7th for right diagonal value
    //-  [0]  [1]  [2]
    //-  [3]  [4]  [5]
    //-  [6]  [7]  [8]

    resultArray[0] = hiddenNos[0] + hiddenNos[1] + hiddenNos[2];
    resultArray[1]  =  hiddenNos[3] + hiddenNos[4] + hiddenNos[5];
    resultArray[2]  =  hiddenNos[6] + hiddenNos[7] + hiddenNos[8];

    resultArray[3] = hiddenNos[0] + hiddenNos[3] + hiddenNos[6];
    resultArray[4] = hiddenNos[1] + hiddenNos[4] + hiddenNos[7];
    resultArray[5] = hiddenNos[2] + hiddenNos[5] + hiddenNos[8];

    resultArray[6] = hiddenNos[0] + hiddenNos[4] + hiddenNos[8];
    resultArray[7] = hiddenNos[2] + hiddenNos[4] + hiddenNos[6];
    return resultArray;
}
function getTwoIndex() {
    var resultArry = []; 
    resultArry[0] = Math.floor((Math.random() * 8) + 1);
    resultArry[1] = Math.floor((Math.random() * 8) + 1);
    while (resultArry[0] === resultArry[1]) {
        resultArry[1] = Math.floor((Math.random() * 8) + 1);
    }
    return resultArry
}
function setDisabledValues(indexArray, hiddenArray, idArray) {
    var firstIndex = indexArray[0];
    var secondIndex = indexArray[1];
    document.getElementById(idArray[firstIndex]).value = hiddenArray[firstIndex];
    document.getElementById(idArray[secondIndex]).value = hiddenArray[secondIndex];
}
function checkEmptyStr(str) {
    var result = true;
    str = str.trim();
    if (!str || 0 === str.length) { result = false; }
    if (!str || /^\s*$/.test(str)) { result = false; }
    if (str === "" ) {}
    //if (str.length === 0 || !str.trim()) { result = false;}
    return result;
}
function isEqual (value, other) {

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {

        // Get the object type
        var itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {

            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }

        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;

};
function isDigitUnique(savedAray) {
    var result = true;
    //[1, 7, 8, 2, 4, 3, 5, 6, 9] ->  [0, 1, 2, 3, 4, 5, ,6, 7, 8, 9]
    var enteredArray = [];
    for (var key in savedAray) { enteredArray[key] = savedAray[key]; }
    enteredArray.sort(function (a, b) { return a - b });
    var indexArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var i = 0; i <9; i++) {
        if (Number(indexArray[enteredArray[i]]) === 0) {
            indexArray[enteredArray[i]] = 1;
        } else {
            result = false;
            break;
        }
    }
    return result;
}
function resetField(id) {
    document.getElementById(id).value = "";
    document.getElementById(id).focus();
}


export default PlaceMe;