import React, { FC } from 'react';

export const FormSection: FC<{ disabled: boolean }> = ({
  disabled,
  children
}) => <div>{children}</div>;
