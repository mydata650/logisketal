import React from "react";
import GamesPage from "../games/bullscows/GamesPage";
import PhoneNumber from "../games/phonenumber/PhoneNumber";
import FastTrackFile from "../games/fasttrack/FastTrack";

const SevenYearAbout = () => {
    return (
        <div className="container pt-4 border">
            <GameNumbers />
            <div className="card-columns pt-4">
                <Division7 />
            </div>
        </div>
    );
}

const GameNumbers = () => {
    return (
        <aside>
            <div className="row pl-4 ">
                <div className="col-xs-1 text-right numberOne h2"> </div>
                <div className="col-xs-1 text-left  numberTwo h2">&#10102;</div>
                <div className="col-xs-4  pl-1 text-info"><span className="h2 tempFontPrincess"> games</span> <span className=" tempFontOpenSans small">(7 years)</span></div>
                <div className="col-xs-6"></div>
            </div>
            <div className="row border-bottom px-2">
                <div className="col-xs-12 small">Here will be list of games for 7 years old players.... </div>
            </div>
        </aside>
    )
}

const Division7 = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-danger" >&divide;</div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">101 </span> Division 7 </h4>
                <p className="card-text"><span className="small">Spil rolle &#10095; Grundlæggende division øvelse  for et barn under 7 år</span><br />

                </p>
                <a href="/division7" className="btn btn-success btn-block"> Spille </a>
            </div>
        </div>
    )
}


export default SevenYearAbout;


