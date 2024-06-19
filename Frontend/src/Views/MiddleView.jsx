import React from "react";
import ReactDOM from "react-dom";
import Done from '../components/MiddleView/Done';
import "../styles/Views/BusinessView.css"

const App = () => {
    return (
        <div className="app-container">
            <Done />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
