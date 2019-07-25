import React from 'react';
//import { isEmptyStatement } from '@babel/types';
import { FaCheck, FaFrown } from 'react-icons/fa';


class PhoneNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.phoneNumberMainClass = this;
    }
    
    state = {};

    getInitialState = () => {
        const initialState =
        {
            phonenumber: {
                numbers: [-1, -1, -1, -1]
            },
            status: {
                second: 0,
                status: 0,
                timer: ""
            },
            Orignal: {
                numbers: [-1, -1, -1, -1],
                numberShow: [-1, -1, -1, -1]
            },
            QuestionNos: {
                No1: 0,
                No2: 0
            },
            disabled: {
                firstTxt: 0,
                secondTxt: 0,
                thirdTxt: 0,
                forthTxt: 0
            },
            randomNo: {
                randomNos: 0,
                counter: 0
            },
            enteredNumbers: {
                enteredNumbers: [-2, -2, -2, -2]
            },
            results: {
                results: [-1, -1, -1, -1],
            },
            game: {
                run: 0
            }
        };
        return initialState;
    }

    newGame = () => {
        //var run = 0;
        if (this.state.status.status > 1) {
            resetAllInputFields();
            var tempState = this.state;
            //run = Number(tempState.game.run) + 1;
            tempState.results.results = [-1, -1, -1, -1];
            tempState.enteredNumbers.enteredNumbers = [-2, -2, -2, -2];
            tempState.randomNo.counter = 0;
            tempState.Orignal.numbers = [-1, -1, -1, -1];
            tempState.Orignal.numberShow = [-1, -1, -1, -1];
            tempState.status.status = 0;
            tempState.status.timer = "";
            tempState.phonenumber.numbers = [-1, -1, -1, -1];
            this.setState({ tempState });
        }
        this.updateQuestionNos();
        this.updateOrignalNumber();
        this.updateStatusBy1();
        this.tenSecondStartStop();
        setTimeout(() => this.tenSecondStartStop(), 5000);
    }

    updateQuestionNos = () => {                         //-Getting two numbers, which will be sum-upat the end
        var tempState = this.state.QuestionNos;
        tempState.No1 = getSingleNo();
        tempState.No2 = getSingleNo();
        this.setState({ tempState });
    }

    updateOrignalNumber = () => {
        var tempState = this.state;
        tempState.Orignal.numbers = getRandomNo();
        tempState.Orignal.numberShow = tempState.Orignal.numbers;
        this.setState({tempState});
    }

    updateStatusBy1 = () => {
        var tempState = this.state.status;
        tempState.status = tempState.status + 1;
        this.setState({ tempState });
        errorMsg(tempState.status);  
        if (tempState.status === 3) {
            document.getElementById("txtQuestinAnswer").focus();
        }
    }

    tenSecondStartStop = () => {
        var resetTimer = this.state.status;
        resetTimer.second = 0;
        resetTimer.timer = setInterval(() => { this.secondWait() }, 1000);
        this.setState({ resetTimer });
    }

    secondWait = () => {
        var increaseTimer = this.state.status;
        increaseTimer.second = increaseTimer.second + 1;
        if (increaseTimer.second < 5) {
            //------------------------------------this.setState({ increaseTimer });
        } else {
            //increaseTimer.second = 0;
            //increaseTimer.status = increaseTimer.status + 1;
            this.updateStatusBy1();
            clearInterval(this.state.status.timer);
        }
        this.setState({ increaseTimer });
    }
    
    CheckQuestionAnswer = () => {
        var values = this.state.QuestionNos;
        var enteredValue = document.getElementById("txtQuestinAnswer");
        var tempSumValue = (values.No1 + values.No2);
        if (Number(tempSumValue) === Number(enteredValue.value)) {
            this.updateStatusBy1();
            this.showInputTextField();            
        } else {
            alert("Anser is not correct.. Plz answer it again..");
            //var tempElement = document.getElementById("txtQuestinAnswer");
            enteredValue.value = "";
            enteredValue.focus();
            //-set
        }
    }

    showInputTextField = () => {
        var txtIDs = ["Txt1stNo", "Txt2ndNo", "Txt3rdNo", "Txt4thNo"];
        var stateRandomNo = this.state.randomNo;
        var tempResults = this.state.results.results;             var tempValue = -2;
        while (Number(tempValue) === -2) {
            var tempRandomNo = getRandomFrom0To3();                                                                         //-get a random number between 0-4
            tempValue = tempResults[tempRandomNo];
            if (Number(tempValue) === -1) {                                                                                                                  //-  -1 means, the values has never been asked
                tempResults[tempRandomNo] = 2;
                stateRandomNo.counter = Number(stateRandomNo.counter) + 1;
                this.setState({ stateRandomNo, tempResults });
                document.getElementById(txtIDs[tempRandomNo]).focus();
                tempValue = 2;
            } else {
                tempValue = -2;
            }
        }
    }
    
    checkEnteredValue = (value) => {
        var enteredValue = document.getElementById(value).value;
        var tempStateResult = this.state.results;
        var txtIDs = ["Txt1stNo", "Txt2ndNo", "Txt3rdNo", "Txt4thNo"];
        var clickedID = txtIDs.map(function (x) { if (x === value) { return x;}  }).indexOf(value);
        if (Number(enteredValue) === Number(this.state.Orignal.numbers[clickedID])) {
         tempStateResult.results[clickedID] = 10;
         } else {
         tempStateResult.results[clickedID] = 9;
         }
        this.setState({ tempStateResult });
        if (this.state.randomNo.counter < 4) {
            this.showInputTextField();
        }
        else {
            this.updateStatusBy1();
            var failed = 6;
            for (var i = 0; i < 4; i++) {
                if (Number(tempStateResult.results[i]) !== 10) { failed = 7; break; }
            }
            errorMsg(failed);

            //-Compare the hidden number with entered number and then show the result accordingly..
            alert("Game has finished!!");
        }
    }
    
    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-5 border">
                        <NewGameButtonRow second={this.state.status.second} status={this.state.status.status}  /> <hr />
                        <OrignalNumberShowRow number={this.state.Orignal.numberShow} status={this.state.status.status} /> <hr />
                        <RandomNumberShowRow status={this.state.status.status} /><hr />
                        <AskQuestionShowRow status={this.state.status.status} numbersToSum={this.state.QuestionNos} /><hr />
                        <ResponseMsgShowRow /> <hr />
                        <RandomNumberShowRow /><hr />
                        <div className="h6">Enter number as per asked: </div>
                        <FirstNumberShowRow  results={this.state.results.results} id={this.state.randomNo.randomNo} /><hr />
                        <SecondNumberShowRow results={this.state.results.results} id={this.state.randomNo.randomNo}/><hr />
                        <ThirdNumberShowRow results={this.state.results.results} id={this.state.randomNo.randomNo}/><hr />
                        <ForthNumberShowRow results={this.state.results.results} id={this.state.randomNo.randomNo}/><hr />
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
            <div className="col-2"> <kbd className="bg-danger mt-2">{props.second}</kbd></div>
            <div className="col-6 tempFontOpenSans py-1 text-danger"><span className=""> &#9816;</span>  Remember me  </div>
            <div className="col-4 noPadding text-right"><button type="button" onClick={window.phoneNumberMainClass.newGame} className="btn btn-warning btn-sm mt-1" disabled={Number(props.status) === 0 || Number(props.status) === 5 ? false : true}  >&#9760;  New game </button> </div>
        </div>
    );
}

const OrignalNumberShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4  text-info small"><span className={Number(props.statusNumber) === 1 ? "h6" : ""}>{Number(props.status) === 1 ? "Remember me" : 1 < props.status > 5 ? "Hidden No.":  "Hidden No.:"}</span></div>
            <div className="col-8 noPadding pl-0 ml-0 text-right "><span className={Number(props.status) === 1 ? "display-4" : Number(props.status) === 5 ? "display-4": ""}>{Number(props.status) === 1 || Number(props.status) === 5? props.number : "########"}  </span>  </div>
        </div>
    );
}

const RandomNumberShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-12" >
                <span className={Number(props.status) === 2 ? "display-2" : "d-none"}>{getSingleNo()} </span>
                <span className={Number(props.status) === 2 ? "display-2" : "d-none"}>{getSingleNo()} </span>
                <span className={Number(props.status) === 2 ? "display-2" : "d-none"}>{getSingleNo()} </span>
                <span className={Number(props.status) === 2 ? "display-2" : "d-none"}>{getSingleNo()} </span >
            </div>
        </div>
    );
}

const AskQuestionShowRow = (props) => {
    return (
        <span className={Number(props.status) === 3 ? "" : "d-none"}>
            <div className="row">
                <div className="col-12">Answer the quesiton:</div>
                <div className="col-4 text-right"> <span className="h4"> {props.numbersToSum.No1}  + {props.numbersToSum.No2} = </span></div>
                <div className="col-5"><input type="text" className=" form-control inputFont40" maxLength="3" id="txtQuestinAnswer"  />   </div>
                <div className="col-3"><input type="submit" className=" btn btn-success" maxLength="3" onClick={window.phoneNumberMainClass.CheckQuestionAnswer} id="btnQuestinAnswer" value="Check " />   </div>
            </div> </span>
    );
}
    
const FirstNumberShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4 text-right small text-bold ">
                <span className={Number(props.results[0]) === 2 ? 'text-info' : Number(props.results[0]) === 9 ? 'text-danger' : Number(props.results[0]) === 10 ? 'text-success' : ''}>
                    1st number: {Number(props.results[0]) === 9 ? <FaFrown /> : Number(props.results[0]) === 10 ? <FaCheck /> : ""}
                </span>
            </div>
            <div className="col-5 ml-0 pl-0">
                <input type="text" id="Txt1stNo" className="form-control inputFont40" maxLength="2"  />
            </div>
            <div className="col-3 text-right ml-0 pl-0 d-flex">
                <span className={Number(props.results[0]) === 2 ? 'd-block' : 'd-none'}>
                    <button type="button" onClick={(() => window.phoneNumberMainClass.checkEnteredValue("Txt1stNo"))} className="btn btn-warning small ml-0"> Check </button>
                </span>
            </div>
        </div>
    );
}

const SecondNumberShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4 text-right small text-bold ">
                <span className={Number(props.results[1]) === 2 ? 'text-info' : Number(props.results[1]) === 9 ? 'text-danger' : Number(props.results[1]) === 10 ? 'text-success' : ''}>
                    2nd number:
                {Number(props.results[1]) === 9 ? <FaFrown /> : Number(props.results[1]) === 10 ? <FaCheck /> : ""}</span>  </div>
            <div className="col-5 ml-0 pl-0 "> <input type="text" id="Txt2ndNo" className="form-control inputFont40" maxLength="2" /></div>
            <div className="col-3 text-right  ml-0 pl-0 d-flex"><span className={Number(props.results[1]) === 2 ? 'd-block' : 'd-none'}> <button type="button" onClick={(() => window.phoneNumberMainClass.checkEnteredValue("Txt2ndNo"))} className="btn btn-warning small ml-0"> Check </button></span></div>
        </div>
    );
}

const ThirdNumberShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4 text-right small text-bold ">
                <span className={Number(props.results[2]) === 2 ? 'text-info' : Number(props.results[2]) === 9 ? 'text-danger' : Number(props.results[2]) === 10 ? 'text-success' : ''}>
                    3rd number:
                {Number(props.results[2]) === 9 ? <FaFrown /> : Number(props.results[2]) === 10 ? <FaCheck /> : ""}</span>  </div>
            <div className="col-5 ml-0 pl-0 "> <input type="text" id="Txt3rdNo" className="form-control inputFont40" maxLength="2" /></div>
            <div className="col-3 text-right  ml-0 pl-0 d-flex"><span className={Number(props.results[2]) === 2 ? 'd-block' : 'd-none'}> <button type="button" onClick={(() => window.phoneNumberMainClass.checkEnteredValue("Txt3rdNo"))} className="btn btn-warning small ml-0"> Check </button></span></div>
        </div>
    );
}

const ForthNumberShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4 text-right small text-bold ">
                <span className={Number(props.results[3]) === 2 ? 'text-info' : Number(props.results[3]) === 9 ? 'text-danger' : Number(props.results[3]) === 10 ? 'text-success' : ''}>
                    4th number:
                {Number(props.results[3]) === 9 ? <FaFrown /> : Number(props.results[3]) === 10 ? <FaCheck /> : ""} </span>  </div>
            <div className="col-5 ml-0 pl-0"> <input type="text" id="Txt4thNo" className="form-control inputFont40" maxLength="2"  /></div>
            <div className="col-3 text-right ml-0 pl-0 d-flex"><span className={Number(props.results[3]) === 2 ? 'd-block' : 'd-none'}> <button type="button" onClick={(() => window.phoneNumberMainClass.checkEnteredValue("Txt4thNo"))} className="btn btn-warning small ml-0"> Check </button></span></div>
        </div>
    );
}

const GameInfoShowRow = () => {
    return (
        <div className="col-md-7 pl-5">
            <div className="text-left  text-dark">
                <div className="h4"> &#9816; Remeber Me  <span className="small"> (v.2) </span> </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Goal &#10095; </span> Short-timer memory development</li>
                    <li className="list-group-item"><span className="small text-info">Objective &#10095; </span>Remember an 8 digit number (34562389) in form of 4 double digits numbers (34, 56, 23, 89) for 10 seconds</li>
                    <li className="list-group-item"><span className="small text-info">Procudure &#10095;</span><br />
                        <ul>
                            <li>Press  <kbd className="bg-warning text-dark">New game</kbd> button</li>
                            <li>Read and remember the number visible for only 5 seconds</li>
                            <li>Answer the question and press  <kbd className="bg-success"> check</kbd> button </li>
                            <li>Enter double digit number as per asked and press <kbd className="bg-warning">Check </kbd> button.<br />
                                <small>Example: <br/>1st number of  34 23 45 23 is 34 <br/> 2nd number is 23 and so on..</small></li>
                        </ul>
                    </li>
                    <li className="list-group-item"><span className="small text-info">Tips &#10095; </span> Have fun..</li>
                </ul>
            </div>
        </div>
    );
}
/*pracised skill, Objective, Procedure, Tips */
const ResponseMsgShowRow = () => {
    return (
        <div className="row">
            <div className="col-12"><span className="small">Msg: </span> <span id="msgShow" className="text-danger small"> </span></div>
        </div>
    );
}

function getRandomNo() {
    var nos = [0, -2, -3, -4];
    for (var i = 0; i < 4; i++) {
        var tempNo = Math.floor((Math.random() * 99) + 0);
        if (i === 0 && tempNo < 10) { i = i - 1; }                                       //- first number should be less than 10 bcz phone number can't be like 04 23 12 45 
        else { tempNo < 10 ? nos[i] = ("0" + tempNo).slice(-2) : nos[i] = tempNo; }
    }
    return nos;
}

function getRandomFrom0To3() {
    var tempNo = Math.floor((Math.random() * 4) + 0);
    return tempNo;
}

function getSingleNo() {
    return Math.floor((Math.random() * 99) + 0);
}

function resetAllInputFields(){
    var inputArray = document.getElementsByTagName("input");
    for (var index = 0; index < inputArray.length; index++) {
        if (inputArray[index].type == "text") {
            inputArray[index].value = "";
        }
    }
}

function errorMsg(errorCode) {
    var errors = [
        "",
        "Try to remember the number.",
        "These are only few random numbers..",
        "Write sum of both numbers...",
        "Write double digit number as per asked....",
        "",
        " &#9996;  Weldone, you won the game...",
        " &#9785;  Sorry, you lost the game...!! "
    ]
    document.getElementById('msgShow').innerHTML = errors[errorCode];
}

export default PhoneNumber;