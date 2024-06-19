import React from "react";
import "../../styles/MiddleView/Done.css"

const Done = () => {
    return (
        <div>
            <p className="Done-Text">Job Offer edukalt postitatud</p>
            <a href="index.html" className="Done-StudentView">Student View</a>
            <a href="index2.html" className="Done-BuisnessView">Buisness View</a>
        </div>
    );
};

export default Done;