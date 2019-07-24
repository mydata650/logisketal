import React from "react";

const Header = () => {
    const activeLink = { color: "/F15B2A" }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bgc1">
            <a className="navbar-brand" href="/">logisketal</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/" activeStyle={activeLink}  >Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/about" activeStyle={activeLink} >Games </a>
                    </li>
                 </ul>
            </div>
</nav>  
    );
}

export default Header;