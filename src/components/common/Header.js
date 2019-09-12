import React from "react";

const Header = () => {
    const activeLink = { color: "/F15B2A" }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark  text-white headBG">
            <a className="navbar-brand text-white centuryFont font-weight-bold" href="/">&#8752; Loetal</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active centuryFont"><a className="nav-link" href="/" activeStyle={activeLink}  > <span className="sr-only">(current)</span></a></li>
                    <li className="nav-item active centuryFont"><a className="nav-link" href="/about" activeStyle={activeLink}>Barn<span className="small font-weight-light">-10Y </span> </a></li>
                    <li className="nav-item active centuryFont"><a className="nav-link" href="/seven" activeStyle={activeLink}>Barn<span className="small font-weight-light">-7Y</span> </a></li>
                    <li className="nav-item active centuryFont"><a className="nav-link" href="/five" activeStyle={activeLink}>Barn<span className="small font-weight-light">-5Y </span> </a></li>
                    <li className="nav-item active centuryFont"><a className="nav-link" href="/three" activeStyle={activeLink}>Barn<span className="small font-weight-light">-3Y </span> </a></li>
                </ul>
            </div>
        </nav>  
    );
}



export default Header ;