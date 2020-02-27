import React, { useCallback } from 'react';
import { useField, useFormContext } from 'fielder';
import { validateEmail, validatePassword } from '../validation';

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
    <div className="ui card">
      <h1>Log in</h1>
      <form>
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
