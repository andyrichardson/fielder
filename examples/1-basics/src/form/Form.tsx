import React from 'react';
import { FielderProvider, useForm } from 'fielder';
import { Card, CardSection } from '../components/Card';
import { FormContent } from './FormContent';

export const Form = () => {
  const state = useForm();

  return (
    <FielderProvider value={state}>
      <Card>
        <CardSection>
          <FormContent />
        </CardSection>
      </Card>
    </FielderProvider>
  );
};
