import React from 'react';
import Mango from './imgs/mango.png';

class Division7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.divisioin7MainClass = this;
    }
    state = {};
    getInitialState = () => {
        const initialState =
        {
            totalMangoes: { totalMangoes: 0 },
            totalMangoesShow: { totalMangoesShow: 0 },
            totalPersons: { totalPersons: 0 },
            personNames: {
                personNames: ["Maiza", "Hashim", "Ans", "Peter", "Ahmed", "Henrik", "Ali", "Tom", "Haris", "Soren"]
            },
            personsMangoes: {
                personsMangoes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            questions: {
                correctAnswer: 0,
                wrongAnswer: 0,
                questionNo: 0,
                score: 0
            },
            status: { status: 0 },
        };
        return initialState;
    }

    newGame = () => {
        if (Number(this.state.status.status) === 2) {
            this.resetForNextRound();
        }
        this.resetStatus(1);
        //-Division logic
        var totalMangoes = getRandomNo(); var totalPersons = getRandomNo();
        this.updateTotalMangoes(totalMangoes * totalPersons);
        this.updateTotalMangoesShow(totalMangoes * totalPersons);
        this.updateTotalPersons(totalPersons);
        errorMsgText(">>> Opdel " + this.state.totalMangoes.totalMangoes + " mango i " + this.state.totalPersons.totalPersons + " personer.");
    }

    updateTotalMangoes = (value) => {
        var tempTotalMangoes = this.state.totalMangoes;
        tempTotalMangoes.totalMangoes = value;
        this.setState({ tempTotalMangoes });
    }

    updateTotalMangoesShow = (value) => {
        var tempTotalMangoesShow = this.state.totalMangoesShow;
        tempTotalMangoesShow.totalMangoesShow = value;
        this.setState({ tempTotalMangoesShow });
    }

    updateTotalPersons = (value) => {
        var tempTotalPersons = this.state.totalPersons;
        tempTotalPersons.totalPersons = value;
        this.setState({ tempTotalPersons });
    }

    updatePersonsMangoes = (personID, value) => {
        this.updateTotalMangoes(Number(this.state.totalMangoes.totalMangoes) + Number(this.state.personsMangoes.personsMangoes[personID]));
        this.updatePersonsMangoesValues(personID, value);
        this.updateTotalMangoes(Number(this.state.totalMangoes.totalMangoes) - value);
        this.resetStatus(1);
        errorMsgText("");
    }

    updatePersonsMangoesValues = (personID, value) => {
        var tempPersonsMangoes = this.state.personsMangoes;
        tempPersonsMangoes.personsMangoes[personID] = value;
        this.resetStatus({ tempPersonsMangoes });
    }

    checkResult = () => {
        this.resetStatus(2);
        var gameTotalManges = Number(this.state.totalMangoes.totalMangoes);
        if (gameTotalManges !== 0) {
            (gameTotalManges > 0 ? errorMsgText("Forkert!! stadig mango er der for at opdele. Tryk på Næste knap for næste spørgsmål") : errorMsgText("Forkert!! mere end tilgængelige mango er delt. Hvor har du taget ekstra mango? Tryk på Næste knap for næste spørgsmål."))
            this.updateWrong();
            return false;
        }
        else if (!checkAnswer(Number(this.state.totalPersons.totalPersons), this.state.personsMangoes.personsMangoes)) {
            errorMsgText("Forkert!! , mango er ikke lige fordelt. Division betyder, at alle personer vil have samme antal mango. Tryk på Næste knap for næste spørgsmål");
            this.updateWrong();
            return false;
        }
        else {
            errorMsgText("Godt gjort!!, svaret er korrekt. Tryk på Næste knap for næste spørgsmål");
            this.updateCorrect();
            this.updateScore();
        }
    }

    resetStatus = (value) => {
        var gameStatus = this.state.status;
        gameStatus.status = value;
        this.setState({ gameStatus });
    }

    updateScore = () => {
        var gameScore = this.state.questions;
        gameScore.score += 1;
        this.setState({ gameScore });
    }

    updateWrong = () => {
        var gameWrong = this.state.questions;
        gameWrong.wrongAnswer += 1;
        this.setState({ gameWrong });
    }

    updateCorrect = () => {
        var gameCorrect = this.state.questions;
        gameCorrect.correctAnswer += 1;
        this.setState({ gameCorrect });
    }

    resetPersonsMangoes = () => {
        var gamePersonsMangoes = this.state.personsMangoes;
        gamePersonsMangoes.personsMangoes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.setState({ gamePersonsMangoes });
    }

    resetForNextRound = () => {
        this.resetPersonsMangoes();
        try {
            document.querySelector('input[name="personRadio0"]:checked').checked = false;
            document.querySelector('input[name="personRadio1"]:checked').checked = false;
            document.querySelector('input[name="personRadio2"]:checked').checked = false;
            document.querySelector('input[name="personRadio3"]:checked').checked = false;
            document.querySelector('input[name="personRadio4"]:checked').checked = false;
            document.querySelector('input[name="personRadio5"]:checked').checked = false;
            document.querySelector('input[name="personRadio6"]:checked').checked = false;
            document.querySelector('input[name="personRadio7"]:checked').checked = false;
            document.querySelector('input[name="personRadio8"]:checked').checked = false;
            document.querySelector('input[name="personRadio9"]:checked').checked = false;
        } catch (Exception) { }
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 border">
                        <NewGameButtonRow status={this.state.status.status} /> <hr />
                        <ResultShowRow result={this.state.questions} /><hr />
                        <ResponseMsgShowRow /><hr />
                        <GameStatusShowRow status={this.state.status.status} totalMangoes={this.state.totalMangoes.totalMangoes} totalPersons={this.state.totalPersons.totalPersons} totalMangoesShow={this.state.totalMangoesShow.totalMangoesShow} />  <hr />
                        <QuestionsShowRow totalMangoes={this.state.totalMangoes.totalMangoes} /> <hr />
                        <AllPersonsShowRow totalPersons={this.state.totalPersons.totalPersons} personsMangoes={this.state.personsMangoes.personsMangoes} status={this.state.status.status} />
                        <br /> <br />
                    </div>
                    <GameInfoShowRow />
                </div>
            </div>
        );
    }
}

function getRandomNo() {
    var number = Math.floor((Math.random() * 8) + 2);
    return number;
}

const NewGameButtonRow = (props) => {
    return (
        <div className="row headPad">
            <div className="col-4"><button type="button" onClick={window.divisioin7MainClass.newGame} className={Number(props.status) === 2 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 2 ? false : true}  >&#10140;  Næste </button> </div>
            <div className="col-4 tempFontOpenSans  py-1">&divide; Division 7   </div>
            <div className="col-4 noPadding text-right"><button type="button" onClick={window.divisioin7MainClass.newGame} className={Number(props.status) === 0 || Number(props.status) === 5 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 0 || Number(props.status) === 5 ? false : true}>&divide;  Starte </button> </div>
        </div>
    );
}

const ResultShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4 small text-info" >Score: {props.result.score} </div>
            <div className="col-4 small text-success" >Korrekt  {props.result.correctAnswer} </div>
            <div className="col-4 small text-danger" >Forkert: {props.result.wrongAnswer}</div>
        </div>
    );
}

const MangoesShowRow = (props) => {
    var tempArray = []
    for (var i = 0; i < Number(props.totalMangoes); i++) {
        tempArray.push(<div className="col-xs-1 px-1 text-center "> <img src={Mango} className=" " alt="" /> </div>)
    }
    return (
        tempArray
    );
}

const QuestionsShowRow = (props) => {
    return (
        <div className="row px-2">
            <MangoesShowRow totalMangoes={props.totalMangoes} />
        </div>
    );
}

const GameInfoShowRow = () => {
    return (
        <div className="col-md-6 pl-5">
            <div className="text-left  text-dark">
                <div className="h4"> &divide; Division 7 </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Goal &#10095; </span> Simple division logik</li>
                    <li className="list-group-item"><span className="small text-info">Objektive &#10095; </span>Opdelingsregelbeskrivelse for et barn under 7 år</li>
                    <li className="list-group-item"><span className="small text-info">Procudure &#10095;</span><br />
                        <ul>
                            <li  className="mt-1">Tryk på <kbd className="bg-success text-white">&divide; Starte</kbd>knappen</li>
                            <li  className="mt-1">Læs meddelelsen om spørgsmål. E.g. <span className="text-info">Opdel 24 mango i 8 personer. (24/8)</span></li>
                            <li className="mt-1">Vælg et tal for hver person, hvilket betyder, hvor mange mango der vil have denne person.
                                    <br /><div className="border">E.g.&nbsp;&nbsp;  
                                                    <input type="radio" className=""  /> 1  &nbsp;&nbsp;
                                                    <input type="radio" className="" /> 2 &nbsp;&nbsp;
                                                    <input type="radio" className="" checked/> 3 &nbsp;&nbsp;
                                                    <input type="radio" className="" /> 4  ...
                                    </div>
                            </li>
                            <li className="mt-1">Når alle  mango  er delt, Klikke på <kbd className="bg-light text-danger border ">OK</kbd></li>
                            <li className="mt-1">Systemet tjekker, om svaret er korrekt eller forkert.</li>
                            <li className="mt-1">Hvis svaret er korrekt, vil der være en ekstra score.</li>
                            <li className="mt-1">Til sidst, klikke på <kbd className="bg-success text-white small">&#10140; Næste </kbd> knappen for næste spørgsmål. </li>
                        </ul>
                    </li>
                    <li className="list-group-item"><span className="small text-info">Tips &#10095; </span> God fornøjelse..</li>
                </ul>
            </div>
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

const GameStatusShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-4 small text-info">Mango: {props.totalMangoesShow}</div>
            <div className="col-4 small text-success">Personer: {props.totalPersons}</div>
            <div className="col-4 small text-left">
                <span>({props.totalMangoesShow}/{props.totalPersons}) </span>
                &nbsp;<button type="button" onClick={window.divisioin7MainClass.checkResult} className="text-danger" disabled={Number(props.status) === 0 || Number(props.status) === 2 ? true : false}> {Number(props.status) === 0 || Number(props.status) === 2 ? <del className="">OK</del> : <span className="">OK</span>} </button>
            </div>
        </div>
    );
}

const AllPersonsShowRow = (props) => {
    return (
        <aside>
            {(Number(props.totalPersons > 0)) ? <PersonShowRow status={props.status} personName="Maiza" givenMangoes={Number(props.personsMangoes[0])} personID={0} /> : ""}
            {(Number(props.totalPersons > 1)) ? <PersonShowRow status={props.status} personName="Hashim" givenMangoes={Number(props.personsMangoes[1])} personID={1} /> : ""}
            {(Number(props.totalPersons > 2)) ? <PersonShowRow status={props.status} personName="Anas" givenMangoes={Number(props.personsMangoes[2])} personID={2} /> : ""}
            {(Number(props.totalPersons > 3)) ? <PersonShowRow status={props.status} personName="Peter" givenMangoes={Number(props.personsMangoes[3])} personID={3} /> : ""}
            {(Number(props.totalPersons > 4)) ? <PersonShowRow status={props.status} personName="Ahmed" givenMangoes={Number(props.personsMangoes[4])} personID={4} /> : ""}
            {(Number(props.totalPersons > 5)) ? <PersonShowRow status={props.status} personName="Henrik" givenMangoes={Number(props.personsMangoes[5])} personID={5} /> : ""}
            {(Number(props.totalPersons > 6)) ? <PersonShowRow status={props.status} personName="Ali" givenMangoes={Number(props.personsMangoes[6])} personID={6} /> : ""}
            {(Number(props.totalPersons > 7)) ? <PersonShowRow status={props.status} personName="Tom" givenMangoes={Number(props.personsMangoes[7])} personID={7} /> : ""}
            {(Number(props.totalPersons > 8)) ? <PersonShowRow status={props.status} personName="Haris" givenMangoes={Number(props.personsMangoes[8])} personID={8} /> : ""}
            {(Number(props.totalPersons > 9)) ? <PersonShowRow status={props.status} personName="Soren" givenMangoes={Number(props.personsMangoes[9])} personID={9} /> : ""}
        </aside>
    );
}

const PersonShowRow = (props) => {
    var radioName = "personRadio" + props.personID;
    return (
        <aside className="border mt-3">
            <div className="row">  <div className="col-12 h5 text-info">{props.personName} <span className="small"> vil have:</span></div>  </div>
            <div className="row">
                <div className="col-6">
                    <div className="row pl-5">
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="1" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 1) }} disabled={Number(props.status) === 2 ? true : false}/>1</div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="2" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 2) }} disabled={Number(props.status) === 2 ? true : false}/>2 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="3" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 3) }} disabled={Number(props.status) === 2 ? true : false}/>3 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="4" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 4) }} disabled={Number(props.status) === 2 ? true : false}/>4 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="5" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 5) }} disabled={Number(props.status) === 2 ? true : false}/>5 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="6" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 6) }} disabled={Number(props.status) === 2 ? true : false}/>6 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="7" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 7) }} disabled={Number(props.status) === 2 ? true : false}/>7 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="8" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 8) }} disabled={Number(props.status) === 2 ? true : false}/>8 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="9" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 9) }} disabled={Number(props.status) === 2 ? true : false}/>9 </div>
                        <div className="text-left col-md-4 col-sm-6 col-6  "> <input type="radio" className="form-check-input" name={radioName} value="10" onClick={() => { window.divisioin7MainClass.updatePersonsMangoes(props.personID, 10) }} disabled={Number(props.status) === 2 ? true : false}/>10 </div>
                    </div>
                </div>
                <div className="col-6"><div className="row"> <MangoesShowRow totalMangoes={props.givenMangoes} /></div></div>
            </div>
        </aside>
    );
}

function errorMsgText(msg) {
    document.getElementById('msgShow').innerHTML = msg;
}

function checkAnswer(totalPersons, personalMangoesArray) {
    var result = true;
    var divided = Number(personalMangoesArray[0]);
    for (var i = 1; i < totalPersons; i++) {
        if (divided !== Number(personalMangoesArray[i])) { result = false; break; }
    }
    return result;
}

export default Division7;