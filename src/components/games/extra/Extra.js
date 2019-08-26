import React from "react";
import ReactRough, { Rectangle, Circle, Polygon, Ellipse} from 'react-rough';

const Extra = () => {
    return (
        <div className="container pt-4 border">
            <GameNumbers />
            <div className="card-columns pt-4">
                <Canvas />
            </div>
        </div>
    );
}

const Canvas = () => {
    return (
        <div>
            <ReactRough width={620} height={2500} >
                //squre
                <Rectangle points={[10, 10, 140, 140]} fill="rgba(255,113,13, 0.3)" />
                <Circle points={[90, 230, 140]} fill="rgba(255,113,13, 0.3)" />
                <Rectangle points={[10, 320, 140, 50]} fill="rgba(255,113,13, 0.3)" />
                //-Triangle
                <Polygon points={[[[100, 400], [10, 540], [190, 540]]]} fill="rgba(255,113,13, 0.3)" />
                //-Right Triangle
                <Polygon points={[[[150, 550], [150, 690], [10, 690]]]} fill="rgba(255,113,13, 0.3)" />
                //-Diamond
                <Polygon points={[[[100, 710], [50, 780], [100, 850],  [150, 780] ]]} fill="rgba(255,113,13, 0.3)" />
                //-Ovel ([x, y, width, height]
                <Ellipse points={[90, 970, 100, 180]} fill="rgba(255,113,13, 0.3)" />
                //-Trapezium
                <Polygon points={[[[40, 1100], [10, 1230], [150, 1230], [90, 1100]  ]]} fill="rgba(255,113,13, 0.3)" />
                //-	Parallelogram [p1, p2, p3, p4]
                <Polygon points={[[[60, 1300], [10, 1420], [190, 1420], [240, 1300]]]} fill="rgba(255,113,13, 0.3)" />
                //-Pentagon [p1, p2, p3, p4, p5]
                <Polygon points={[[[80, 1450], [10, 1520], [30, 1590], [120, 1590], [150, 1520]]]} fill="rgba(255,113,13, 0.3)" />
                //-Hexagon [p1, p2, p3, p4, p5, p6]
                <Polygon points={[[[50, 1620], [10, 1690], [50, 1760], [120, 1760], [160, 1690], [120, 1620]]]} fill="rgba(255,113,13, 0.3)" />
                //-Heptagon
                <Polygon points={[[[85, 1800], [25, 1835], [10, 1902], [50, 1960], [130, 1960], [170, 1903], [155, 1835]]]} fill="rgba(255,113,13, 0.3)" />
                //-Start
                <Polygon points={[[[100, 1960], [80, 2020], [10, 2020], [68, 2065], [38, 2140], [100, 2090], [165, 2140], [140, 2065], [200, 2020], [125, 2020]]]} fill="rgba(255,113,13, 0.3)" />


                ///-(100, 1960), (80, 2020), (10, 2020), (50, 2070),  (40, 2140), (100, 2090), (160, 2140), (90,  2070), (130, 2020), (100, 2020)

            </ReactRough>
            <br/>
        </div>
    )
}


const GameNumbers = () => {
    return (
        <aside>
            <div className="row pl-4 ">
                <div className="col-xs-1 text-right numberOne h2"> </div>
                <div className="col-xs-1 text-left  numberTwo h2">&#10102;</div>
                <div className="col-xs-4  pl-1 text-info"><span className="h2 tempFontPrincess"> Extra</span> <span className=" tempFontOpenSans small">(Extra page)</span></div>
                <div className="col-xs-6"></div>
            </div>
            <div className="row border-bottom px-2">
                <div className="col-xs-12 small">Here will be list of games for 3 years old students.... </div>
            </div>
        </aside>
    )
}

const CommingSoon = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-danger" >&#9865;</div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">101 </span> Comming soon </h4>
                <p className="card-text"><span className="small">Game role &#10095; </span><br />

                </p>
                <a href="/" className="btn btn-success btn-block"> Comming soon </a>
            </div>
        </div>
    )
}

const NamesOFShapes = () => {
    //Number(props.turn) === 0 ? <SqureShow /> : Number(props.turn) === 1 ? <CircleShow /> : Number(props.turn) === 2 ? <ReactangleShow />
    //    : Number(props.turn) === 3 ? <TriangleShow /> : Number(props.turn) === 4 ? <RightTriangleShow /> : Number(props.turn) === 5 ? <DiamondShow />
    //        : Number(props.turn) === 6 ? <OvelShow /> : Number(props.turn) === 7 ? <TrapeziumShow /> : Number(props.turn) === 8 ? <ParallelogramShow />
    //            : Number(props.turn) === 9 ? <PentagonShow /> : Number(props.turn) === 10 ? <HexagonShow /> : Number(props.turn) === 11 ? <HeptagonShow /> : <StarShow />
    /*

    <div className="row">
        <div className="col-1 "></div>
        <div className="col-3 "> <button className="text-white btn btn-danger" onClick={() => { window.colors3MainClass.updateWrong() }} disabled={Number(props.status) === 1 ? false : true} >Forkert</button></div>
        <div className="col-1 "></div>
        <div className="col-5 text-left"> <button className="text-white btn btn-primary" onClick={() => { window.colors3MainClass.updateCorrect() }} disabled={Number(props.status) === 1 ? false : true}>Korrekt</button></div>
    </div>


    <div className="col-md-6 text-left"><label> <input type="radio" className="form-check-input" name="optradio" onClick={() => { window.colors3MainClass.updateSelectedShape(props.selectOptions[0]) }} value={props.selectOptions[0]} />{props.selectOptions[0]} </label> </div>
                    <div className="col-md-6 text-left"><label>  <input type="radio" className="form-check-input" name="optradio" onClick={() => { window.colors3MainClass.updateSelectedShape(props.selectOptions[1]) }} value={props.selectOptions[1]} />{props.selectOptions[1]} </label> </div>





                <ReactRough height="200" width="240" className="border">
                    <Polygon points={[[[10, 1], [30, 60], [0, 60], [6, 105], [38, 180], [100, 180], [165, 180], [180, 105], [200, 5], [125, 60]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />



*/
}

const extraMethodToDelete1 = () => {
    return (
        <aside>
            <div className="row">
                <div className="col-6"> <u>Guessed  </u></div>
                <div className="col-3"> <u>Exist</u></div>
                <div className="col-3"> <u>Match</u> </div>
            </div>
            <div className="row  my-2">
                <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess-1" value={this.state.bullsCows.stage > 0 ? (this.state.enteredNumber.numbers[0]) : ''} disabled /></div>
                <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" id="digit1Exis" value={this.state.bullsCows.stage > 0 ? (this.state.enteredNumber.exists[0]) : ''} disabled /></div>
                <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" id="digit1Match" value={this.state.bullsCows.stage > 0 ? (this.state.enteredNumber.matches[0]) : ''} disabled /> </div>
            </div>
            <div className="row  my-2">
                <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess2" value={this.state.bullsCows.stage > 1 ? (this.state.enteredNumber.numbers[1]) : ''} disabled /></div>
                <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" id="digit1Exis" value={this.state.bullsCows.stage > 1 ? (this.state.enteredNumber.exists[1]) : ''} disabled /></div>
                <div className="col-3"> <input type="test" className="col-12 form-control  inputFont40" id="digit1Match" value={this.state.bullsCows.stage > 1 ? (this.state.enteredNumber.matches[1]) : ''} disabled /> </div>
            </div>
            <div className="row  my-2">
                <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess3" value={this.state.bullsCows.stage > 2 ? (this.state.enteredNumber.numbers[2]) : ''} disabled /></div>
                <div className="col-3"> <input type="text" className="col-12 form-control  inputFont40" id="digit1Exis" value={this.state.bullsCows.stage > 2 ? (this.state.enteredNumber.exists[2]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Match" value={this.state.bullsCows.stage > 2 ? (this.state.enteredNumber.matches[2]) : ''} disabled /> </div>
            </div>
            <div className="row  my-2">
                <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess4" value={this.state.bullsCows.stage > 3 ? (this.state.enteredNumber.numbers[3]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Exis" value={this.state.bullsCows.stage > 3 ? (this.state.enteredNumber.exists[3]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Match" value={this.state.bullsCows.stage > 3 ? (this.state.enteredNumber.matches[3]) : ''} disabled /> </div>
            </div>
            <div className="row  my-2">
                <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess5" value={this.state.bullsCows.stage > 4 ? (this.state.enteredNumber.numbers[4]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Exis" value={this.state.bullsCows.stage > 4 ? (this.state.enteredNumber.exists[4]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Match" value={this.state.bullsCows.stage > 4 ? (this.state.enteredNumber.matches[4]) : ''} disabled /> </div>
            </div>
            <div className="row  my-2">
                <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess6" value={this.state.bullsCows.stage > 5 ? (this.state.enteredNumber.numbers[5]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Exis" value={this.state.bullsCows.stage > 5 ? (this.state.enteredNumber.exists[5]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Match" value={this.state.bullsCows.stage > 5 ? (this.state.enteredNumber.matches[5]) : ''} disabled /> </div>
            </div>
            <div className="row  my-2">
                <div className="col-6" > <input type="text" className="col-12 form-control inputFont40" id="digigtGuess7" value={this.state.bullsCows.stage > 6 ? (this.state.enteredNumber.numbers[6]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Exis" value={this.state.bullsCows.stage > 6 ? (this.state.enteredNumber.exists[6]) : ''} disabled /></div>
                <div className="col-3"> <input type="number" className="col-12 form-control  inputFont40" id="digit1Match" value={this.state.bullsCows.stage > 6 ? (this.state.enteredNumber.matches[6]) : ''} disabled /> </div>
            </div>

        </aside>

    );
}




export default Extra;


