import React from 'react';
//import { isEmptyStatement } from '@babel/types';
//import { FaCheck, FaFrown } from 'react-icons/fa';

class FastTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.fastTrackMainClass = this;
    }
    
    state = {};
    getInitialState = () => {
        const initialState =
        {
            timeCounter: {  timeCounter: 0},
            timerLink: { timerLink: "" },
            timer: { timer: 0 },
            round: { round: 1},
            questions: {
                correctAnswer: 0, 
                wrongAnswer: 0,
                questionNo: 0,
                score: 0,
                result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
            },
            numbers: {
                nomues: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                denomes: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                operators: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            },
            status: { status: 0 }, 
            disabled: {disabled: 0},
            readyMsg: {
                readyNo: 0,
                readyTimerLink: ""
            }, 
            textInputIDs: ["textID0", "textID1", "textID2", "textID3", "textID4", "textID5", "textID6", "textID7", "textID8", "textID9" ]
        };
        return initialState;
    }
                //-will start new or reset new game logic
    newGame = () => {
        if (Number(this.state.status.status) === 5) {
            this.resetForNewGame();
        }
        else if(Number(this.state.status.status) === 2) {
            this.resetForNextRound();
        }
        this.startTimer();
    }
              //-Runs every single second. Check if timeCounter has passed 60 timeCounter
    workingTimer = () => {
        var timeCounter = this.state.timeCounter;
        timeCounter.timeCounter = timeCounter.timeCounter + 1;
        if (timeCounter.timeCounter > 60) {
            var gameStatus = this.state.status;
            gameStatus.status = 5;
            this.stopTimer();
            this.disabledInputs();
            this.setState({ gameStatus });
        }
        this.setState({ timeCounter });
    }
             //- Only initialized few state for timer
    startTimer = () => {
        this.questionSetting();
        var startTimer = this.state.timeCounter;
        var gameStatus = this.state.status;
        var gameTimer = this.state.timer;
        startTimer.timeCounter = 0; 
        this.setState({startTimer });
        gameStatus.status = 1;
        this.runTimer();
        this.setState({ gameStatus, gameTimer });
    }
             //- will stop timer
    stopTimer = () => {
        clearInterval(this.state.timer.timer);
    }
            //- Having setInverval, which calls other method every 1 seconds or based on round number..
    runTimer = () => {
        var gameReadyMsg = this.state.readyMsg;
        var gameDisabled = this.state.disabled;
        if (gameReadyMsg.readyNo < 3) {
            if (Number(gameReadyMsg.readyNo) === 0) { gameReadyMsg.readyTimerLink = setInterval(() => { this.runTimer() }, 1000); }
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
            this.setState({ gameTimer});
            this.setState({gameReadyMsg});
            this.setState({ gameDisabled });
            if (Number(this.state.round.round) === 1) {
                gameTimer.timer = setInterval(() => { this.workingTimer() }, 1000);
            }
            else if (Number(this.state.round.round) === 2){
                gameTimer.timer = setInterval(() => { this.workingTimer() }, 900);
            }
            else if (Number(this.state.round.round) === 3) {
                gameTimer.timer = setInterval(() => { this.workingTimer() }, 800);
            }
            else {
                gameTimer.timer = setInterval(() => { this.workingTimer() }, 700);
            }
            document.getElementById("textID0").focus();
        }
    }
            //-Getting basic arithmetic questions and saving them into state
    questionSetting = () => {
        var operators = [10];   var numes = [10];       var denumes = [10];
        for (var i = 0; i < 10; i++) {
            operators[i] = Math.floor((Math.random() * 4) + 0);
            if (Number(operators[i]) === 0) {
                //-addition
                numes[i] = Math.floor((Math.random() * 99) + 0);
                denumes[i] = Math.floor((Math.random() * 99) + 0);
            }
            else if (Number(operators[i]) === 1) {
                //-substraction:   first number should be greater than 2nd number
                denumes[i] = Math.floor((Math.random() * 99) + 0);
                numes[i] = Math.floor((Math.random() * 999) + denumes[i]);
            }
            else if (Number(operators[i]) === 2) {
                //-multiplication
                numes[i] = Math.floor((Math.random() * 20) + 0);
                denumes[i] = Math.floor((Math.random() * 30) + 0);
            }
            else if (Number(operators[i]) === 3) {
                //-division
                 denumes[i] = Math.floor((Math.random() * 20) + 1);
                var tempRand = Math.floor((Math.random() * 30) + 0);
                numes[i] = denumes[i] * tempRand; 
            }
        }
        var gameNumbers = this.state.numbers;
        gameNumbers.operators = operators;
        gameNumbers.denomes = denumes;
        gameNumbers.nomues = numes;
    }
            //-timeCounter is like second and player has to answer 10 question in 60 timeCounter, but it answer is wrong, then 8 timeCounter will increase but correct will reduce 2
    updateTimeCounter = (result) => {
        //-wrong question will 8 seconds and right question will earn 2 seconds
        var gameTimeCounter = this.state.timeCounter;
        if (Number(result) === 1) { gameTimeCounter.timeCounter = gameTimeCounter.timeCounter - 2; }
        else if (Number(result) === 2) { gameTimeCounter.timeCounter = gameTimeCounter.timeCounter + 8; }
        this.setState({ gameTimeCounter });
    }
         //- Either timeCounter > 59 or QuesnotNo > 9 , then Stop the timer
    isEndOfGame = () => {
         var result = false;
        if (this.state.questions.questionNo > 9 || this.state.timeCounter.timeCounter > 59) {
            this.stopTimer();
            result = true;
        }
        return result;
    }
        //-As soon as, pleyer will solve all question, will get extra points
    calculateRemainTime = () => {
        if (this.state.timeCounter.timeCounter < 61) { this.updateScore(0, 0, 60 - this.state.timeCounter.timeCounter, 0,  0); }
    }
        //- Helping method
    resetStatus = (value) => {
        var gameStatus = this.state.status;
        gameStatus.status = value;
        this.setState({ gameStatus });
    }
        //- helping method
    updateScore = (correctAnswer, wrongAnswer, score, resultStatus, questionIncrement) => {
        var gameQuestions = this.state.questions;
        gameQuestions.correctAnswer = gameQuestions.correctAnswer + correctAnswer;
        gameQuestions.wrongAnswer = gameQuestions.wrongAnswer + wrongAnswer;
        gameQuestions.result[gameQuestions.questionNo] = resultStatus;
        gameQuestions.questionNo = gameQuestions.questionNo + questionIncrement;
        gameQuestions.score = gameQuestions.score + score;
        this.setState({ gameQuestions });
    }
        //- reseting whole state for new game
    resetForNewGame = () => {
        var r = this.state.round;
        var q = this.state.questions;
        var n = this.state.numbers;
        var d = this.state.disabled;
        var rm = this.state.readyMsg;
        var ip = this.state.textInputIDs;
        r.round = 1;
        q.correctAnswer = 0; q.wrongAnswer = 0; q.questionNo = 0; q.score = 0; q.result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        n.nomues = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        n.denomes = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        n.operators = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        d.disabled = 0;
        rm.readyNo = 0;
        this.setState({r});
        this.setState({q});
        this.setState({n});
        this.setState({ d });
        this.setState({ rm });
        for (var i = 0; i < 10; i++) {
            document.getElementById(ip[i]).value = "";
        }
    }
        //- reseting whole state for new game
    resetForNextRound = () => {
        var r = this.state.round;
        var q = this.state.questions;
        var n = this.state.numbers;
        var d = this.state.disabled;
        var rm = this.state.readyMsg;
        var ip = this.state.textInputIDs;
        r.round = r.round + 1;     
        q.questionNo = 0;  q.result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        n.nomues = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        n.denomes = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        n.operators = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        d.disabled = 0;
        rm.readyNo = 0;
        this.setState({ r });
        this.setState({ q });
        this.setState({ n });
        this.setState({ d });
        this.setState({ rm });
        for (var i = 0; i < 10; i++) {
            document.getElementById(ip[i]).value = "";
        }
    }
        //-set state, so input fields becomes disabled. It also decide about victory or defeat of the game
    disabledInputs = () => {
        var gameDisabled = this.state.disabled;
        gameDisabled.disabled = 0;
        this.setState({ gameDisabled });
        if (this.state.timeCounter.timeCounter < 61 && this.state.questions.questionNo > 9) { errorMsg(8); this.resetStatus(2); }
        else { errorMsg(7); this.resetStatus(5); }
    }
        //-Checking entere value in input text field
    checkEnteredValue = (value) => {
        var gameQuestions = this.state.questions;
        var gameNumbers = this.state.numbers;
        var tempID = "textID" + gameQuestions.questionNo;
        var enteredValue = document.getElementById(tempID).value
        if (!checkEnteredValue(enteredValue, tempID)) { return false;}
        if (checkAnswer(gameNumbers.operators[gameQuestions.questionNo], gameNumbers.nomues[gameQuestions.questionNo], gameNumbers.denomes[gameQuestions.questionNo], enteredValue)) {
            //--------------------------------------------Answer is correct
            this.updateTimeCounter(1);
            this.updateScore(1, 0, 1, 1, 1);
        } else {
            this.updateTimeCounter(2);
            this.updateScore(0, 1, -1, 2, 1);
        }
        if (this.isEndOfGame()) {
            this.calculateRemainTime();
            this.disabledInputs();
        }
        else {
            tempID = "textID" + (gameQuestions.questionNo);
            document.getElementById(tempID).disabled = false;
            document.getElementById(tempID).focus();
        }
    }
        //-Check entered valued with 'Enter key'
    enterPressed = (e) => {
        if (e.key == 'Enter') {
            { this.checkEnteredValue(); }
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 border">
                        <NewGameButtonRow status={this.state.status.status} fullState={this.state} /> <hr />
                        <TimerShowRow timeCounter={this.state.timeCounter.timeCounter} /> <hr />
                        <ResultShowRow result={this.state.questions} /><hr />
                        <ResponseMsgShowRow /> <hr />
                        <div className="h6">Answer the questions: </div>
                        <QuestionsShowRow numbers={this.state.numbers} qNo={this.state.questions.questionNo} result={this.state.questions.result} disab={this.state.disabled.disabled} inputIDs={this.state.textInputIDs} />
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
            <div className="col-4"><button type="button" onClick={window.fastTrackMainClass.newGame} className={Number(props.status) === 2 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 2 ? false : true}  >&#10140;  Next round </button> </div>
            <div className="col-4 tempFontPrincess py-1">&#9876; Fact-Track arithmetic  </div>
            <div className="col-4 noPadding text-right"><button type="button" onClick={window.fastTrackMainClass.newGame} className={Number(props.status) === 0 || Number(props.status) === 5 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 0 || Number(props.status) === 5 ? false : true}  >&#9760;  New game </button> </div>
        </div>
    );
}
const TimerShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="progress gameWidth">
                    <div className={props.timeCounter < 35 ? "progress-bar bg-success" : props.timeCounter < 50 ? "progress-bar bg-info" : "progress-bar bg-danger"} role="progressbar" style={{ width: (props.timeCounter * 1.67) +'%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
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
const AskQuestionShowRow = (props) => {
    return (
        <span >
            {props.numbers.operators.toString()} <br /> --------- {props.numbers.nomues.toString()}  <br />--------------  {props.numbers.denomes.toString()}
            <br /> {props.questions.result.toString()}
        </span>
    );
}
const QuestionsShowRow = (props) => {
    let rows = []
    for (var i = 0; i < 10; i++) {
        rows[i] = < div className="row" >
            <div className="col-5 text-right text-bold  h5 mark py-2 noPadding">
                <span className={Number(props.result[i]) === 1 ? "text-success" : Number(props.result[i]) === 2 ? "text-danger" : ""}>
                    {props.numbers.nomues[i]}  {Number(props.numbers.operators[i]) === 0 ? "+" : Number(props.numbers.operators[i]) === 1 ? "-" : Number(props.numbers.operators[i]) === 2 ? "*" : "/"}  {props.numbers.denomes[i]}  =
                </span>
            </div>
            <div className="col-5 ml-0 pl-0">
                <input type="text" id={props.inputIDs[i]} className="form-control inputFont20" onKeyDown={( (e) => window.fastTrackMainClass.enterPressed(e))  } disabled={Number(props.qNo) === i && Number(props.disab) === 1 ? false : true} autoFocus={Number(props.qNo) === i && Number(props.disab) === 1 ? true : false} />
            </div>
            <div className="col-2  ml-0 pl-0 text-left">
                <button type="button" onClick={(() => window.fastTrackMainClass.checkEnteredValue())} className={Number(props.qNo) === i && Number(props.disab) === 1 ? "btn btn-success px-1 small text-bold" : "btn btn-warning px-1 small text-bold"} disabled={Number(props.qNo) === i && Number(props.disab) === 1 ? false : true}>Check </button>
            </div>
        </div >
    }
    return (
        <div> 
            {rows.map((item, key) =>
                <span key={item.id}>{item} </span>
            )}
       </div>
    );
}
const GameInfoShowRow = () => {
    return (
            <div className="col-md-6 pl-5">
                <div className="text-left  text-dark">
                <div className="h4"> &#9876; Fast-track arithmetic </div>
                    <ul className="list-group small text-dark ">
                        <li className="list-group-item"><span className="small text-info">Goal &#10095; </span> Simple arithmetic improvement</li>
                        <li className="list-group-item"><span className="small text-info">Objective &#10095; </span>Answer 10 simple arithmetic (+, -, *, /) questions   in 60 seconds</li>
                        <li className="list-group-item"><span className="small text-info">Procudure &#10095;</span><br />
                            <ul>
                                <li>Press  <kbd className="bg-success text-white">New game</kbd> button</li>
                                <li>Waite for 3 seconds and then start answering questions</li>
                                <li>For each box write answer and press <kbd>Enter</kbd>button on keyboard.</li>
                                <li>Each correct answer gives 2 extra seconds </li>
                                <li>Each wrong answer will cost 8 seconds </li>
                                <li>if all quesitons are answered in 60 seconds <br />
                                <ul>
                                    <li>Press <kbd className="bg-warning text-dark">Next round</kbd>  button for next level</li>
                                        <li>Next level also have 10 questions but with 57 seconds allowed time.</li>
                                        <li>More heigher level will have even less time and so on</li>
                                    </ul>
                                </li>
                                <li>If player cannot answer all question in 60 seconds, then game will finish and have to start new game</li>
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
        " &#10097; Press rest button to start next round...!! "
    ]
    document.getElementById('msgShow').innerHTML = errors[errorCode];
}

function checkAnswer(op, nu, de, answer) {
    var result = false;
    var tempResult = 0;
    if (op == 0) { tempResult = nu + de;}
    else if (op == 1) { tempResult = nu - de;}
    else if (op == 2) { tempResult = nu * de;}
    else if (op == 3) { tempResult = nu / de; }
    if (tempResult == answer) { result = true;}
    return result;
}

function checkEnteredValue(enteredValue, tempID) {
    if (isNaN(enteredValue)) {
        errorMsg(6);
        document.getElementById(tempID).focus();
        return false;
    } else { errorMsg(4); }
    return true;
}

export default FastTrack;