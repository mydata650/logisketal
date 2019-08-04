import React from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import GamesPage from "./games/bullscows/GamesPage";
import PhoneNumber from "./games/phonenumber/PhoneNumber";
import FastTrack from "./games/fasttrack/FastTrack";
import PlaceMe from "./games/placeme/PlaceMe";
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
			<Route component={PageNotFound} />
		</Switch>
    </div>
  );
}

export default App;
