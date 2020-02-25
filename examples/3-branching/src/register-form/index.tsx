import React, { useState, useMemo } from "react";
import { useForm, FielderProvider } from "fielder";
import { SignUp } from "./SignUp";
import { GettingStarted } from "./GettingStarted";
import { Login } from "./Login";

export const Form = () => {
  const [continued, setContinued] = useState(false);
  const formState = useForm();

  const formPage = useMemo(() => {
    if (!continued) {
      return "init";
    }

    if (formState.fields.email.value === "user@mail.com") {
      return "login";
    }

    return "signup";
  }, [formState, continued]);

  return (
    <FielderProvider value={formState}>
      {formPage === "init" && (
        <GettingStarted onNext={() => setContinued(true)} />
      )}
      {formPage === "login" && <Login />}
      {formPage === "signup" && <SignUp />}
    </FielderProvider>
  );
};
