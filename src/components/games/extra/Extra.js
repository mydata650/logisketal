import React, { useState } from 'react';

const Extra = () => {
    const [inputValue, setInputValue] = useState("");
    function showMsg() {
        { inputValue = "again working.." }
        alert("Hello, I'm working");
    }

    return <div className="container mt-4">
        <FirstRow />
        <div className="row">
            <div className="col-md-6 border">
                <input onChange={(e) => { setInputValue(e.target.value);  }}
                placeholder="Enter some text"/> <br />
                {inputValue} <br />
                <button onClick={(e) => { inputValue = "Again hello." }}>testing only </button>
            </div>
            <div className="col-md-6 border"></div>
        </div>
    </div>
}


const FirstRow = (props) => {
    return (
        <div className="row headPad">
            <span>Extra row </span>
        </div>
    );
}

export default Extra;

