import React from 'react';
import { FaCheck, FaFrown } from 'react-icons/fa';
import ReactRough, { Rectangle } from 'react-rough';

class Colors3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.colors3MainClass = this;
    }
    
    state = {};
    getInitialState = () => {
        const initialState =
        {
            //-start game, end game, running game
            status: { status: 0 }, 
            //-How many question has been asked, 
            turn: { turn: 0 },
            result: {result:0},
            questions: {
                correct: 0,
                wrong: 0
            },
            colors: {
                colors: ["Green", "Red", "Blue", "Orange", "Black", "Pink", "Yellow", "Purple", "White", "Grey"]
            },
            colorsNameOnly: {
                colorsNameOnly: ["Green", "Red", "Blue", "Orange", "Black", "Pink", "Yellow", "Purple", "White", "Grey"]
            },
            currentColor: {
                currentColor:""
            },
            danishColors: {
                danishColors: ["Grøn", "Rød", "Blå", "Orange", "Sort", "Lyserød", "Gul", "Lilla", "Hvid", "Grå"]
            }
        };
        return initialState;
    }

    newGame = () => {
        if (Number(this.state.status.status) === 2) { this.resetGame(); }
        var tempIndex = getRandomNo(this.state.colors.colors);
        this.updateCurrentColor(tempIndex);
        this.updateColors(tempIndex);
        this.updateStatus(1);
        this.updateTurn();
        var colorNames = this.state.colorsNameOnly.colorsNameOnly;
        errorMsgText("Nuværende farver er: " + this.state.danishColors.danishColors[colorNames.indexOf(this.state.currentColor.currentColor.toString())]);
    }

    updateCurrentColor = (value) => {
        var tempColor = this.state.currentColor;
        tempColor.currentColor = this.state.colors.colors[value];
        this.setState({ tempColor });
    }

    resetGame = () => {
        var tempTurm = this.state.turn; tempTurm.turn = 0;
        var tempQuestion = this.state.questions; tempQuestion.correct = 0; tempQuestion.wrong = 0;
        var tempColors = this.state.colors; tempColors.colors = ["Green", "Red", "Blue", "Orange", "Black", "Pink", "Yellow", "Purple", "White", "Grey"];
        this.setState({ tempTurm, tempQuestion, tempColors });
    }

    updateWrong = () => {
        var tempIndex = -1;
        var tempQues = this.state.questions;
        tempQues.wrong = tempQues.wrong + 1;
        tempIndex = getRandomNo(this.state.colors.colors);
        this.updateCurrentColor(tempIndex);
        this.updateColors(tempIndex);
        this.updateTurn();
        if (Number(this.state.turn.turn) > 10) {
            this.updateStatus(2);
            errorMsgText(this.state.questions.correct + " ud af 10 er korrekte");
        }
        else {
            this.updateResult(2);
            this.setState({ tempQues });
            setTimeout(() => { this.updateResult(0); }, 1000);
            var colorNames = this.state.colorsNameOnly.colorsNameOnly;
            errorMsgText("Nuværende farver er: " + this.state.danishColors.danishColors[colorNames.indexOf(this.state.currentColor.currentColor.toString())]);
        }
    }

    updateCorrect = () => {
        var tempQues = this.state.questions;
        tempQues.correct = tempQues.correct + 1;
        var tempIndex = getRandomNo(this.state.colors.colors);
        this.updateCurrentColor(tempIndex);
        this.updateColors(tempIndex);
        this.updateTurn();
        if (Number(this.state.turn.turn) > 10) {
            this.updateStatus(2);
            errorMsgText(this.state.questions.correct + " ud af 10 er korrekte");
        } else {
            this.updateResult(1);
            this.setState({ tempQues });
            setTimeout(() => { this.updateResult(0); }, 1000);
            var colorNames = this.state.colorsNameOnly.colorsNameOnly;
            errorMsgText("Nuværende farver er: " + this.state.danishColors.danishColors[colorNames.indexOf(this.state.currentColor.currentColor.toString())]);
        }
    }

    updateTurn = () => {
        var tempTurn = this.state.turn;
        tempTurn.turn = Number(this.state.turn.turn) + 1;
        this.setState({ tempTurn });
    }

    updateResult = (value) => {
        var tempResult = this.state.result;
        tempResult.result = value;
        this.setState({ tempResult});
    }

    updateColors = (index) => {
        var colorArray = this.state.colors.colors;
        var tempArray = []; var next = 0;
        for (var i = 0; i < colorArray.length; i++) {
            if (i !== index) {
                tempArray[next] = colorArray[i];
                next++;
            }
        }
        var tempColor = this.state.colors;
        tempColor.colors = tempArray;
        this.setState({ tempColor });
    }

    updateStatus = (value) => {
        var tempState = this.state.status;
        tempState.status = value;
        this.setState({ tempState });
    }
    
    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 border">
                        <NewGameButtonRow status={this.state.status.status}  /> <hr />
                        <ResultShowRow result={this.state.questions} /><hr />
                        <ResponseMsgShowRow /> <hr />
                        <ResultIconShowRow result={this.state.result.result}/>
                        <QuestionsShowRow result={this.state.result.result} status={this.state.status.status} currentColor={this.state.currentColor.currentColor} />
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
            <div className="col-5 tempFontOpenSans  py-1"> &#9731; Farver 3 </div>
            <div className="col-2"> </div>
            <div className="col-5 noPadding text-right"><button type="button" onClick={window.colors3MainClass.newGame} className={Number(props.status) === 0 || Number(props.status) === 2 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 0 || Number(props.status) === 2 ? false : true}  >&#9731;  Start</button> </div>
        </div>
    );
}

const ResultShowRow = (props) => {
    return (
        <div className="row text-center">
            <div className="col-6 small text-success text-left" >Korrekt svar:  {props.result.correct} </div>
            <div className="col-6 small text-danger text-right" >Forkert svar: {props.result.wrong}</div>
        </div>
    );
}

const ResponseMsgShowRow = () => {
    return (
        <div className="row">
            <div className="col-12"><span className="small">Besked: </span> <span id="msgShow" className="text-danger small"> </span></div>
        </div>
    );
}

const ResultIconShowRow = (props) => {
    return (
        <div className="row text-center">
            <div className="col-2"> </div>
            <div className="col-8">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10 text-left">
                        <span className=" h2">
                            {Number(props.result) === 1 ? <span className="text-success h2">&#9745; </span> : Number(props.result) === 2 ? <span className="text-danger h2">&#9746; </span> : "\r"}</span>
                    </div>
                </div>
            </div>
            <div className="col-2"> </div>
        </div>
    );
}

const QuestionsShowRow = (props) => {
    return (
        <aside>
            <div className="row text-center">
                <div className="col-2 "></div>
                <div className="col-8">
                    
                    <div className="row"><div className="col-12 pb-1 pt-0"><hr />  </div></div>
                    <div className="row">
                        <div className="col-1 "></div>
                        <div className="col-10 text-left noPadding">
                            {Number(props.status) === 1 ?
                                <span><ReactRough width={220} height={200} >
                                    <Rectangle points={[10, 10, 200, 160]} fill={props.currentColor} fillWeight={3}  />
                                </ReactRough></span> 
                                :
                                <span className="display-1">&#9731; </span>
                            }
                        </div>
                        <div className="col-1 "></div>
                    </div>
                    <div className="row"><div className="col-12 pb-1 pt-3"><hr />  </div></div>
                    <div className="row">
                        <div className="col-1 "></div>
                        <div className="col-3 "> <button className="text-white btn btn-danger" onClick={() => { window.colors3MainClass.updateWrong() }} disabled={Number(props.status) === 1 ? false : true} >Forkert</button></div>
                        <div className="col-1 "></div>
                        <div className="col-5 text-left"> <button className="text-white btn btn-primary" onClick={() => { window.colors3MainClass.updateCorrect() }} disabled={Number(props.status) === 1 ? false : true}>Korrekt</button></div>
                        
                    </div>
                </div>
                <div className="col-sm-2"></div>
            </div>
            <br/>
        </aside>
    );
}

const GameInfoShowRow = () => {
    return (
        <div className="col-md-6 pl-5 mt-2">
            <div className="text-left  text-dark">
                <div className="h4"> &#9731; Farver 3 </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Mål &#10095; </span> Farveidentifikation</li>
                    <li className="list-group-item"><span className="small text-info">Objektiv &#10095; </span>Hvor mange farver kan en barn af under 3 år kan identificer.</li>
                    <li className="list-group-item"><span className="small text-info">Procedure &#10095;</span><br />
                        <ul>
                            <li>Tryk på  <kbd className="bg-success text-white">Start</kbd> knappen</li>
                            <li>Spørg barnet, <span className="h6"> hvilken farve er det her? </span> </li>
                            <li>Hvis svaret er korrekt, trykke på<kbd className="bg-info">rigtigt</kbd> knappen</li>
                            <li>Ellers trykke på <kbd className="bg-danger">Forkert</kbd> knappen</li>
                            <li>Gentag dette 10 gange</li>
                            <li>Når alle farver er færdig, kigge på, hvor mange der er korrekte eller forkerte </li>
                            <li>Alle farver skal besvares korrekt før de være til næste niveau </li>
                        </ul>
                    </li>
                    <li className="list-group-item"><span className="small text-info">Tips &#10095; </span>God fornøjelse</li>
                </ul>
            </div>
        </div>
    );
}

function errorMsg(errorCode) {
    var errors = [
        "Ask the child..... Which color is this?",
        "Colors are finished, check result how many colors are correctly answered..",
        "",
        "",
        " &#10097;  "
    ]
    document.getElementById('msgShow').innerHTML = errors[errorCode];
}

function errorMsgText(msgText) {
    document.getElementById('msgShow').innerHTML = msgText;
}

function getRandomNo(array) {
    var randNo = Math.floor((Math.random() * array.length)  + 0);
    return randNo;
}

export default Colors3;