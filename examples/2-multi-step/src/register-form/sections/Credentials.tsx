import React, { FC } from 'react';
import { useField, useFormContext } from 'fielder';
import { conditionalError } from '../../util';

export const CredentialsSection: FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const { isValid } = useFormContext();
  const [usernameProps, usernameMeta] = useField({
    name: 'username',
    validate: usernameValidation,
    initialValue: '',
  });
  const [passwordProps, passwordMeta] = useField({
    name: 'password',
    validate: passwordValidation,
    initialValue: '',
  });
  const [passwordConfProps, passwordConfMeta] = useField({
    name: 'passwordConfirmation',
    validate: passwordConfValidation,
    initialValue: '',
    destroyOnUnmount: true,
  });

  return (
    <form autoComplete="off">
      <div className="field">
        <label>Username</label>
        <input type="text" placeholder="Username" {...usernameProps} />
        {conditionalError(usernameMeta)}
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="Password" {...passwordProps} />
        {conditionalError(passwordMeta)}
      </div>
      <div className="field">
        <label>Confirm password</label>
        <input type="password" placeholder="Password" {...passwordConfProps} />
        {conditionalError(passwordConfMeta)}
      </div>
      <div className="field">
        <button onClick={onComplete} disabled={!isValid} className="primary">
          Next
        </button>
      </div>
    </form>
  );
};

const usernameValidation = ({ value }) => {
  if (!value) {
    throw Error('Username is required.');
  }

  if (value.length < 4) {
    throw Error('Username must be at least 4 characters.');
  }
};

const passwordValidation = ({ value }) => {
  if (!value) {
    throw Error('Password is required.');
  }

  if (value.length < 4) {
    throw Error('Password must be at least 4 characters.');
  }
};

const passwordConfValidation = ({ value, form }) => {
  if (!value) {
    throw Error('Password confirmation is required.');
  }

  if (value !== form.password.value) {
    throw Error('Password does not match.');
  }
};
