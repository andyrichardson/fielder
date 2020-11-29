import styled, { createGlobalStyle } from 'styled-components';
import { modularScale } from 'polished';
import React, { FC } from 'react';

export const scale = (steps: number) => modularScale(steps, '16px', 1.3);

const withLink: (H: FC<{ id: string }>) => FC<{ id }> = (H) => ({
  id,
  children,
  ...props
}) => (
  <H {...props} id={id}>
    <HeadingLink {...props} href={`#${id}`}>
      {children}
    </HeadingLink>
  </H>
);

const HeadingLink = styled.a`
  position: relative;
  color: initial;
  text-decoration: initial;

  &:hover:before {
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc(100% + ${scale(-1)});
    font-size: 0.5em;
    display: flex;
    align-items: center;
    filter: brightness(0);
    content: '🔗';
  }
`;

export const p = styled.p`
  font-size: ${scale(0)};
  margin: ${scale(1)} 0;
  line-height: 2em;
  color: #222;
`;

export const a = styled.a`
  color: #8b61ff;
`;

export const h1 = withLink(styled.h1`
  font-size: ${scale(3)};
  margin-top: ${scale(3)};
  margin-bottom: ${scale(2)};
`);

export const h2 = withLink(styled.h2`
  font-size: ${scale(2)};
  margin-top: ${scale(2)};
  margin-bottom: ${scale(1)};
`);

export const h3 = withLink(styled.h3`
  font-size: ${scale(1)};
  margin: ${scale(0)} 0;
`);

export const inlineCode = styled.code`
  color: #e36975;
`;

export const code = styled.code`
  display: block;
  overflow: auto;
  padding: ${scale(-1)};
`;

export const li = styled.li`
  line-height: 2em;

  & + & {
    margin-top: ${scale(0)};
  }
`;

export const blockquote = styled.blockquote`
  border-left: solid 3px;
  margin-left: ${scale(0)};
  padding-left: ${scale(0)};
`;
