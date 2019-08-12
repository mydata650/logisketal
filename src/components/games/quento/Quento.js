import React from 'react';
import { FaCheck, FaFrown } from 'react-icons/fa';

class Quento extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.quentoMainClass = this;
    }
    
    state = {};
    getInitialState = () => {
        const initialState =
        {
            timeCounter: { timeCounter: 0 },
            readyMsg: {
                readyNo: 0,
                readyTimerLink: ""
            }, 
            questions: {
                correctAnswer: 0,
                wrongAnswer: 0,
                questionNo: 0,
                score: 0
            },
            status: { status: 0 }, 
            timer: { timer: 0 },
            //- even for number, odd for operator
            turn: { turn: 0 },
            //-means Done is enable, 1 means Reset enable
            buttTurn: {
                buttTurn: 0,
            },
            target: { target: 0 },
            userData: {
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                //- 3 for -, 5 for +
                operator: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                total: { total: 0 }
            },
            result: { result: 0 },
            digitsUsed: {
                digitsUsed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        };
        return initialState;
    }

    newGame = () => {
        if (Number(this.state.status.status) !== 0) {
            this.resetGame();
            this.updateQuestions();
        }
        else {
            this.updateTarget(getRandomNo());
            this.updateStatus(1);
        }
       
        this.startTimer();
    }

    resetGame = () => {
        //- reset the digits and operator
        //- reset turn to 0
        var tempData = this.state.userData; var tempTurn = this.state.turn; var tempResult = this.state.result; var tempDigitsUsed = this.state.digitsUsed;
        tempTurn.turn = 0;
        tempData.digits = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        tempData.operator = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        tempResult.result = 0;
        tempDigitsUsed.digitsUsed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.setState({ tempData, tempTurn, tempResult, tempDigitsUsed });
        this.updateTarget(getRandomNo());
        this.updateButtTurn(0);
    }

    updateQuestions = () => {
        var gameQuestions = this.state.questions;
        gameQuestions.correctAnswer = 0;
        gameQuestions.wrongAnswer = 0;
        gameQuestions.score = 0;
        this.setState({ gameQuestions});
    }

    updateStatus = (value) => {
        var tempState = this.state.status;
        tempState.status = value;
        this.setState({ tempState });
    }

    isTotalEqualsTarget = () => {
        var tempData = this.state.userData;
        var tempResult = this.state.result;
        var tempQuestion = this.state.questions;
        var total = 0; var operator = 0;

        for (var i = 0; i < Number(this.state.turn.turn) + 1; i++) {
            if (i % 2 === 0) {
                if (i === 0) { total = Number(tempData.digits[i]); }
                else {
                    total = (operator === 3) ? (total - Number(tempData.digits[i])) : (total + Number(tempData.digits[i]));
                }
            }
            else {
                operator = Number(tempData.operator[i]);
            }
        }
        tempResult.result = (total === Number(this.state.target.target)) ? 1 : 2;
        if (tempResult.result === 1) {
            tempQuestion.correctAnswer = tempQuestion.correctAnswer + 1;
            tempQuestion.score = tempQuestion.score + 1;
        } else {
            tempQuestion.wrongAnswer = tempQuestion.wrongAnswer + 1;
            tempQuestion.score = tempQuestion.score - 2;
        }
        this.updateButtTurn(1);
        this.setState({ tempResult, tempQuestion });
    }

    updateEnteredValue = (value) => {
        if (Number(value) === 3 || Number(value) === 5) {
            if (Number(this.state.turn.turn) % 2 === 0) { errorMsg(6); return false; }
            this.updateUserData(this.state.turn.turn, value);
        }
        else {
            if (Number(this.state.turn.turn) % 2 !== 0) { errorMsg(7); return false; }
            this.updateUserData(this.state.turn.turn, value);
            this.updateDigitsUsed(value);
        }
        this.updateTurn(Number(this.state.turn.turn) + 1);
        errorMsg(4);
    }

    updateDigitsUsed = (value) => {
        var gameDigitsUsed = this.state.digitsUsed;
        gameDigitsUsed.digitsUsed[value] = value;
        this.setState({ gameDigitsUsed});
    }
    updateUserData = (turn, value) => {
        var tempData = this.state.userData;
        if (Number(value) === 3 || Number(value) === 5) {
            tempData.operator[turn] = value;
        }
        else {
            tempData.digits[turn] = value;
        }
        this.setState({ tempData });
    }
    updateButtTurn = (value) => {
        var tempButtTurn = this.state.buttTurn;
        tempButtTurn.buttTurn = value;
        this.setState({ tempButtTurn });
    }
    updateTurn = (value) => {
        var tempTurn = this.state.turn;
        tempTurn.turn = value;
        this.setState({ tempTurn });
    }
    updateTarget = (value) => {
        var tempTarget = this.state.target;
        tempTarget.target = value;
        this.setState({ tempTarget });
    }
    startTimer = () => {
        //this.questionSetting();
        var startTimer = this.state.timeCounter;
        var gameStatus = this.state.status;
        var gameTimer = this.state.timer;
        startTimer.timeCounter = 0;
        this.setState({ startTimer });
        gameStatus.status = 1;
        this.runTimer();
        this.setState({ gameStatus, gameTimer });
    }
    runTimer = () => {
        var gameReadyMsg = this.state.readyMsg;
        //var gameDisabled = this.state.disabled;
        if (gameReadyMsg.readyNo < 3) {
            if (Number(gameReadyMsg.readyNo) === 0) { gameReadyMsg.readyTimerLink = setInterval(() => { this.runTimer() }, 500); }
            errorMsg(gameReadyMsg.readyNo);
            gameReadyMsg.readyNo = gameReadyMsg.readyNo + 1;
            this.setState({ gameReadyMsg });
        }
        else {
            clearInterval(this.state.readyMsg.readyTimerLink);
            errorMsg(4);
            var gameTimer = this.state.timer;
            gameReadyMsg.readyNo = 0;
           // gameDisabled.disabled = 1;
            this.setState({ gameTimer });
            this.setState({ gameReadyMsg });
            gameTimer.timer = setInterval(() => { this.workingTimer() }, 1000);
        }
    }
    workingTimer = () => {
        var timeCounter = this.state.timeCounter;
        timeCounter.timeCounter = timeCounter.timeCounter + 1;
        if (timeCounter.timeCounter > 60) {
            //var gameStatus = this.state.status;
            //gameStatus.status = 5;
            this.stopTimer();
            this.updateStatus(2);
           // this.disabledInputs();
            //this.setState({ gameStatus });
        }
        this.setState({ timeCounter });
    }
    stopTimer = () => {
        clearInterval(this.state.timer.timer);
    }
       
    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 border">
                        <NewGameButtonRow status={this.state.status.status} /> <hr />
                        <TimerShowRow timeCounter={this.state.timeCounter.timeCounter} /> <hr />
                        <ResultShowRow result={this.state.questions} /><hr />
                        <ResponseMsgShowRow /> <hr />
                        <UserEnterRow userData={this.state.userData} /> <hr />
                        <QuestionsShowRow status={this.state.status.status} result={this.state.result} target={this.state.target.target} buttTurn={this.state.buttTurn.buttTurn} digitsUsed={this.state.digitsUsed.digitsUsed} />
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
            <div className="col-4"> </div>
            <div className="col-4 tempFontOpenSans  py-1"> &#8474; Quento </div>
            <div className="col-4 noPadding text-right"><button type="button" onClick={window.quentoMainClass.newGame} className={Number(props.status) === 0 || Number(props.status) === 2 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 0 || Number(props.status) === 2 ? false : true}  >&#8474;  New game </button> </div>
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

const ResultShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4 small text-info" >Score: {props.result.score} </div>
            <div className="col-4 small text-success" >Correct Qu.  {props.result.correctAnswer} </div>
            <div className="col-4 small text-danger" >Wrong Qu. {props.result.wrongAnswer}</div>
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

const UserEnterRow = (props) => {
    return (
        <div className="row">
            <div className="col-12">
                <span className="small text-info">Values: </span>
                {Number(props.userData.digits[0]) !== 0 ? props.userData.digits[0] : ""}
                {Number(props.userData.operator[1]) === 3 ? "-" : Number(props.userData.operator[1]) === 5 ? "+": ""}
                {Number(props.userData.digits[2]) !== 0 ? props.userData.digits[2] : ""}
                {Number(props.userData.operator[3]) === 3 ? "-" : Number(props.userData.operator[3]) === 5 ? "+" : ""}
                {Number(props.userData.digits[4]) !== 0 ? props.userData.digits[4] : ""}
                {Number(props.userData.operator[5]) === 3? "-" : Number(props.userData.operator[5]) === 5 ? "+" : ""}
                {Number(props.userData.digits[6]) !== 0 ? props.userData.digits[6] : ""}
                {Number(props.userData.operator[7]) === 3 ? "-" : Number(props.userData.operator[7]) === 5 ? "+" : ""}
                {Number(props.userData.digits[8]) !== 0 ? props.userData.digits[8] : ""}
            </div>
        </div>
    );
}

const QuestionsShowRow = (props) => {
    return (
        <aside>
            <div className="row text-center">
                <div className="col-3 "></div>
                <div className="col-6 ">
                    <div className="row">
                        <div className="col-6 text-left"><span className="display-4 text-dark ">
                            {Number(props.result.result) === 1 ? <FaCheck /> : Number(props.result.result) === 2 ? <FaFrown /> : ""}</span>
                        </div>
                        <div className="col-6"><span className="display-4 text-danger"> {props.target}</span> </div>
                    </div>
                    <div className="row"><div className="col-12 pb-1 pt-0"><hr />  </div></div>
    
                    <div className="row noPadding">
                        <div className="col-4 noPadding" >
                            <button className="btn btn-dark btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(7) }}  disabled={Number(props.digitsUsed[7]) !== 0 ? true : false} ><span className="h3">7 </span></button>
                        </div>
                        <div className="col-4  noPadding">
                            <button className="btn btn-success btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(5) }} ><span className="h3">+ </span></button>
                            
                        </div>
                        <div className="col-4 noPadding">
                            <button className="btn btn-dark btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(6) }} disabled={Number(props.digitsUsed[6]) !== 0 ? true : false}><span className="h3">6 </span></button>
                        </div>
                    </div>
                    
                    <div className="row pt-1 ">
                        <div className="col-4 noPadding" >
                            <button className="btn btn-success btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(3) }} ><span className="h3">- </span></button>
                        </div>
                        <div className="col-4 noPadding">
                            <button className="btn btn-dark btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(1) }} disabled={Number(props.digitsUsed[1]) !== 0 ? true : false}><span className="h3">1 </span></button>

                        </div>
                        <div className="col-4 noPadding">
                            <button className="btn btn-success btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(5) }} ><span className="h3">+ </span></button>
                        </div>
                    </div>


                    <div className="row pt-1">
                        <div className="col-4 noPadding" >
                            <button className="btn btn-dark btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(2) }} disabled={Number(props.digitsUsed[2]) !== 0 ? true : false}><span className="h3">2 </span></button>
                        </div>
                        <div className="col-4  noPadding">
                            <button className="btn btn-success btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(3) }} ><span className="h3">- </span></button>

                        </div>
                        <div className="col-4 noPadding">
                            <button className="btn btn-dark btn-block " onClick={() => { window.quentoMainClass.updateEnteredValue(9) }} disabled={Number(props.digitsUsed[9]) !== 0 ? true : false}><span className="h3">9 </span></button>
                        </div>
                    </div>
                    <div className="row mt-1"><div className="col-12 pb-1 pt-0"><hr />  </div></div>
                    <div className="row">
                        <div className="col-6  ">
                            <button className="text-white btn btn-primary btn-block  " onClick={() => { window.quentoMainClass.resetGame() }} disabled={Number(props.status) === 2 || Number(props.buttTurn) === 0 ? true : false}> Next</button>
                         </div>
                        <div className="col-6  "  >
                            <button className="text-dark btn btn-warning btn-block " onClick={() => { window.quentoMainClass.isTotalEqualsTarget() }} disabled={Number(props.status) === 2 || Number(props.buttTurn) === 1 || Number(props.status) === 0 ? true : false}> Done</button>
                        </div>
                    </div>

                </div>
                <div className="col-sm-3"></div>
            </div>
            <br/>
        </aside>
    );
}

const GameInfoShowRow = () => {
    return (
        <div className="col-md-6 pl-5 mt-2">
            <div className="text-left  text-dark">
                <div className="h4"> &#8474; Quento </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Goal &#10095; </span> Simple logic development</li>
                    <li className="list-group-item"><span className="small text-info">Objective &#10095; </span>Get a target number as many as possible times by adding or substracting available unique digits.</li>
                    <li className="list-group-item"><span className="small text-info">Procudure &#10095;</span><br />
                        <ul>
                            <li>Press  <kbd className="bg-success text-white">New game</kbd> button</li>
                            <li>Look at the target number, e.g <span className="text-danger">20</span></li>
                            <li>Press a digit, then operator, again digit, then again operator and so on. Each digit is available only once</li>
                            <li>When result of entered digits equal to target number, then press <kbd className="bg-warning">Done</kbd>. e.g. (9 + 7 + 6 - 2) is correct for 20</li>
                            <li>If result is equal to target number, then score will increase by 1, otherwise will decrease by 2 (negative marking) </li>
                            <li>Then press <kbd className="bg-info">Next</kbd> button to see next target.                            </li>
                            <li>Try to get as much score as possible in one minute. Score above than 27 means, above than average player. </li>
                        </ul>
                    </li>
                    <li className="list-group-item"><span className="small text-info">Tips &#10095; </span>Best to play over mobile. Have fun..</li>
                </ul>
            </div>
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
        " First enter a vlaue!!",
        " First select an operator...!! ",
        " &#10097; Press rest button to start next round...!! "
    ]
    document.getElementById('msgShow').innerHTML = errors[errorCode];
}

function getRandomNo() {
    var randNo = Math.floor((Math.random() * 25)  + 1);
    return randNo;
}

export default Quento;