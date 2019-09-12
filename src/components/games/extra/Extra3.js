import React from "react";
import GamesPage from "../games/bullscows/GamesPage.js";
import PhoneNumber from "../games/phonenumber/PhoneNumber.js";
import FastTrack from "../games/fasttrack/FastTrack.js";

const HomePage = () => {
    return (
        <div className="container-fluid body-content">
            <ShowFirstRow />
            <ShowSecondRow />
            <ShowThirdRow />
            <ShowForthRow />
        </div >
    );
}

const ShowFirstRow = () => {
    return (
        <div className="row text-white">
            <div className="col-md-6">
                <div className="row bgc2 height315px ">
                    <div className="col-md-12 display-3 text-center tempFontPrincess">
                        <aside className="py-5">
                            &#9812; <br />
                            Loetal
                        </aside>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12  bgc1 greenColor height315px"><aside className="h2 py-4"> &#10112;<br />Loetal contains various number games which help in logic and memory development.</aside></div>
                    <div className="col-md-6 col-sm-12  col-xs-12 bgc2 height315px py-5">
                        <ShowQuete saying="Numbers are the most certain things we have" writer="Andy Rooney" />
                        <br />
                        <ShowQuete saying="And we'll play with these numbers" writer="Loetal" />
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-sm-0 col-xs-0 bgImg1"></div>
        </div>
    );
}

const ShowSecondRow = () => {
    return (
        <div className="row text-white classNoShow">
            <div className="col-md-6  ">
                <div className="row">
                    <div className="col-md-6 bgc1 height315px greenColor">
                        <ShowNumbers />
                    </div>
                    <div className="col-md-6 bgc2 height315px"></div>
                </div>
                <div className="row  height315px">
                    <div className="col-md-6 bgc1 greenColor display-1 py-5 text-center tempFontPrincess topPadSmall">&#8732;</div>
                    <div className="col-md-6 bgc2  display-1 py-5 text-center tempFontPrincess topPadSmall">&#8731;</div>
                </div>

            </div>
            <div className="col-md-6 height630px bgImg2"></div>
        </div>
    );
}

const ShowThirdRow = () => {
    return (
        <div className="row text-warning height315px">
            <div className="col-md-3 "></div>
            <div className="col-md-3 bgc1">
                <ShowQuickLinks />
            </div>
            <div className="col-md-3 bgc2">
                <ShowContact />
            </div>
            <div className="col-md-3 "></div>
        </div>
    );
}

const ShowForthRow = () => {
    return (
        <div className="row overflow-hidden navBarBG footerHeight py-2 border border-top">
            <div className="col-md-12 col-sm-12 col-xs-12 text-center greenColor"> All rights are reserved for Loetal @2019 </div>
        </div>
    );
}

const ShowQuete = (props) => {
    return (
        <aside className="text-white">
            <blockquote className="blockquote  text-right">{props.saying}!
                <footer className="blockquote-footer text-white"><i> {props.writer}</i></footer>
            </blockquote>
        </aside>
    );
}

const ShowNumbers = () => {
    return (
        <div className="text-center font72">&#9847;</div>
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

const ShowQuickLinks = () => {
    return (
        <aside className="greenColor tempFontOpenSans py-5">
            <div className="row  py-1"><div className="col-sm-12 ">&#9745; Quick link to games: </div></div>
            <div className="row  " >
                <div className="col-sm-12 py-2">
                    <a href="/games" component={GamesPage} className="btn btn-secondary btn-block  bgc2 text-left"> &#10004; BullsCow: <span className="small font-italic">logic development </span> </a>
                </div>

                <div className="col-sm-12 py-2  ">
                    <a href="/phonenumber" component={PhoneNumber} className="btn btn-secondary btn-block text-left"> &#10004; Phone-number: <span className="small font-italic">short memory develop. </span> </a>
                </div>

                <div className="col-sm-12  py-2 ">
                    <a href="/fasttrack" component={FastTrack} className="btn btn-secondary btn-block text-left"> &#10004; Fast-track: <span className="small font-italic">quick arithmetic.. </span> </a>
                </div>
            </div>
        </aside>
    );
}

export default HomePage;