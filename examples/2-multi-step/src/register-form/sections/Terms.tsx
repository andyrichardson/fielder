import React, { FC, useCallback } from "react";
import { useField, useFormContext } from "fielder";

export const TermsSection: FC = () => {
  const { isValid } = useFormContext();
  const [marketingProps] = useField({
    name: "marketing",
    initialValid: true
  });
  const [termsProps] = useField({
    name: "terms",
    validate: termsValidation
  });

  const handleSubmit = useCallback(() => alert("Form submitted"), []);

  return (
    <form autocomplete="off">
      <div className="field">
        <label>Marketing</label>
        <input type="checkbox" {...marketingProps} value="marketing" />
        Send me marketing mail
      </div>
      <div className="field">
        <label>Terms & Conditions</label>
        <input type="checkbox" {...termsProps} value="terms" />I accept terms
        and conditions
      </div>
      <div className="field">
        <button onClick={handleSubmit} disabled={!isValid} className="primary">
          Submit
        </button>
      </div>
    </form>
  );
};

const termsValidation = v => {
  if (!v || v.length === 0) {
    throw Error("Opting in is required");
  }
};
