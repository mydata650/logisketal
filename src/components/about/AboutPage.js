﻿import React from "react";
//import { Link } from "react-router-dom";
import GamesPage from "../games/bullscows/GamesPage";
import PhoneNumber from "../games/phonenumber/PhoneNumber";


const AboutPage = () => {
    return (
        <div className="container pt-4 border">
            <h2>List of games </h2>
            <div className="card-columns">
                <BullsCows />
                <RememberMe />
                <ComingSoon />
                <FastTrack />
            </div>
        </div>
    );
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
                <a href="/fasttrack" component={PhoneNumber} className="btn btn-success btn-block"> Play game </a>
            </div>
        </div>
    )
}
const ComingSoon = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-info" >&#9861; </div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">103 </span> Comming soon </h4>
                <p className="card-text">Here will come a new game, which is under process.. </p>
                <a href="/" className=""> Comming soon.. </a>
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


 