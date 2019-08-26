import React from "react";
import ReactRough, { Rectangle, Circle, Polygon, Ellipse } from 'react-rough';
import UK from '../../imgs/language/uk.png';
import DA2 from '../../imgs/language/da2.png';

class Colors3Learn extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.colors3LearnMainClass = this;
    }
    state = {};
    getInitialState = () => {
        const initialState =
        {
            colors: {
                colors: ["Green", "Red", "Blue", "Orange", "Black", "Pink", "Yellow", "Purple", "White", "Grey"]
            },
            danishColors: {
                danishColors: ["Grøn", "Rød", "Blå", "Orange", "Sort", "Lyserød", "Gul", "Lilla", "Hvid", "Grå"]
            },
            language: {
                language: 1
            }
        };
        return initialState;
    }

    updateLanguage = (value) => {
        var tempLanguage = this.state.language;
        tempLanguage.language = value;
        this.setState({ tempLanguage });
    }
render() {
    return (
        <div className="container pt-4 border">
            <GameNumbers state={this.state}/>
            <div className="">
                <Temp state={this.state}/>
            </div>
            <br /><br />
        </div>
    );
}
}

const Temp = (props) => {
    var names = ["Green", "Red", "Blue", "Orange", "Black", "Pink", "Yellow", "Purple", "White", "Grey"];
    var i = 0;
    return (
        <aside>
        <div className="row" >
               {names.map(function (name, index) {
                    return <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5 border" >
                
                        <ReactRough height="200" width="240" className="border">
                            <Polygon points={[[[10, 1], [30, 60], [0, 60], [6, 105], [38, 180], [100, 180], [165, 180], [180, 105], [200, 5], [125, 60]]]} fill={names[index]} fillWeight={4}  />
                        </ReactRough><br />
                        <div className=" h5 pl-5 "> <mark> &#9758; {Number(props.state.language.language) === 0 ? props.state.colors.colors[index] : props.state.danishColors.danishColors[index]}</mark></div>
                </div>
               })}
         </div>
         </aside>
    )
}
const GameNumbers = (props) => {
    return (
        <aside>
            <div className="row pl-4 ">
                <div className="col-xs-1 "> </div>
                <div className="col-xs-1 "></div>
                <div className="col-xs-4 text-info"><span className="h1 text-right">&#9731;</span><span className="h2 ">{Number(props.state.language.language) === 0 ? "Colors" : "Farver"}</span> <span className="  small">{Number(props.state.language.language) === 0 ? "(child under 3 years)" : "(barn under 3 år)"}</span>
                 </div>
                <div className="col-xs-6"></div>
            </div>
            <div className="row border-bottom px-2">
                <div className="col-xs-6 col-6 small">{Number(props.state.language.language) === 0 ? "Here is list of colours for a child under age of 3 years..." : "Her er liste af farver for en barn under 3 år...."} </div>
                <div className="col-xs-6 col-6 text-right ">
                    <img src={UK} className="img-fluid" alt="Responsive image" width={25} style={{ "cursor": "pointer" }} onClick={e => window.colors3LearnMainClass.updateLanguage(0)} /> &nbsp;
                        <img src={DA2} className="img-fluid " alt="Responsive image" width={25} style={{ "cursor": "pointer" }} onClick={e => window.colors3LearnMainClass.updateLanguage(1)} />
                </div>
            </div>
        </aside>
    )
}

export default Colors3Learn;


