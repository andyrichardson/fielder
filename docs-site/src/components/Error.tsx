import React from "react";

export const ErrorMessage = ({ error }) =>
  error ? <div className="ant-form-explain">{error}</div> : null;
