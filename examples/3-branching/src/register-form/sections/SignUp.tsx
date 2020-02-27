import React, { FC, useCallback, MouseEventHandler } from 'react';
import { useField, useFormContext } from 'fielder';
import { validateEmail, validateName, validatePassword } from '../validation';
import { span, Card } from '../../components';

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

  const handleSubmit = useCallback<MouseEventHandler>(
    e => {
      e.preventDefault();
      const variables = {
        name: fields.name.value,
        email: fields.email.value,
        password: fields.password.value
      };

      // Simulate submission
      console.log('POST /register', { variables });
      alert("API call 'POST /register' made. See console for more info");
    },
    [fields]
  );

  return (
    <div className="ui card">
      <h1>Sign up</h1>
      <form autoComplete="off">
        <div className="field">
          <label>Name</label>
          <input type="text" {...nameProps} />
          <span style={{ color: 'red' }}>
            {nameMeta.touched && nameMeta.error}
          </span>
        </div>
        <div className="field">
          <label>Email</label>
          <input type="text" {...emailProps} />
          <span style={{ color: 'red' }}>
            {emailMeta.touched && emailMeta.error}
          </span>
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" {...passwordProps} />
          <span style={{ color: 'red' }}>
            {passwordMeta.touched && passwordMeta.error}
          </span>
        </div>
        <button className="primary" disabled={!isValid} onClick={handleSubmit}>
          Sign up
        </button>
      </form>
    </div>
  );
};
