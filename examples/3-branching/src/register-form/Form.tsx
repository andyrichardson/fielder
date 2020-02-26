import React, { useState, useMemo } from 'react';
import { useForm, FielderProvider } from 'fielder';
import { SignUp } from './sections/SignUp';
import { GettingStarted } from './sections/GettingStarted';
import { Login } from './sections/Login';

export const Form = () => {
  const [continued, setContinued] = useState(false);
  const formState = useForm();

  const formPage = useMemo(() => {
    if (!continued) {
      return 'init';
    }

    if (formState.fields.email.value === 'user@mail.com') {
      return 'login';
    }

    return 'signup';
  }, [formState, continued]);

  const content = useMemo(() => {
    if (formPage === 'init') {
      return <GettingStarted onNext={() => setContinued(true)} />;
    }

    if (formPage === 'login') {
      return <Login />;
    }

    return <SignUp />;
  }, [formPage]);

  return <FielderProvider value={formState}>{content}</FielderProvider>;
};
