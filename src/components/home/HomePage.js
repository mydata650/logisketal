import React from "react";
/*import GamesPage from "../bullscows/GamesPage.js";
import PhoneNumber from "../phonenumber/PhoneNumber.js"; */
import FastTrack from "../games/fasttrack/FastTrack.js";
//import Denmark from './imgs/denmark1.png';
import Denmark from './imgs/denmark1.png';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.mainPageMainClass = this;
    }
    state = {};

    getInitialState = () => {
        const initialState =
        {
            number: {
                number: [3, 5, 2, 4]
            },
            orignalNo: { orignalNo: 3524 },
            status: { status: 0 },
            values: {
                asc: [0, 0, 0, 0, 0, 0, 0, 0],
                dsc: [0, 0, 0, 0, 0, 0, 0, 0],
                numbers: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            count: { count: 0 }
        }
        return initialState;
    }

    updateNumber = (numberArray) => {
        var tempNumber = this.state.number;
        tempNumber.number = numberArray;
        this.setState({ tempNumber });
    }

    updateOrignalNumber = (orignalNo) => {
        var gameOrignalNo = this.state.orignalNo;
        gameOrignalNo.orignalNo = orignalNo;
        this.setState({ gameOrignalNo });
    }

    updateValues = (count) => {
        var gameValues = this.state.values;
        gameValues.numbers[count] = getNumber(this.state.number.number);
        gameValues.asc[count] = getNumber(sortASC(this.state.number.number));
        gameValues.dsc[count] = getNumber(sortDSC(this.state.number.number));
        this.setState({ gameValues });
    }

    setCountZero = () => {
        var gameCount = this.state.count;
        gameCount.count = 0;
        this.setState({ gameCount });
    }

    updateCount = () => {
        var gameCount = this.state.count;
        gameCount.count += 1;
        this.setState({ gameCount });
    }

    getNewNumber = event => {
        var value = 0;
        this.setCountZero();
        var initArray = getRandomNo();
        this.updateOrignalNumber(getNumber(initArray));
        var counter = 0;
        this.updateNumber(initArray);
        while (counter < 7 && value !== 6174) {
            var count = Number(this.state.count.count);
            this.updateValues(count);
            value = Number(this.state.values.dsc[count]) - Number(this.state.values.asc[count]);
            this.updateNumber(getArrayFromNo(Number(value)));
            this.updateCount();
            counter++;
        }


    }

    render() {

        return (
            <div className="container-fluid ">
                <ShowFirstRow />
                <ShowSecondRow number={this.state.orignalNo.orignalNo} count={this.state.count.count} values={this.state.values} />
                <ShowThirdRow number={this.state.orignalNo.orignalNo} count={this.state.count.count} values={this.state.values} />
                <ShowForthRow />
            </div >
        );
    }
}

const ShowFirstRow = () => {
    return (
        <div className="row">
            <div className="col-md-12 bgImg3">
                <div className="siteTitle text-center"><div className="display-1 "> &#8752;<br /><span style={{ "font-weight": "800" }}>Loetal</span> </div>
                    <span className="h4 text-white">Og vi kan godt lide at lege med tal! </span>
                </div>
            </div>
        </div>
    );
}

const ShowSecondRow = (props) => {
    return (
        <div className="row bgImg4">
            <div className="col-md-12 alignCenter py-5" >
                <div className="row  "><div className="col-12 h2 centuryFont "> <span className="display-4 text-warning">&#8576; </span> 6174 Kapreka's constant  </div> </div>
                <div className="row "> <div className="col-md-12">6174 is known as Kaprekar's constant after the Indian mathematician D. R. Kaprekar. This number is notable as it always acheived with maximum 7 iterations:  Read more <a href="https://en.wikipedia.org/wiki/6174_(number)" target="_blank"> here </a></div> </div>

                <div className="row py-4">
                    <div className="col-12   ">
                        <div className="row hP100">
                            <div className="col-md-12 col-sm-12 col-xs-12 ">
                                <aside className="boxAlign rounded-left ">
                                    <NewGameRowShow /><hr />
                                    <CurrentNoRowShow number={props.number} /><hr />
                                    {Number(props.count) === 0 ? < ResultsTextBoxRowShow /> : <NewResultsTextBoxRowShow count={props.count} values={props.values} />} <hr />
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const NewGameRowShow = (props) => {
    return (
        <aside>
            <div className="row headPad px-2">
                <div className="col-12 text-right"><button type="button" className="btn btn-success btn-sm mt-1  rounded-circle circleButt boxAlign" onClick={window.mainPageMainClass.getNewNumber}> Next </button> </div>
            </div>
        </aside>
    );
}

const CurrentNoRowShow = (props) => {
    return (
        <div className="row">
            <div className="col-12 px-4 text-left"><span className="small">     Random No: </span> <span> {props.number} </span> </div>
        </div>
    );
}

const ResultsTextBoxRowShow = (props) => {
    return (
        <div>
            <div className="row px-2">
                <div className="col-2 text-info"> <u>ASC </u></div>
                <div className="col-2 text-info"> </div>
                <div className="col-2 text-info"> <u>DES</u> </div>
                <div className="col-2 text-info">  </div>
                <div className="col-2 text-info"> <u>No.</u> </div>
                <div className="col-2 text-info"> <u>...</u> </div>
            </div>

            <div className="row  my-2 px-2">
                <div className="col-2 " >5432 </div>
                <div className="col-2  text-danger">-</div>
                <div className="col-2 ">2345</div>
                <div className="col-2  text-info" >= </div>
                <div className="col-2 ">3087</div>
                <div className="col-2 ">1 </div>
            </div>

            <div className="row  my-2 px-2">
                <div className="col-2" >8730 </div>
                <div className="col-2 text-danger">-</div>
                <div className="col-2">0378</div>
                <div className="col-2 text-info">= </div>
                <div className="col-2">8352</div>
                <div className="col-2">2 </div>
            </div>

            <div className="row  my-2 px-2">
                <div className="col-2" >8532 </div>
                <div className="col-2 text-danger">-</div>
                <div className="col-2">2358</div>
                <div className="col-2 text-info" >= </div>
                <div className="col-2">6174</div>
                <div className="col-2">3 </div>
            </div>

            <div className="row  my-2 px-2">
                <div className="col-2" >7641 </div>
                <div className="col-2 text-danger">-</div>
                <div className="col-2">1467</div>
                <div className="col-2 text-info">= </div>
                <div className="col-2"> <span className="h4 text-warning"> 6174 </span></div>
                <div className="col-2">4 </div>
            </div>

        </div>
    );
}

const NewResultsTextBoxRowShow = (props) => {
    const rows = [];
    for (var i = 0; i < props.count; i++) {
        rows.push(<SingleValueShow dsc={props.values.dsc[i]} asc={props.values.asc[i]} term={i + 1} />);
    }
    return (
        <div>
            <div className="row px-2">
                <div className="col-2 text-info"> <u>ASC </u></div>
                <div className="col-2 text-info"> </div>
                <div className="col-2 text-info"> <u>DES</u> </div>
                <div className="col-2 text-info">  </div>
                <div className="col-2 text-info"> <u>No.</u> </div>
                <div className="col-2 text-info"> <u>...</u> </div>
            </div>
            {rows}
        </div>
    );
}

const SingleValueShow = (props) => {
    let newNo = Number(props.dsc) - Number(props.asc);
    return (
        <div className="row  my-2 px-2">
            <div className="col-2 " >{props.dsc} </div>
            <div className="col-2  text-danger">-</div>
            <div className="col-2 ">{props.asc}</div>
            <div className="col-2  text-info" >= </div>
            <div className="col-2 ">{newNo === 6174 ? <span className="h4 text-warning"> {newNo} </span> : newNo}</div>
            <div className="col-2 ">{Number(props.term)}</div>
        </div>
    );
}

const ShowThirdRow = () => {
    return (
        <div className="row bgImg5">
            <div className="col-md-12 alignCenter py-5" >
                <div className="row  "><div className="col-12 text-info  "><span className="h1">&#9847; </span> <span className="h2 centuryFont"> Favourite games</span>  </div> </div>
                <GameBoxRow1 />
                <GameBoxRow2 />
            </div>
        </div>
    );
}

const GameBoxRow2 = () => {
    return (
        <div className="row">
            <div className="col-md-4 my-3">
                <div className="row mx-1 hP100">
                    <div className="col-12 shadBlack rounded game3Box ">
                        <aside className="pad60">
                            <div className="row"><div className="col-12 h1 text-center "><span className="text-warning">&#8506;</span> <span className="centuryFont"> BullsCows </span></div> </div>
                            <div className="row"><div className="col-12 text-center ">Find a 4 digits number with maximum 7 chances. Number can't start with 0, can't have digit repetition. </div></div>
                            <div className="row"><div className="col-12 text-center py-2"> <a href="/games" className="btn btn-default mt-1 rounded circleButtGame1 boxAlign text-white"> Play game </a> </div></div>
                        </aside>
                    </div>
                </div>
            </div>

            <div className="col-md-4 my-3">
                <div className="row mx-1 hP100">
                    <div className="col-12 shadBlack rounded game3Box  ">
                        <aside className="pad60">
                            <div className="row"><div className="col-12 h1 text-center noPadding "><span className="text-info">&#9816;</span><span className="centuryFont">RememberMe </span></div> </div>
                            <div className="row"><div className="col-12 text-center ">Remember an 8 digits number for few seconds and then enter in form of 4 numbers of double digits   </div></div>
                            <div className="row"><div className="col-12 text-center py-2"> <a href="/phonenumber" className="btn btn-default mt-1 rounded circleButtGame1 boxAlign text-white"> Play game </a> </div></div>
                        </aside>
                    </div>
                </div>
            </div>

            <div className="col-md-4 my-3">
                <div className="row mx-1 hP100">
                    <div className="col-12 shadBlack rounded game3Box  ">
                        <aside className="pad60">
                            <div className="row"><div className="col-12 h1 text-center "><span className="text-danger">&#9906;</span> <span className="centuryFont"> PlaceMe </span></div> </div>
                            <div className="row"><div className="col-12 text-center ">Place digits between 1 to 9 on valid position to get a total written in diagonal, horizontal or vertical direction. </div></div>
                            <div className="row"><div className="col-12 text-center py-2"> <a href="/placeme" className="btn btn-default mt-1 rounded circleButtGame1 boxAlign text-white"> Play game </a> </div></div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>

    );
}

const GameBoxRow1 = () => {
    return (
        <div className="row">
            <div className="col-md-8  my-3 hP100">
                <div className="row mx-1 hP100">
                    <div className="col-12 shadBlack rounded game1Box  ">
                        <aside className="pad60">
                            <div className="row"><div className="col-12 h1 text-center "><span className="">&#9876;</span> <span className="centuryFont"> Fast-track </span></div> </div>
                            <div className="row"><div className="col-12 text-center ">Solve 10 simple arithmatic questions in 52 seconds. Each right answer has 1 point and wrong has -2 points. </div></div>
                            <div className="row"><div className="col-12 text-center py-2"> <a href="/fasttrack" component={FastTrack} className="btn btn-warning  mt-1  rounded circleButtGame1 boxAlign"> Play game </a> </div></div>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="col-md-4 my-3">
                <div className="row mx-1 hP100">
                    <div className="col-12 shadBlack rounded game2Box  ">
                        <aside className="pad60">
                            <div className="row"><div className="col-12 h1 text-center "><span className="">&#8474;</span> <span className="centuryFont"> Quento </span></div> </div>
                            <div className="row"><div className="col-12 text-center ">Add or subtract digits to find a total between 10 and 25.. </div></div>
                            <div className="row"><div className="col-12 text-center py-2"> <a href="/quento" className="btn btn-default mt-1 rounded circleButtGame1 boxAlign text-white"> Play game </a> </div></div>
                        </aside>
                    </div>
                </div>

            </div>
        </div>

    );
}


const ShowForthRow = () => {
    return (
        <div className="row bgImg6">
            <div className="col-md-12 alignCenter py-5" >
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12 text-white centuryFont font-weight-bold h1  "><span className="">&#8752; </span> <span className=""> Loetal</span>  </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 py-2 text-right">
                        <a href="/about" className="btn btn-success btn-sm rounded circleButt boxAlign mx-2 pt-2 font-weight-bold"> 10Y </a>
                        <a href="/seven" className="btn btn-info btn-sm rounded circleButt boxAlign mx-2 pt-2 font-weight-bold"> 7Y </a>
                        <a href="/five" className="btn btn-primary btn-sm rounded circleButt boxAlign mx-2 pt-2 font-weight-bold text-white"> 5Y </a>
                        <a href="/three" className="btn btn-danger btn-sm rounded circleButt boxAlign mx-2 pt-2 font-weight-bold"> 3Y </a>
                    </div>
                </div>

                <div className="row border border-bottom-0"><div className="col-12 text-info"> </div> </div>

                <div className="row pad60">

                    <div className="col-md-4 col-sm-6 col-xs-12 px-3 pyt-2">
                        <span className="h5 centuryFont"> About </span> <p className="centuryFont">Loetal contains vrious games which target children of different age groups. Each game has a specific goal like logic, arithmatic or memory development.
                           <br /> <br />The site is in development phase, where change in material, layout or context can occur without any prior notice.   <br /> Loetal is only for entertaining or learning purpose and especially not handling with any financial deal or agreements.
                            </p>
                    </div>

                    <div className="d-none d-sm-none d-md-block  col-md-4  ">
                        <img src={Denmark} />
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12 pt-4">
                        <span className="h5 centuryFont"> Contact us </span>
                        <ul className="centuryFont" style={{ "listStyle": "none" }}>
                            <li className="text-warning">&#9750; Address </li>
                            <li>Louisevej 8220, Braband </li>
                            <li><br /></li>
                            <li className="text-warning">&#9993; Email </li>
                            <li> mydata650@hotmail.com </li>
                        </ul>
                    </div>
                </div>



                <div className="row bottom-fixed"><div className="col-12 text-white small centuryFont">Alle rights are reserver @Loetal 2019 </div> </div>
            </div>
        </div>
    );
}







const ShowQuete = (props) => {
    return (
        <aside className="text-dark">
            <blockquote className="blockquote  text-right">{props.saying}!
                <footer className="blockquote-footer text-danger"><i> {props.writer}</i></footer>
            </blockquote>
        </aside>
    );
}



const ShowContact = () => {
    return (
        <aside className="text-white tempFontOpenSans py-5">
            <div className="row"><div className="col-sm-12 h5">Contact: </div></div>
            <div className="row"><div className="col-sm-12 ">&#9750; Address: </div></div>
            <div className="row"><div className="col-sm-12 ">Louisevej 8220, Braband </div></div>
            <div className="row"><div className="col-sm-12 "><br /><hr /><br /></div></div>
            <div className="row"><div className="col-sm-12 "> &#9993;  mydata650@gmail.com   </div></div>
        </aside>
    );
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

function getNumber(array) {
    var strValue = "";
    for (var i = 0; i < array.length; i++) { strValue += array[i]; }
    return parseInt(strValue);
}

function sortDSC(arry) {
    return arry.sort(function (a, b) { return b - a });
}

function sortASC(arry) {
    return arry.sort(function (a, b) { return a - b });
}

function getArrayFromNo(num) {
    let arr = Array.from(String(num), Number);
    return arr
}

export default HomePage;


