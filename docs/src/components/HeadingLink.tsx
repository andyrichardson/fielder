/* eslint-disable react/display-name */
import React from 'react';
import { styled } from '@linaria/react';

const withLink = (Element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5') => (
  props: any
) => (
  <Element className={'heading'} {...props}>
    <AnchorLink id={`link-${props.id}`} href={`#${props.id}`} {...props}>
      {props.children}
    </AnchorLink>
  </Element>
);

export const h1 = withLink('h1');
export const h2 = withLink('h2');
export const h3 = withLink('h3');
export const h4 = withLink('h4');
export const h5 = withLink('h5');

const AnchorLink = styled.a`
  color: initial;
  text-decoration: initial;
`;
