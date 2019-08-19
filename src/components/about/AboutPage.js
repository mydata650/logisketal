import React from "react";
//import { Link } from "react-router-dom";
import GamesPage from "../games/bullscows/GamesPage";
import PhoneNumber from "../games/phonenumber/PhoneNumber";
import FastTrackFile from "../games/fasttrack/FastTrack";

const AboutPage = () => {
    return (
        <div className="container pt-4 border">
            <GameNumbers />
            <div className="card-columns pt-4">
                <BullsCows />
                <RememberMe />
                <ComingSoon />
                <PlaceMe />
                <FastTrack />
            </div>
        </div>
    );
}

const GameNumbers = () => {
    return (
        <aside>
            <div className="row pl-4 ">
                <div className="col-xs-1 text-right numberOne h2"> </div>
                <div className="col-xs-1 text-left  numberTwo h2">&#10106;</div>
                <div className="col-xs-4  pl-1 text-info"><span className="h2 tempFontPrincess"> games</span> <span className=" tempFontOpenSans small">(over 10 years)</span></div>
                <div className="col-xs-6"></div>
            </div>
            <div className="row border-bottom px-2">
                <div className="col-xs-12 small">The page contains list of games developed for players over 10 years. All the games involve simple logical or arithmatic calculations. </div>
            </div>
        </aside>
    )
}

const FastTrack = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center" > &#9876; </div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">104 </span> FastTrack </h4>
                <p className="card-text"><span className="small">Game role &#10095; mind sharpness </span><br />
                    A game which handles basic arithmetic questions, where player has to solve simple calculation at fast track. Precisely 10 questions should be answered within 60 seconds. Each wrong answer will cost 8 seconds but right question will earn more 2 seconds.
                    Beside the solution, option could also be like should I solve or not, to save the time.
                        </p>
                <a href="/fasttrack" component={FastTrackFile} className="btn btn-success btn-block"> Play game </a>
            </div>
        </div>
    )
}

const ComingSoon = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-info" >&#8474; </div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">103 </span> Quento </h4>
                <p className="card-text"><span className="small">Game role &#10095; mind sharpness </span><br />
                    Add or substract digits to find a total. There are only 5 digits available and repetition is not allowed. Which means, a digit is allowed only once, however opertator can be used multiple times.  </p>
                <a href="/quento" component={FastTrackFile} className="btn btn-success btn-block"> Play game</a>
            </div>
        </div>
    )
}

const PlaceMe = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-info" >&#9906; </div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">105 </span> PlaceMe </h4>
                <p className="card-text">Player has to write digits between 1 and 9 on proper place with in 1 minute. Objective of the game is to develop analytical view in short time </p>
                <a href="/placeme" component={PlaceMe} className="btn btn-success btn-block"> Play game </a>
            </div>
        </div>
    )
}

const RememberMe = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-danger" > &#9816; </div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">102 </span> Remember me </h4>
                <p className="card-text"><span className="small">Game role &#10095; short-term memory development </span><br />A game for the sake of memory development. Player has a chance to look at 8 digits number for 5 seconds, then he has to remember the number for next 10 seconds. The number should be remember in form of 4 double digits numbers like 43230954 has 43, 23, 09, 54.  </p>
                <a href="/phonenumber" component={PhoneNumber} className="btn btn-success btn-block"> Play game </a>
            </div>
        </div>
    )
}

const BullsCows = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-warning" > &#8506; </div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">101 </span> BullsCows </h4>
                <p className="card-text"><span className="small">Game role &#10095; logic development </span><br />A game to find a 4 digit number with 7 chances. Each time player enters a number, system checks either the number is correct, otherwise gives hint about how many digits are found (cows) and how many are located at exact position (bulls). Number cannot have any digit more than once. Like 3323, 0423 are not correct numbers, however 1234, 2034 are correct numbers.  </p>
                <a href="/games" component={GamesPage} className="btn btn-success btn-block"> Play game </a>
            </div>
        </div>
    )
}

export default AboutPage;


 