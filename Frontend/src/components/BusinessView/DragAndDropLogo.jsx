import React, { useState } from "react";
import { FileInput, Card, Container } from '@mantine/core';
import "../../styles/BusinessView/DragAndDropLogoStyle.css";

const DragAndDropLogo = () => {
    return (
        <Container> 
            {/* none of this is finished */}
            <Card className="LogoCardStyle">
                <FileInput label="Upload logo" accept="image/*" required /> 
            </Card>
            <Card className="LogoCardStyle">
                <FileInput label="Upload banner" accept="image/*" />
            </Card>
        </Container>
    );
};

export default DragAndDropLogo;
