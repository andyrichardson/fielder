import React, { ComponentProps, FC } from 'react';
import { routes } from '../routes';
import Icon from '../assets/icon.svg';
import { Link, useLocation } from 'wouter';

export const Navigation: FC<ComponentProps<'nav'>> = (props) => {
  const [location] = useLocation();

  return (
    <nav {...props} className="sidenav">
      <img className="logo" src={Icon} alt={'Logo'} />
      {routes.map((r) => (
        <>
          <Link
            className="parent-link"
            key={r.url}
            to={r.url}
            target={'external' in r && r.external ? '_blank' : ''}
          >
            {r.title}
          </Link>
          {'children' in r &&
            r.children &&
            r.children.map((c) => (
              <Link
                className="child-link"
                data-active={location === c.url}
                key={c.url}
                href={c.url}
              >
                {c.title}
              </Link>
            ))}
        </>
      ))}
    </nav>
  );
};
