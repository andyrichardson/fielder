import React from "react";

export const Card = props => (
  <section className="card" style={{ margin: 20, padding: 20 }} {...props} />
);

export const Button = props => (
  <button className="btn btn-primary" {...props} />
);

export const FormGroup = props => <div className={"form-group"} {...props} />;

export const Label = props => <label className={"form-label"} {...props} />;

export const Input = props => <input className={"form-input"} {...props} />;

export const Select = props => <select className="form-select" {...props} />;

export const FieldHint = props => (
  <p
    className="form-input-hint is-error"
    style={{ color: "#d00" }}
    {...props}
  />
);
