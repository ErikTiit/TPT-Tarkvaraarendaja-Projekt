import React from "react";
import CompanyInfoInput from "../components/BusinessView/CompanyInfoInput";
import DragAndDropLogo from "../components/BusinessView/DragAndDropLogo";
import CompanyApplicationInfo from "../components/BusinessView/CompanyApplicationInfo";
import JobOfferContent from "../components/BusinessView/JobOfferContent";
import JobIsValid from "../components/BusinessView/JobIsValid";
import SwitchButton from "../devbutton";
import "../styles/Views/BusinessView.css"

const BusinessView = () => {
    return (
        <div className="business-container">
            <div className="content-container">
                <div className="content-inner">
                    <div className="content-left">
                        <CompanyInfoInput/>
                        <div className="content-flex-column">
                            <CompanyApplicationInfo/>
                            <JobOfferContent/>
                            <JobIsValid/>
                            <div className="switch-button-container">
                                <SwitchButton/>
                            </div>
                        </div>
                    </div>
                    <div className="content-right">
                        <DragAndDropLogo/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessView;
