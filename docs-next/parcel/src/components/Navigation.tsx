import React from 'react';
import { routes } from '../routes';
import Icon from '../assets/icon.svg';
import { Link } from 'wouter';

export const Navigation = () => (
  <nav className="sidenav">
    <img className="logo" src={Icon} />
    {routes.map((r) => (
      <>
        <Link
          className="parent-link"
          key={r.url}
          href={r.url}
          target={'external' in r && r.external ? '_blank' : ''}
        >
          {r.title}
        </Link>
        {'children' in r &&
          r.children &&
          r.children.map((c) => (
            <Link className="child-link" key={c.url} href={c.url}>
              {c.title}
            </Link>
          ))}
      </>
    ))}
  </nav>
);
