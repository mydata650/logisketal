import React from "react";

const ThreeYearAbout = () => {
    return (
        <div className="container pt-4 border">
            <GameNumbers />
            <div className="card-columns pt-4">
                <Colors3 />
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
                <div className="col-xs-4  pl-1 text-info"><span className="h2 tempFontPrincess"> spil</span> <span className=" tempFontOpenSans small">(under 3 år)</span></div>
                <div className="col-xs-6"></div>
            </div>
            <div className="row border-bottom px-2">
                <div className="col-xs-12 small">en liste over spil til 3-årige studerende.. </div>
            </div>
        </aside>
    )
}

const Colors3 = () => {
    return (
        <div className="card shadow">
            <div className="card-img-top display-1 text-bold text-center text-danger" >&#9731;</div>
            <div className="card-body">
                <h4 className="card-title"><span className="badge badge-secondary border">101 </span> Farver 3Y </h4>
                <p className="card-text"><span className="small">Spil rolle &#10095; Grundlæggende farveidentifikation for et barn under 3 år</span><br />
                    Før du spiller spillet, skal du kigge på listen over alle tilgængelige farver, <a href="/colors3learn" className=""> klik her </a>

                </p>
                <a href="/colors3"  className="btn btn-success btn-block"> Spille </a>
            </div>
        </div>
    )
}

export default ThreeYearAbout;


