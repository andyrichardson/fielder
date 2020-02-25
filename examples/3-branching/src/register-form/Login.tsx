import React, { useCallback } from 'react';
import { useField, useFormContext } from 'fielder';
import { validateEmail, validatePassword } from './validation';
import {
  Card,
  FormGroup,
  Label,
  Input,
  FieldHint,
  Button
} from '../components';

export const Login = () => {
  const { isValid, fields } = useFormContext();
  const [emailProps, emailMeta] = useField({
    name: 'email',
    validate: validateEmail,
    initialValue: ''
  });
  const [passwordProps, passwordMeta] = useField({
    name: 'password',
    validate: validatePassword,
    initialValue: ''
  });

  const handleSubmit = useCallback(() => {
    const variables = {
      email: fields.email.value,
      password: fields.password.value
    };

    // Simulate submission
    console.log('POST /register', { variables });
    alert("API call 'POST /register' made. See console for more info");
  }, [fields]);

  return (
    <Card>
      <h1>Log in</h1>
      <FormGroup>
        <Label>Email</Label>
        <Input type="text" {...emailProps} />
        <FieldHint>{emailMeta.touched && emailMeta.error}</FieldHint>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" {...passwordProps} />
        <FieldHint>{passwordMeta.touched && passwordMeta.error}</FieldHint>
      </FormGroup>
      <Button disabled={!isValid} onClick={handleSubmit}>
        Sign up
      </Button>
    </Card>
  );
};
