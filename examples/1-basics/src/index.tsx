import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from './form';

const App = () => (
  <div className="ui container">
    <Form />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
