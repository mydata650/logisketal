import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './css/index.css';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';

import CookieConsent, { Cookies } from "react-cookie-consent";


render(
    <div>
    <Router>
        <App />
    </Router>
    <CookieConsent
        onAccept={() => { }}
        debug={false}
    //enableDeclineButton
    //declineButtonText="Decline (optional)"
    //onDecline={() => { alert("nay!") }}
    >
        <span className="small"> We use cookies to personalize content and to analyze our traffic. Some of these cookies also help improve your user experience on our websites. {" "} </span>
    </CookieConsent>
</div>,
    
    document.getElementById("root")
);