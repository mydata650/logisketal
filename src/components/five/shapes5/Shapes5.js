import React from 'react';
import { FaCheck, FaFrown } from 'react-icons/fa';
import ReactRough, { Rectangle, Circle, Polygon, Ellipse } from 'react-rough';
import UK from '../../imgs/language/uk.png';
import DA2 from '../../imgs/language/da2.png';
class Shapes5 extends React.Component {
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
            turn: { turn: -1 },
            result: {result:0},
            questions: {
                correct: 0,
                wrong: 0
            },
            shapes: {
                shapes: ["Square", "Circle", "Rectangle", "Triangle", "Right Triangle", "Rhombus", "Ovel", "Trapezium", "Parallelogram", "Pentagon", "Hexagon", "Heptagon",  "Star" ]
            },
            shapesNameOnly: {
                shapesNameOnly: ["Square", "Circle", "Rectangle", "Triangle", "Right Triangle", "Rhombus", "Ovel", "Trapezium", "Parallelogram", "Pentagon", "Hexagon", "Heptagon", "Star"]
            },
            currentShape: {
                currentShape: ""
            },
            danishShapes: {
                //danishShapes: { "Squre", "Circle", "Rectangle", "Triangle", "Right Triangle", "Diamond/Rhombus", "Ovel", "Trapezium", "Parallelogram", "Pentagon", "Hexagon", "Heptagon", "Star"}
                danishShapes: { "Square": "Kvadrat", "Circle": "Cirkel", "Rectangle": "Rektangel", "Triangle": "Trekant-spidsvinklet", "Right Triangle": "Trekant-Retvinklet", "Rhombus": "Rombe", "Ovel": "Ovel", "Trapezium": "Trapez", "Parallelogram": "Parallelogram", "Pentagon": "Pentagon", "Hexagon": "Hexagon", "Heptagon": "Heptagon", "Star": "Stjerne"}
            },
            selectedShape: {
                selectedShape: ""
            },
            selectOptions: {
                selectOptions: ["", "", "", ""]
            }, 
            language: {
                language: 1
            }
        };
        return initialState;
    }
    newGame = () => {
        if (Number(this.state.status.status) === 2) { this.resetGame(); }
        var tempIndex = getRandomNo(this.state.shapes.shapes);
        this.updateCurrentShape(this.state.shapes.shapes[tempIndex]);
        this.updateShapes(tempIndex);
        this.updateStatus(1);
        this.updateTurn();
       // { Number(this.state.language.language) === 0 ? errorMsgText("Current shape is : " + this.state.currentShape.currentShape) : errorMsgText("Nuværende figur er: " + this.state.currentShape.currentShape) }
        //errorMsgText("Nuværende figur er: " + this.state.currentShape.currentShape);
        this.updateSelectOptiosn();
    }
    resetGame = () => {
        var tempTurm = this.state.turn; tempTurm.turn = -1;
        var tempCurrentShape = this.state.currentShape; tempCurrentShape.currentShape = "";
        var tempQuestion = this.state.questions; tempQuestion.correct = 0; tempQuestion.wrong = 0;
        var tempShapes = this.state.shapes; tempShapes.shapes = ["Squre", "Circle", "Rectangle", "Triangle", "Right Triangle", "Diamond", "Ovel", "Trapezium", "Parallelogram", "Pentagon", "Hexagon", "Heptagon", "Star"]
        this.setState({ tempTurm, tempQuestion, tempShapes, tempCurrentShape });
    }
    updateCurrentShape = (value) => {
        var tempShape = this.state.currentShape;
        tempShape.currentShape = value;
        this.setState({ tempShape });
    }
    updateWrong = (value) => {
        var tempSelectedShape = this.state.selectedShape;
        tempSelectedShape.selectedShape = value;
        this.setState({ tempSelectedShape });
    }
    updateSelectOptiosn = () => {
        var tempShapes = this.state.shapesNameOnly.shapesNameOnly;
        var index = 0; var currentShapes = []; var randomShape = "";
        currentShapes[index] = this.state.currentShape.currentShape;
        index++;
        while (index < 4) {
            randomShape = tempShapes[getRandomNoUnderValue(12)];
            var exist = false;
            for (var i = 0; i < index; i++) {
                if (randomShape === currentShapes[i]) { exist = true;}
            }
            if (!exist) { currentShapes[index] = randomShape; index++;}
        }
        index = getRandomNoUnderValue(4);
        randomShape = currentShapes[0];
        currentShapes[0] = currentShapes[index];
        currentShapes[index] = randomShape;
        this.updateSelectOptionsValues(currentShapes);
    }
    updateSelectOptionsValues = (shapes) => {
        var tempSelectOption = this.state.selectOptions;
        tempSelectOption.selectOptions = shapes;
        this.setState({ tempSelectOption});
    }
    updateSelectedShape = (value) => {
        var tempSelectedShape = this.state.selectedShape;
        tempSelectedShape.selectedShape = value;
        this.setState({ tempSelectedShape });
        //alert(this.state.selectedShape.selectedShape);
    }
    radioButtonValues = () => {
        var result = true;
        try {
            var selectedOptionValue = document.querySelector('input[name="optradio"]:checked').value;
        }
        catch (Exception) { errorMsgText("Select a answer option!!"); result = false;  return false; }
        if (this.checkAnswer(selectedOptionValue)) {
            { Number(this.state.language.language) === 0 ? errorMsgText("Answer is correct ") : errorMsgText("Svaret er korrekt ") }
            this.updateCorrectValue();
            this.updateResult(1);
            setTimeout(() => { this.updateResult(0); }, 1000);
        }
        else {
            { Number(this.state.language.language) === 0 ? errorMsgText("Answer is wrong ") : errorMsgText("Svaret er forkert ") }
            this.updateWrongValue();
            this.updateResult(2);
            setTimeout(() => { this.updateResult(0); }, 1000);
        }
        document.querySelector('input[name="optradio"]:checked').checked = false;
        return result;
    } 
    updateCorrect = () => {
        if (!this.radioButtonValues()) { return false; }  
        
        var tempIndex = getRandomNo(this.state.shapes.shapes);
        this.updateCurrentShape(this.state.shapes.shapes[tempIndex]);
        this.updateShapes(tempIndex);
        this.updateTurn();
        if (Number(this.state.turn.turn) > 12) {
            this.updateStatus(2);
            errorMsgText(this.state.questions.correct + " ud af 13 er korrekte");
        } else {
            //errorMsgText("Nuværende figur er: " + this.state.currentShape.currentShape);
            this.updateSelectOptiosn();
        }
    }
    updateLanguage = (value) => {
        var tempLanguage = this.state.language;
        tempLanguage.language = value;
        this.setState({ tempLanguage });
    }
    
    checkAnswer = (value) => {
        var result = false;
        if (value === this.state.currentShape.currentShape) { result = true; }
        return result;
    }
    updateCorrectValue = () => {
        var tempQues = this.state.questions;
        tempQues.correct = tempQues.correct + 1;
        this.setState({ tempQues });
    }
    updateWrongValue = () => {
        var tempQues = this.state.questions;
        tempQues.wrong = tempQues.wrong + 1;
        this.setState({ tempQues });
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
    updateShapes = (index) => {
        var colorArray = this.state.shapes.shapes;
        var tempArray = []; var next = 0;
        for (var i = 0; i < colorArray.length; i++) {
            if (i !== index) {
                tempArray[next] = colorArray[i];
                next++;
            }
        }
        var tempShapes = this.state.shapes;
        tempShapes.shapes = tempArray;
        this.setState({ tempShapes });
    }
    updateStatus = (value) => {
        var tempState = this.state.status;
        tempState.status = value;
        this.setState({ tempState });
    }
    render() {
        return (
            <div className="container mt-4">
                <LanguageSetting />
                <div className="row">
                    <div className="col-md-6 border">
                        <NewGameButtonRow status={this.state.status.status} lang={this.state.language.language} /> <hr />
                        <ResultShowRow result={this.state.questions} lang={this.state.language.language}/><hr />
                        <ResponseMsgShowRow lang={this.state.language.language}/> <hr />
                        <ResultIconShowRow result={this.state.result.result} lang={this.state.language.language} />
                        <QuestionsShowRow result={this.state.result.result} status={this.state.status.status} shape={this.state.currentShape.currentShape} turn={this.state.turn.turn} selectOptions={this.state.selectOptions.selectOptions} lang={this.state.language.language} danishShapes={this.state.danishShapes.danishShapes} />
                    </div>
                    {Number(this.state.language.language) === 0 ? <GameInfoEnglishShowRow /> : <GameInfoShowRow /> }
                    
                </div>
            </div>
        );
    }
}

const LanguageSetting = (props) => {
    return (
        <div className="row ">
            <div className="col-md-6 col-sm-12 col-xs-12 text-right">
                <img src={UK} className="img-fluid   " alt="Responsive image" width={25} style={{ "cursor": "pointer" }} onClick={e => window.colors3MainClass.updateLanguage(0)} /> &nbsp;
                < img src={DA2} className="img-fluid " alt="Responsive image" width={25} style={{"cursor" : "pointer"}} onClick={e => window.colors3MainClass.updateLanguage(1)}/>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12 text-right"></div>
        </div>
    );
}
const NewGameButtonRow = (props) => {
    return (
        <div className="row headPad">
            <div className="col-5 tempFontOpenSans  py-1"> &#8526; {Number(props.lang) === 0 ? " Shapes 5" : " Figurer 5"}  </div>
            <div className="col-2"> </div>
            <div className="col-5 noPadding text-right"><button type="button" onClick={window.colors3MainClass.newGame} className={Number(props.status) === 0 || Number(props.status) === 2 ? "btn btn-success btn-sm mt-1" : "btn btn-warning btn-sm mt-1"} disabled={Number(props.status) === 0 || Number(props.status) === 2 ? false : true}  >&#9731;  Start</button> </div>
        </div>
    );
}
const ResultShowRow = (props) => {
    return (
        <div className="row text-center">
            <div className="col-6 small text-success text-left" >{Number(props.lang) === 0 ? " Correct answers: " : " Korrekt svar: "}   {props.result.correct} </div>
            <div className="col-6 small text-danger text-right" >{Number(props.lang) === 0 ? "Wrong answers: " : " Forkert svar: "}  {props.result.wrong}</div>
        </div>
    );
}
const ResponseMsgShowRow = (props) => {
    return (
        <div className="row">
            <div className="col-12"><span className="small">{Number(props.lang) === 0 ? "Msg: " : "Besked: "} </span> <span id="msgShow" className="text-danger small"> </span></div>
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

const SqureShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Rectangle points={[10, 10, 200, 160]} fill="rgba(255,113,13, 0.1)" fillWeight={3} />
            </ReactRough>
        </span>
    );
}
const CircleShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Circle points={[90, 90, 140]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const ReactangleShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Rectangle points={[10, 30, 200, 105]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const TriangleShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Polygon points={[[[110, 10], [10, 160], [200, 160]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const RightTriangleShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Polygon points={[[[150, 10], [150, 150], [10, 150]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const DiamondShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Polygon points={[[[60, 10], [0, 100], [60, 190], [120, 100]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const OvelShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Ellipse points={[90, 100, 100, 180]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const TrapeziumShow = () => {
    return (
        <span>
            <ReactRough width={220} height={200} >
                <Polygon points={[[[40, 30], [10, 180], [170, 180], [90, 30]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const ParallelogramShow = () => {
    return (
        <span>
            <ReactRough width={250} height={200} >
                <Polygon points={[[[60, 10], [10, 130], [190, 130], [240, 10]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const PentagonShow = () => {
    return (
        <span>
            <ReactRough width={250} height={200} >
                <Polygon points={[[[80, 20], [10, 90], [30, 160], [120, 160], [150, 90]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const HexagonShow = () => {
    return (
        <span>
            <ReactRough width={250} height={200} >
                <Polygon points={[[[50, 20], [10, 90], [50, 160], [120, 160], [160, 90], [120, 20]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const HeptagonShow = () => {
    return (
        <span>
            <ReactRough width={250} height={200} >
                <Polygon points={[[[85, 0], [25, 35], [10, 102], [50, 160], [130, 160], [170, 103], [155, 35]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}
const StarShow = () => {
    return (
        <span>
            <ReactRough width={250} height={200} >
                <Polygon points={[[[100, 0], [80, 60], [10, 60], [68, 105], [40, 160], [100, 130], [165, 160], [140, 105], [200, 60], [125, 60]]]} fill="rgba(255,113,13, 0.3)" />
            </ReactRough>
        </span>
    );
}

const AnswerOptionsShow = (props) => {
    return (
        <div className="row">
            <div className="col-10 ">
                <div className="row  noPadding">
                    <div className="col-md-6 text-left"><label> <input type="radio" className="form-check-input" name="optradio" onClick={() => { window.colors3MainClass.updateSelectedShape(props.selectOptions[0]) }} value={props.selectOptions[0]} />{Number(props.lang) === 0 ? props.selectOptions[0] : props.danishShapes[props.selectOptions[0]] } </label> </div>
                    <div className="col-md-6 text-left"><label>  <input type="radio" className="form-check-input" name="optradio" onClick={() => { window.colors3MainClass.updateSelectedShape(props.selectOptions[1]) }} value={props.selectOptions[1]} />{Number(props.lang) === 0 ? props.selectOptions[1] : props.danishShapes[props.selectOptions[1]]}  </label> </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-left"><label>  <input type="radio" className="form-check-input" name="optradio" onClick={() => { window.colors3MainClass.updateSelectedShape(props.selectOptions[2]) }} value={props.selectOptions[2]} />{Number(props.lang) === 0 ? props.selectOptions[2] : props.danishShapes[props.selectOptions[2]]}  </label> </div>
                    <div className="col-md-6 text-left"><label> <input type="radio" className="form-check-input" name="optradio" onClick={() => { window.colors3MainClass.updateSelectedShape(props.selectOptions[3]) }} value={props.selectOptions[3]} />{Number(props.lang) === 0 ? props.selectOptions[3] : props.danishShapes[props.selectOptions[3]]}  </label>  </div>
                </div>
            </div>
            <div className="col-2  noPadding">
                <button className="text-white btn btn-primary" onClick={() => { window.colors3MainClass.updateCorrect() }} disabled={Number(props.status) === 1 ? false : true}>OK</button>
            </div>
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
                                props.shape === "Square" ? <SqureShow /> : props.shape === "Circle" ? <CircleShow /> : props.shape === "Rectangle" ? <ReactangleShow />
                                    : props.shape === "Triangle" ? <TriangleShow /> : props.shape === "Right Triangle" ? <RightTriangleShow /> : props.shape === "Rhombus" ? <DiamondShow />
                                        : props.shape === "Ovel" ? <OvelShow /> : props.shape === "Trapezium" ? <TrapeziumShow /> : props.shape === "Parallelogram" ? <ParallelogramShow />
                                            : props.shape === "Pentagon" ? <PentagonShow /> : props.shape === "Hexagon" ? <HexagonShow /> : props.shape === "Heptagon" ? <HeptagonShow />  : <StarShow />
                              :<span className="display-1">&#8526; </span>
                            }
                        </div>
                        <div className="col-1 "></div>
                    </div>
                    <div className="row"><div className="col-12 pb-1 pt-3"><hr />  </div></div>
                    
                    {Number(props.status) === 1 ?
                        <AnswerOptionsShow status={props.status} selectOptions={props.selectOptions} lang={props.lang} danishShapes={props.danishShapes}/>
                        : <span> </span>
                    }

                </div>
                <div className="col-sm-2"></div>
            </div>
            <br/>
        </aside>
    );
}
const GameInfoEnglishShowRow = () => {
    return (
        <div className="col-md-6 pl-5 mt-2">
            <div className="text-left  text-dark">
                <div className="h4"> &#8526; Shapes 5 </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Mål &#10095; </span>  Shapes identification</li>
                    <li className="list-group-item"><span className="small text-info">Objektiv &#10095; </span>How many shapes a child can identify under the age of 5 and have an idea of ​​how to write the name in English or Danish  </li>
                    <li className="list-group-item"><span className="small text-info">Procedure &#10095;</span><br />
                        <ul>
                            <li>Press at  <kbd className="bg-success text-white">Start</kbd> button</li>
                            <li>Ask the child, <span className="h6"> Which shape is this ? </span> </li>
                            <li>Let the child also decide, where name of shape is wrriten and click that option </li>
                            <li>Click the <kbd className="bg-info">OK</kbd> button</li>
                            <li>Repeat the process until the last shape and then see, how many are correctly identified.</li>
                        </ul>
                    </li>
                    <li className="list-group-item"><span className="small text-info">Tips &#10095; </span>Have fun..</li>
                </ul>
            </div>
        </div>
    );
}

const GameInfoShowRow = () => {
    return (
        <div className="col-md-6 pl-5 mt-2">
            <div className="text-left  text-dark">
                <div className="h4"> &#8526; Figurer 5 </div>
                <ul className="list-group small text-dark ">
                    <li className="list-group-item"><span className="small text-info">Goal &#10095; </span> Figureridentifikation</li>
                    <li className="list-group-item"><span className="small text-info">Objective &#10095; </span>Hvor mange figurer kan en barn af under 5 år kan identificer og har en ide om, hvordan man skriver navnet på englisk eller dansk</li>
                    <li className="list-group-item"><span className="small text-info">Procedure &#10095;</span><br />
                        <ul>
                            <li>Tryk på  <kbd className="bg-success text-white">Start</kbd> knappen</li>
                            <li>Spørg barnet, <span className="h6"> hvilken figurer er det her? </span> </li>
                            <li>Lad barnet også bestemme, hvor figuren navn er skrevet, og klik på optionen</li>
                            <li>Klik på <kbd className="bg-info">OK</kbd> knappen</li>
                            <li>Gentag processen indtil den sidste figur, og se, hvor mange der er korrekt identificeret</li>
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
function getRandomNoUnderValue(value) {
    var randNo = Math.floor((Math.random() * value) + 0);
    return randNo;
}


export default Shapes5;