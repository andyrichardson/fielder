import React from "react"
import { Editor } from "./Editor"
import * as fielderImports from "fielder"

const code = `
const Form = () => {
  const form = useForm();

  return (
    <FielderProvider value={form}>
      <FormContent />
    </FielderProvider>
  );
}

const FormContent = () => {
  const [usernameProps, usernameMeta] = useField({
    name: 'username',
    validate: usernameValidation,
  });
  const [passwordProps, passwordMeta] = useField({
    name: 'password',
    validate: passwordValidation,
  });
  
  const { handleSubmit } = useSubmit(() => alert('Submitted!'));

  return (
    <form autoComplete="off">
      <div className="field">
        <label>Username</label>
        <input type="text" {...usernameProps} />
        {conditionalError(usernameMeta)}
      </div>

      <div className="field">
        <label>Password</label>
        <input type="password" {...passwordProps} />
        {conditionalError(passwordMeta)}
      </div>
       
      <button type="button" onClick={handleSubmit} className="primary">
        Submit
      </button>
    </form>
  );
}

const usernameValidation = ({ value }) => {
  if (!value) {
    throw Error('Username is required.');
  }

  if (value.length < 4) {
    throw Error('Username must be at least 4 characters.');
  }
}

const passwordValidation = ({ value }) => {
  if (!value) {
    throw Error('Password is required.');
  }

  if (value.length < 4) {
    throw Error('Password must be at least 4 characters.');
  }
};

const conditionalError = (meta) => meta.hasBlurred && meta.error && <p>{meta.error}</p>;

render(<Form />)
`

const scope = {
  ...fielderImports,
}

export const Example1 = () => <Editor code={code} scope={scope} />
