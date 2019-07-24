import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './css/index.css';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';

render(
    <Router>
        <App />
    </Router>,
	document.getElementById("root")
);


