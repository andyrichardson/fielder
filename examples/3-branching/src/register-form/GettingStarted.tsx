import React, { FC } from 'react';
import { useField } from 'fielder';
import {
  Label,
  Input,
  FieldHint,
  FormGroup,
  Button,
  Card
} from '../components';
import { validateEmail } from './validation';

export const GettingStarted: FC<{ onNext: () => void }> = ({ onNext }) => {
  const [emailProps, emailMeta] = useField({
    name: 'email',
    validate: validateEmail,
    initialValue: ''
  });

  return (
    <Card>
      <h1>Get started</h1>
      <FormGroup>
        <Label>Email</Label>
        <Input type="text" placeholder="Enter email" {...emailProps} />
        <FieldHint>{emailMeta.touched && emailMeta.error}</FieldHint>
      </FormGroup>
      <Button disabled={!emailMeta.isValid} onClick={onNext}>
        Next
      </Button>
    </Card>
  );
};
