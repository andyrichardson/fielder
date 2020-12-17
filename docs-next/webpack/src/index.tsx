import { css } from '@linaria/core';
import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

render(<App />, document.querySelector('#root'));

export function register() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker
    .register(`/service-worker.js`, { scope: '/' })
    .then((reg) => {
      // Check for new service worker on
      // worker already installed and page refresh
      if (!reg.installing) {
        reg.update(); // Update service worker on refresh
      }

      // Check for a new service worker every minute
      window.setInterval(reg.update, 1000 * 60);
    });
}
register();

export const globals = css`
  :global() {
    @import 'typeface-inter';
    @import 'typeface-source-code-pro';
    @import 'prism-themes/themes/prism-material-light.css';

    html,
    body {
      margin: 0;
      font-family: 'Inter', system, sans-serif;
    }

    #root {
      display: flex;
      margin: 0 auto;
      width: max-content;
      max-width: 1000px;
    }

    pre > code,
    code {
      font-family: 'Source Code Pro', monospace;
    }
  }
`;
