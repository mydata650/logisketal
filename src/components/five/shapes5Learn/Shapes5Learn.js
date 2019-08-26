import React from "react";
import ReactRough, { Rectangle, Circle, Polygon, Ellipse } from 'react-rough';
import UK from '../../imgs/language/uk.png';
import DA2 from '../../imgs/language/da2.png';

class Shapes5Learn extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.shapes5LearnMainClass = this;
    }

    state = {};
    getInitialState = () => {
        const initialState =
        {
            shapes: {
                shapes: ["Square", "Circle", "Rectangle", "Triangle", "Right Triangle", "Rhombus", "Ovel", "Trapezium", "Parallelogram", "Pentagon", "Hexagon", "Heptagon", "Star"]
            },
            danishShapes: {
                danishShapes: [  "Kvadrat",  "Cirkel", "Rektangel",  "Trekant-spidsvinklet",  "Trekant-Retvinklet",  "Rombe",  "Ovel",  "Trapez",  "Parallelogram",  "Pentagon",  "Hexagon",  "Heptagon",  "Stjerne" ]
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
                <SquareCircleRectangle state={this.state} />
                <TriangleRightTriangleRhombus state={this.state}/>
                <OvelTrapeziumParallelogram state={this.state} />
                <PentagonHexagonHeptagon state={this.state}/>
                <Star state={this.state}/>
            </div>
            <br /><br />
        </div>
    );
}
}

const SquareCircleRectangle = (props) => {
    return (
        <div className="row" >
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox  px-5" >
                <ReactRough height="200" width="240" >
                    <Rectangle points={[10, 20, 140, 140]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[0] : props.state.danishShapes.danishShapes[0]} </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox  px-5 border"  >
                <ReactRough height="200" width="240" >
                    <Circle points={[90, 90, 140]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[1] : props.state.danishShapes.danishShapes[1]}</div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5 border" >
                <ReactRough  height="200" width= "240" >
                    <Rectangle points={[10, 40, 140, 50]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br/>
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[2] : props.state.danishShapes.danishShapes[2]}</div>
            </div>
            
        </div>
    )
}
const TriangleRightTriangleRhombus = (props) => {
    return (
        <div className="row" >
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5" >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[100, 10], [10, 150], [190, 150]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[3] : props.state.danishShapes.danishShapes[3]}</div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox  px-5 border"  >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[150, 10], [150, 150], [10, 150]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5"> &#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[4] : props.state.danishShapes.danishShapes[4]}</div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5 border" >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[100, 10], [50, 80], [100, 150], [150, 80]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[5] : props.state.danishShapes.danishShapes[5]}</div>
            </div>
        </div>
    )
}
const OvelTrapeziumParallelogram = (props) => {
    return (
        <div className="row" >
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5" >
                <ReactRough height="200" width="240" >
                    <Ellipse points={[90, 95, 100, 180]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[6] : props.state.danishShapes.danishShapes[6]}</div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5 border"  >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[40, 10], [10, 140], [150, 140], [90, 10]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[7] : props.state.danishShapes.danishShapes[7]}</div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 learningBox tpx-5 border" >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[60, 20], [10, 140], [190, 140], [240, 20]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[8] : props.state.danishShapes.danishShapes[8]}</div>
            </div>
        </div>
    )
}
const PentagonHexagonHeptagon = (props) => {
    return (
        <div className="row" >
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5 " >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[80, 20], [10, 90], [30, 160], [120, 160], [150, 90]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[9] : props.state.danishShapes.danishShapes[9]}</div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox  border px-5"  >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[50, 20], [10, 90], [50, 160], [120, 160], [160, 90], [120, 20]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[10] : props.state.danishShapes.danishShapes[10]}</div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 learningBox  border px-5    " >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[85, 0], [25, 35], [10, 102], [50, 160], [130, 160], [170, 103], [155, 35]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className="h5">&#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[11] : props.state.danishShapes.danishShapes[11]}</div>
            </div>
        </div>
    )
}
const Star = (props) => {
    return (
        <div className="row" >
            <div className="col-md-4 col-sm-6 col-xs-12 learningBox px-5 border" >
                <ReactRough height="200" width="240" >
                    <Polygon points={[[[100, 0], [80, 60], [10, 60], [68, 105], [38, 180], [100, 130], [165, 180], [140, 105], [200, 60], [125, 60]]]} fill="rgba(255,113,13, 0.3)" />
                </ReactRough><br />
                <div className=" h5"> &#9758; {Number(props.state.language.language) === 0 ? props.state.shapes.shapes[12] : props.state.danishShapes.danishShapes[12]}</div>
            </div>
        </div>
    )
}


const GameNumbers = (props) => {
    return (
        <aside>
            <div className="row pl-4 ">
                <div className="col-xs-1 "> </div>
                <div className="col-xs-1 "></div>
                <div className="col-xs-4  pl-1 text-info"><span className="h1 text-right"> &#8526;</span><span className="h2 ">{Number(props.state.language.language) === 0 ? "Shapes" : "Figurer"}</span> <span className="  small">{Number(props.state.language.language) === 0 ? "(child under 5 years)" : "(barn under 5 år)"}</span>
                 </div>
                <div className="col-xs-6"></div>
            </div>
            <div className="row border-bottom px-2">
                <div className="col-xs-6 col-6 small">{Number(props.state.language.language) === 0 ? "Here is list of all shapes for a child under age of 5 years..." : "Her er liste af alle figurer for en barn under 5 år...."} </div>
                <div className="col-xs-6 col-6 text-right">
                    <img src={UK} className="img-fluid" alt="Responsive image" width={25} style={{ "cursor": "pointer" }} onClick={e => window.shapes5LearnMainClass.updateLanguage(0)} /> &nbsp;
                        <img src={DA2} className="img-fluid " alt="Responsive image" width={25} style={{ "cursor": "pointer" }} onClick={e => window.shapes5LearnMainClass.updateLanguage(1)} />
                </div>
            </div>
        </aside>
    )
}







export default Shapes5Learn;


