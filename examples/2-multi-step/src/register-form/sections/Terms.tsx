import React, { FC, useCallback, useMemo } from 'react';
import { useField, useFormContext } from 'fielder';

export const TermsSection: FC = () => {
  const { isValid } = useFormContext();
  const [{ ref, ...termsProps }] = useField({
    name: 'terms',
    validate: termsValidation,
    initialValue: ['marketing'],
  });

  const checkboxes = useMemo(
    () => [
      { label: 'Send me marketing mail', value: 'marketing' },
      { label: 'I accept terms and conditions', value: 'legal' }
    ],
    []
  );

  const handleSubmit = useCallback(() => alert('Form submitted'), []);

  return (
    <form autoComplete="off">
      {checkboxes.map(({ label, value }) => (
        <div key={value} className="field">
          <input type="checkbox" {...termsProps} value={value} checked={termsProps.value.includes(value)} />
          <span>{label}</span>
        </div>
      )}
      <div className="field">
        <button onClick={handleSubmit} disabled={!isValid} className="primary">
          Submit
        </button>
      </div>
    </form>
  );
};

const termsValidation = v => {
  if (!v.includes('legal')) {
    throw Error('Legal terms must be accepted');
  }
};
