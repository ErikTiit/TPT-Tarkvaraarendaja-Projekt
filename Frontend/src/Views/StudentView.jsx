import React, { useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import InternshipStatus from "../components/StudentView/InternshipStat"
import  InternshipData  from "../Data/StudentView/InternshipData"
import SwitchButton from '../devbutton';
import "../styles/Views/StudentView.css"

const StudentView = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="app-container">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="student-content-container">
                <div className="student-content-left">
                    <InternshipData />
                </div>
                <div className="student-content-right">
                    <InternshipStatus />
                </div>
            </div>
            <div className="switch-button-container">
                <SwitchButton/>
            </div>
        </div>
    );
};

export default StudentView;
