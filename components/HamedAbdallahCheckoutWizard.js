import { Stepper, Step, StepLabel } from '@material-ui/core';
import React from 'react';
import Styles from '../styles/components/checkoutWizard.module.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
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

export default function HamedAbdallahCheckoutWizard({ activeStep = 0 }) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Stepper className={Styles.root} activeStep={activeStep} alternativeLabel>
        {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
          (step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          )
        )}
      </Stepper>
    </MuiThemeProvider>
  );
}
