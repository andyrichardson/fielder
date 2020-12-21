import React, { FC, useCallback } from 'react';
import { useField, useFormContext, useSubmit } from 'fielder';
import { conditionalError } from '../util';

export const FormContent: FC = () => {
  const { isValid } = useFormContext();
  const [usernameProps, usernameMeta] = useField({
    name: 'username',
    initialValue: '',
    validate: usernameValidation,
  });
  const [passwordProps, passwordMeta] = useField({
    name: 'password',
    initialValue: '',
    validate: passwordValidation,
  });

  const { handleSubmit, isFetching } = useSubmit(
    useCallback(() => {
      alert('Submitted!');
    }, [])
  );

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
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="primary"
        >
          {isFetching ? '...' : 'Next'}
        </button>
      </div>
    </form>
  );
};

const usernameValidation = ({ value, trigger }) => {
  if (!value) {
    throw Error('Username is required.');
  }

  if (value.length < 4) {
    throw Error('Username must be at least 4 characters.');
  }

  if (trigger === 'submit') {
    return isUsernameTaken(value).then((isTaken) => {
      console.log({ isTaken });
      if (isTaken) {
        throw Error('Username is already taken');
      }
    });
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

const isUsernameTaken = (username: string) =>
  new Promise<boolean>((resolve, reject) => {
    const taken = username === 'taken';

    setTimeout(() => resolve(taken), 1000);
  });
