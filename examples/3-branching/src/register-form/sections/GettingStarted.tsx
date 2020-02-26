import React, { FC } from 'react';
import { useField, useFormContext } from 'fielder';
import { validateEmail } from '../validation';

export const GettingStarted: FC<{ onNext: () => void }> = ({ onNext }) => {
  const { isValid } = useFormContext();
  const [emailProps, emailMeta] = useField({
    name: 'email',
    validate: validateEmail,
    initialValue: ''
  });

  return (
    <div className="ui card">
      <h1>Get started</h1>
      <form autoComplete="off">
        <div className="field">
          <label>Email</label>
          <input type="text" placeholder={placeholder} {...emailProps} />
          <span style={{ color: 'red' }}>
            {emailMeta.touched && emailMeta.error}
          </span>
        </div>
        <button className={'primary'} disabled={!isValid} onClick={onNext}>
          Next
        </button>
      </form>
    </div>
  );
};

const placeholder = "Try 'user@mail.com'";
