import React from 'react';
import "../../styles/NavBar/LanguageSelector.css"

const LanguageSelector = () => {
    return (
        <div className="language-selector">
            <a href="#">
                <img src="img/placeholder.png" alt="English" />
            </a>
            <a href="#">
                <img src="img/placeholder.png" alt="Estonian" />
            </a>
        </div>
    );
};

export default LanguageSelector;
