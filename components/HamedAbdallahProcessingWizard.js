import { Stepper, Step, StepLabel } from '@material-ui/core';
import React from 'react';
import Styles from '../styles/components/checkoutWizard.module.css';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const muiTheme = createTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        color: '#e5e6e7', // or 'rgba(0, 0, 0, 1)'
        '&$active': {
          color: '#e5e6e7',
        },
        '&$completed': {
          color: '#ca222a',
        },
      },
    },
  },
});

export default function HamedAbdallahProcessingWizard({ orderStatus }) {
  const getActiveStep = () => {
    switch (orderStatus) {
      case 'pending':
        return 1;
      case 'processing':
        return 2;
      case 'shipping':
        return 3;
      case 'delivered':
        return 4;
    }
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Stepper
        className={Styles.root}
        activeStep={getActiveStep()}
        alternativeLabel
      >
        {['Pending', 'Processing', 'Shipping', 'Delivered'].map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </MuiThemeProvider>
  );
}
