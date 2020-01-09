import React from 'react';
import ReactDOM from 'react-dom';
import { RegisterForm } from './register-form';

const App = () => (
  <div className="ui container">
    <RegisterForm />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
