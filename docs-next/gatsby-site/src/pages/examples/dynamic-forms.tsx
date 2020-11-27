import React, { useState, useMemo, useCallback } from "react"
import { Editor } from "./Editor"
import * as fielderImports from "fielder"

const code = `\
import { useForm, useField, useSubmit, FielderProvider } from "fielder";

// ============================
// Form
// ============================
//
// Root level component creates form state and exposes via context.
// Also handles routing of form content.

const Form = () => {
  const [step, setStep] = useState(0);
  const form = useForm();

  const content = useMemo(() => {
    if (step === 0) {
      return <RegionSelect onComplete={() => setStep(1)} />
    }

    console.log(form.fields);

    if (form.fields.region.value === "UK") {
      return <UKSubForm />
    }

    return <USSubForm />
  }, [form.fields, step]);

  return (
    <FielderProvider value={form}>
      {content}
    </FielderProvider>
  );
}

// ============================
// Form step 1
// ============================
//
// Form content which is dynamically rendered.

const RegionSelect = ({ onComplete }) => {
  const [regionProps, regionMeta] = useField({
    name: 'region',
    initialValue: 'UK',
  });

  return (
    <form autoComplete="off">
      <div className="field">
        <label>Region</label>
        <select {...regionProps}>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
        </select>
        {conditionalError(regionMeta)}
      </div>
      
      <button type="button" onClick={onComplete} className="primary">
        Next
      </button>
    </form>
  );
}

// ==============================
// Form step 2 (conditional - US)
// ==============================
//
// Form content + validation which is conditionally rendered
// depending on a previous step.

const USSubForm = () => {
  const [ageProps, ageMeta] = useField({
    name: 'age',
    initialValue: '18',
    validate: useCallback(({ value }) => {
      if (value < 18) {
        throw Error("Age must be over 18");
      }
    }, []),
  });

  const { handleSubmit } = useSubmit(
    (values) => alert(\`Submitted: \${JSON.stringify(values, null, 2)}\`)
  );

  return (
    <form autoComplete="off">
      <div className="field">
        <label>Age</label>
        <input type="number" {...ageProps} />
        {conditionalError(ageMeta)}
      </div>
      
      <button type="button" onClick={handleSubmit} className="primary">
        Next
      </button>
    </form>
  );
}

// ==============================
// Form step 2 (conditional - UK)
// ==============================
//
// Form content + validation which is conditionally rendered
// depending on a previous step.

const UKSubForm = () => {
  const [nameProps, nameMeta] = useField({
    name: 'name',
    initialValue: 'UK Citizen',
  });
  const [termsProps, termsMeta] = useField({
    name: 'ukTerms',
    initialValue: [],
    validate: useCallback(({ value }) => {
      if (!value.includes("legal")) {
        throw Error("Legal terms must be accepted");
      }
    }, []),
  });

  const checkboxes = useMemo(
    () => [
      { label: 'Send me marketing mail', value: 'marketing' },
      { label: 'I accept terms and conditions', value: 'legal' },
    ],
    []
  );

  const { handleSubmit } = useSubmit(
    (values) => alert(\`Submitted: \${JSON.stringify(values, null, 2)}\`)
  );

  return (
    <form autoComplete="off">
      <div className="field">
        <label>Name</label>
        <input type="text" {...nameProps} />
      </div>

      <div className="field column">
        <label>Terms</label>
        {checkboxes.map(({ label, value }) => (
          <div key={value} className="field">
            <input
              type="checkbox"
              {...termsProps}
              value={value}
              checked={termsProps.value.includes(value)}
            />
            <span>{label}</span>
          </div>
        ))}
        {conditionalError(termsMeta)}
      </div>
      
      <button type="button" className="primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

const conditionalError = (meta) => meta.error && <p>{meta.error}</p>;

// Render this live example
render(<Form />)
`

const scope = {
  ...fielderImports,
  useState,
  useMemo,
  useCallback,
}

export const Example = () => <Editor code={code} scope={scope} />
