import React from "react";
import ReactRough, { Rectangle, Circle, Polygon, Ellipse} from 'react-rough';

const Extra2 = () => {
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
        <div className="container">
            <div className="row" style={{ backgroundColor: "#5D5C61" }}><div className="col-12 text-white">#5D5C61<br /><br /><br /><br /><br /> </div> </div>
            <div className="row" style={{ backgroundColor: "#379683" }}><div className="col-12 text-white">#379683<br /><br /><br /><br /><br /> </div> </div>
            <div className="row" style={{ backgroundColor: "#7295AE" }}><div className="col-12 text-white">#7295AE<br /><br /><br /><br /><br /> </div> </div>
            <div className="row" style={{ backgroundColor: "#557A95" }}><div className="col-12 text-white">#557A95<br /><br /><br /><br /><br /> </div> </div>
            <div className="row" style={{ backgroundColor: "#B1A296" }}><div className="col-12 text-white">#B1A296<br /><br /><br /><br /><br /> </div> </div>
            
            
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


const toDelete = () =>{
    //return (
    //    <nav className=" navbar navbar-expand-lg navbar-light bg-light  bg-transparent">
    //        <a className="navbar-brand" href="/">Loetal</a>
    //        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //            <span className="navbar-toggler-icon"></span>
    //        </button>
    //        <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //            <ul className="navbar-nav mr-auto">
    //                <li className="nav-item active"><a className="nav-link" href="/" activeStyle={activeLink}  > <span className="sr-only">(current)</span></a></li>
    //                <li className="nav-item active"><a className="nav-link" href="/about" activeStyle={activeLink} >Barn <span className="small text-info font-weight-light"> (over 10Y) </span> </a></li>
    //                <li className="nav-item active"><a className="nav-link" href="/seven" activeStyle={activeLink} >Barn <span className="small text-info font-weight-light"> (under 7Y) </span> </a></li>
    //                <li className="nav-item active"><a className="nav-link" href="/five" activeStyle={activeLink} >Barn <span className="small text-info font-weight-light"> (under 5Y) </span> </a></li>
    //                <li className="nav-item active"><a className="nav-link" href="/three" activeStyle={activeLink} >Barn <span className="small text-info font-weight-light"> (under 3Y) </span> </a></li>
    //            </ul>
    //        </div>
    //    </nav>        
    // );
    

    //<div className="col-12" style={{ "border": "1px solid red" }}>
    //    <div className="row" style={{ "border": "1px solid yellow", "height": "100%" }}>
    //        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 border-right   textCenter" style={{ "height": "100%" }}><aside className="h2"> &#10112;<br />Loetal contains various number games which help in logic and memory development.</aside></div>
    //        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  textCenter">
    //            <ShowQuete className="text-danger" saying="Numbers are the most certain things we have" writer="Andy Rooney" />
    //            <ShowQuete saying="And we'll play with these numbers" writer="Loetal" />
    //        </div>
    //    </div>
    //</div>
}


export default Extra2;


