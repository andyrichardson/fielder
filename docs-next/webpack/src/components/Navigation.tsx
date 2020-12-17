import { styled } from '@linaria/react';
import React, { ComponentProps, FC } from 'react';
import { routes } from '../routes';
import Icon from '../assets/icon.svg';
import { Link, useLocation } from 'wouter';
import { scale } from '../scale';

export const Navigation: FC<ComponentProps<'nav'>> = (props) => {
  const [location] = useLocation();

  return (
    <Nav {...props}>
      <Logo src={Icon} alt={'Logo'} />
      {routes.map((r) => (
        <>
          <Link
            key={r.url}
            to={r.url}
            target={'external' in r && r.external ? '_blank' : ''}
          >
            <ParentLink>{r.title}</ParentLink>
          </Link>
          {'children' in r &&
            r.children &&
            r.children.map((c) => (
              <Link data-active={location === c.url} key={c.url} href={c.url}>
                <ChildLink>{c.title}</ChildLink>
              </Link>
            ))}
        </>
      ))}
    </Nav>
  );
};

const Nav = styled.nav`
  box-sizing: border-box;
  position: sticky;
  height: min-content;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 0 ${scale(2)};

  @media (max-width: 600px) {
    background: #fff;
    z-index: 1;
    height: 100%;
    position: fixed;
    width: 100vw;
    min-width: 100vw;
    margin-left: 0;
    transition: margin-left 200ms ease;
    overflow: auto;

    &[data-collapsed] {
      margin-left: -100vw;
    }
  }

  @media (min-width: 601px) {
    width: 200px;
  }
`;

const Logo = styled.img`
  height: ${scale(3)};
  margin-top: 60px;
  margin-bottom: ${scale(2)};
  overflow: visible;
`;

const ParentLink = styled.a`
  padding: ${scale(-1)} 0;
  text-decoration: none;
  font-size: ${scale(0.5)};
  color: #000;
  font-weight: bold;
`;

const ChildLink = styled.a`
  text-decoration: none;
  font-size: ${scale(0)};
  color: #000;
  padding: ${scale(-4)} 0;
  padding-left: ${scale(-2)};

  &[data-active='true'] {
    color: #e36975;
  }
`;

// const ParentLink = styled(Link)`
//   padding: ${scale(-1)} 0;
//   text-decoration: none;
//   font-size: ${scale(1)};
//   color: #000;
//   font-weight: bold;
// `;

// const ChildLink = styled(Link)`
//   text-decoration: none;
//   font-size: ${scale(0)};
//   color: #000;
//   padding: ${scale(-4)} 0;
//   padding-left: ${scale(-2)};

//   &[data-active='true'] {
//     color: #e36975;
//   }
// `;
