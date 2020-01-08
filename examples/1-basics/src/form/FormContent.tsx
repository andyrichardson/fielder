import React, { FC, useCallback } from "react";
import { useField, useFormContext } from "fielder";
import { conditionalError } from "../util";

export const FormContent: FC = () => {
  const { isValid } = useFormContext();
  const [usernameProps, usernameMeta] = useField({
    name: "username",
    validate: usernameValidation
  });
  const [passwordProps, passwordMeta] = useField({
    name: "password",
    validate: passwordValidation
  });

  const handleSubmit = useCallback(() => {
    alert("Submitted!");
  }, []);

  return (
    <form autocomplete="off">
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
        <button onClick={handleSubmit} disabled={!isValid} className="primary">
          Next
        </button>
      </div>
    </form>
  );
};

const usernameValidation = value => {
  if (!value) {
    throw Error("Username is required.");
  }

  if (value.length < 4) {
    throw Error("Username must be at least 4 characters.");
  }
};

const passwordValidation = value => {
  if (!value) {
    throw Error("Password is required.");
  }

  if (value.length < 4) {
    throw Error("Password must be at least 4 characters.");
  }
};
