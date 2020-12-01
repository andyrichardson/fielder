/* eslint-disable react/display-name */
import React from 'react';

const withLink = (Element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5') => (
  props: any
) => (
  <Element className={'heading'} {...props}>
    <a id={`link-${props.id}`} href={`#${props.id}`} {...props}>
      {props.children}
    </a>
  </Element>
);

export const h1 = withLink('h1');
export const h2 = withLink('h2');
export const h3 = withLink('h3');
export const h4 = withLink('h4');
export const h5 = withLink('h5');
