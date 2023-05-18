import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function CustomStepper(props) {
    const { index, ...otherProps } = props;
    return (
        <Box {...otherProps}>
            <Stepper activeStep={index} alternativeLabel>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
            </Stepper>
        </Box>
    );
}