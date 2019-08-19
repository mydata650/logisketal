






























import React from "react";
import ReactRough, { Rectangle } from 'react-rough';

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
            <ReactRough width={1220} height={220} >
                <Rectangle points={[10, 10, 60, 60]} fill="green" fillWeight={3} />
                <Rectangle points={[10, 80, 60, 60]} fill="blue" fillWeight={3} />
                <Rectangle points={[80, 10, 60, 60]} fill="orange" fillWeight={3} />
                <Rectangle points={[80, 80,60, 60]} fill="red" fillWeight={3} />
                <Rectangle points={[160, 80,60, 60]} fill="black" fillWeight={3} />
                <Rectangle points={[240, 80,60, 60]} fill="pink" fillWeight={3} />
                <Rectangle points={[320, 80,60, 60]} fill="yellow" fillWeight={3} />
                <Rectangle points={[400, 80,60, 60]} fill="purple" fillWeight={3} />
                <Rectangle points={[480, 80,60, 60]} fill="gold" fillWeight={3} />
                <Rectangle points={[560, 80,60, 60]} fill="white" fillWeight={3} />
                <Rectangle points={[640, 80,100, 100]} fill="silver" fillWeight={3} />
                <Rectangle points={[920, 80,150, 150]} fill="grey" fillWeight={3} />
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


