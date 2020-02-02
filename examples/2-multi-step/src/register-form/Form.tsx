import React, { useState, useCallback } from 'react';
import { FielderProvider, useForm } from 'fielder';
import { CredentialsSection, TermsSection } from './sections';
import { Step } from 'semantic-ui-react';
import { Card, CardSection } from '../components/Card';

export const RegisterForm = () => {
  const state = useForm();
  console.log(state);
  const [activeStep, setActiveStep] = useState(0);

  const handleCredentials = useCallback(() => {
    setActiveStep(1);
  }, []);

  return (
    <FielderProvider value={state}>
      <Card>
        {/* <CardSection disabled={activeStep !== 0}>
          <h2>Authentication info</h2>
          {activeStep === 0 && (
            <CredentialsSection onComplete={handleCredentials} />
          )}
        </CardSection> */}
        <CardSection disabled={false}>
          <h2>Terms</h2>
          {activeStep === 1 || (true && <TermsSection />)}
        </CardSection>
      </Card>
    </FielderProvider>
  );
};
