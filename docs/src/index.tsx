import 'preact/debug';
import { css } from '@linaria/core';
import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { scale } from './scale';

const rootElement = document.getElementById('root');
render(<App />, rootElement);

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
      font-size: ${scale(0)};
    }

    #root {
      display: flex;
      margin: 0 auto;
      width: 100%;
      max-width: 100%;

      @media (min-width: 1000px) {
        width: 1000px;
        max-width: 1000px;
      }
    }

    pre > code,
    code {
      font-family: 'Source Code Pro', monospace;
    }

    h1,
    h2,
    h3,
    h4 {
      font-weight: 600;
    }
  }
`;
