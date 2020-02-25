import React, { FC, useCallback } from 'react';
import { useField, useFormContext } from 'fielder';
import { validateEmail, validateName, validatePassword } from './validation';
import {
  FormGroup,
  Label,
  Input,
  FieldHint,
  Card,
  Button
} from '../components';

export const SignUp: FC = () => {
  const { isValid, fields } = useFormContext();
  const [nameProps, nameMeta] = useField({
    name: 'name',
    validate: validateName,
    initialValue: ''
  });
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
      name: fields.name.value,
      email: fields.email.value,
      password: fields.password.value
    };

    // Simulate submission
    console.log('POST /register', { variables });
    alert("API call 'POST /register' made. See console for more info");
  }, [fields]);

  return (
    <Card>
      <h1>Sign up</h1>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" {...nameProps} />
        <FieldHint>{nameMeta.touched && nameMeta.error}</FieldHint>
      </FormGroup>
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
