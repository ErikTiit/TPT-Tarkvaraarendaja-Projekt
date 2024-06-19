import React from 'react';
import "../../styles/StudentView/InternshipStat.css"

const InternshipStatus = () => {
    const internshipsstatus = [
        { id: 1, status: "Unseen" },
        { id: 2, status: "Seen" },
        { id: 3, status: "Seen" },
        { id: 4, status: "Rejected" },
        { id: 5, status: "Accepted" },
        { id: 6, status: "Accepted" },
        { id: 7, status: "Accepted" },
        { id: 8, status: "Rejected" },
    ];

    return (
        <div className="internship-status">
            <h2>Internship Status</h2>
            {internshipsstatus.map((internship, index) => (
                <div key={index} className="internship-status-item">
                    <p>Internship #{internship.id}</p>
                    <p className={`bold status-${internship.status.toLowerCase()}`}>{internship.status}</p>
                </div>
            ))}
        </div>
    );
};

export default InternshipStatus;
