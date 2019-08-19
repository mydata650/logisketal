import React from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import GamesPage from "./games/bullscows/GamesPage";
import PhoneNumber from "./games/phonenumber/PhoneNumber";
import FastTrack from "./games/fasttrack/FastTrack";
import PlaceMe from "./games/placeme/PlaceMe";
import Quento from "./games/quento/Quento";
import Extra from "./games/extra/Extra";

import Ten from "./ten/TenYearAbout";
import Seven from "./seven/SevenYearAbout";
import Five from "./five/FiveYearAbout";

import Three from "./three/ThreeYearAbout";
import Colors3 from "./three/colors3/Colors3";

import PageNotFound from "./PageNotFound";
import Header from "./common/Header";
import '../css/App.css';

function App() {
  return (
    <div className="">
		<Header />
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/about" component={AboutPage} />
			<Route path="/games" component={GamesPage} />
			<Route path="/phonenumber" component={PhoneNumber} />
			<Route path="/fasttrack" component={FastTrack} />
			<Route path="/placeme" component={PlaceMe} />
			<Route path="/quento" component={Quento} />

              <Route path="/three" component={Three} />
              <Route path="/Colors3" component={Colors3} />

              <Route path="/five" component={Five} />
              <Route path="/seven" component={Seven} />
              <Route path="/ten" component={Ten} />

              <Route path="/extra" component={Extra} />
			<Route component={PageNotFound} />
		</Switch>
    </div>
  );
}

export default App;
