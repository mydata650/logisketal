<aside>
    <div className="row">
        <div className="col-3 "></div>
        <div className="col-6 text-center border">
            <div className="row ">
                <div className="col-6 text-left"><span className="display-4 text-dark ">
                    {Number(props.result.result) === 1 ? <FaCheck /> : Number(props.result.result) === 2 ? <FaFrown /> : ""}</span>
                </div>
                <div className="col-6"><span className="display-4 text-danger"> {props.target}</span> </div>
            </div>

            <div className="row border-bottom mt-2">
                <div className="col-4 btn btn-dark btn-block" onClick={() => window.quentoMainClass.updateEnteredValue(7)}><span className="h3">7</span></div>
                <div className="col-4 padd2 mt-1"><kbd className="bg-success h2 px-3" onClick={() => window.quentoMainClass.updateEnteredValue(5)}> + </kbd> </div>
                <div className="col-4 btn btn-dark btn-block" onClick={() => window.quentoMainClass.updateEnteredValue(6)}><span className="h3">6</span> </div>
            </div>

            <div className="row border-bottom">
                <div className="col-4 h2 text-info padd2 mt-2"><kbd className="bg-success h2 px-3" onClick={() => window.quentoMainClass.updateEnteredValue(3)}> - </kbd> </div>
                <div className="col-4 btn btn-dark btn-block" onClick={() => window.quentoMainClass.updateEnteredValue(1)}><span className="h3">1</span></div>
                <div className="col-4 h2 text-info padd2 mt-2"><kbd className="bg-success h2 px-3" onClick={() => window.quentoMainClass.updateEnteredValue(5)}> + </kbd> </div>
            </div>

            <div className="row ">
                <div className="col-4 btn btn-dark btn-block" onClick={() => window.quentoMainClass.updateEnteredValue(2)}><span className="h3">2</span></div>
                <div className="col-4 h2 text-info padd2 mt-2"><kbd className="bg-success h2 px-3" onClick={() => window.quentoMainClass.updateEnteredValue(3)}> - </kbd> </div>
                <div className="col-4 btn btn-dark btn-block" onClick={() => window.quentoMainClass.updateEnteredValue(9)}><span className="h3">9</span> </div>
            </div>
            <div className="row mt-2">
                <div className="col-6  text-danger btn btn-info " onClick={() => { window.quentoMainClass.resetGame() }}>Reset </div>
                <div className="col-6  "  >
                    <button className="text-danger btn btn-warning btn-block" onClick={() => { window.quentoMainClass.isTotalEqualsTarget() }} disabled={Number(props.status) === 2 ? true : false}> Done</button>
                </div>
            </div>
        </div>
        <div className="col-sm-3 "></div>
    </div>
</aside>