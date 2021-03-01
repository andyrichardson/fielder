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
      <NavContent>
        {/* Placeholder width on image - https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/*/}
        <Logo width={20} height={parseInt(scale(3))} src={Icon} alt={'Logo'} />
        {routes.map((r) => (
          <>
	    {r.external ? 
	      <ParentLink key={r.url} href={r.url} target={'_blank'}>{r.title}</ParentLink>
		    :
            <Link
              key={r.url}
              to={r.url}
              target={'external' in r && r.external ? '_blank' : ''}
            >
              <ParentLink>{r.title}</ParentLink>
            </Link>
	    }
            {'children' in r &&
              r.children &&
              r.children.map((c) => (
                <Link key={c.url} href={c.url}>
                  <ChildLink data-active={location === c.url}>
                    {c.title}
                  </ChildLink>
                </Link>
              ))}
          </>
        ))}
      </NavContent>
    </Nav>
  );
};

const Nav = styled.div`
  box-sizing: border-box;
  position: sticky;
  height: min-content;
  top: 0;
  display: flex;
  justify-content: center;
  padding: 0 ${scale(2)};
  padding-bottom: ${scale(2)};

  @media (max-width: 999px) {
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

  @media (min-width: 1000px) {
    width: 200px;
  }
`;

const NavContent = styled.nav`
  display: flex;
  flex-direction: column;
  height: max-content;
  width: 300px;
`;

const Logo = styled.img`
  width: 100%;
  margin-top: 60px;
  margin-bottom: ${scale(2)};
  overflow: visible;
`;

const ParentLink = styled.a`
  padding: ${scale(-1)} 0;
  text-decoration: none;
  font-size: ${scale(1)};
  color: #000;
  font-weight: bold;
`;

const ChildLink = styled.a`
  text-decoration: none;
  font-size: ${scale(0)};
  color: #000;
  padding: ${scale(-2)} 0;
  padding-left: ${scale(-2)};

  &[data-active='true'] {
    color: #e36975;
  }
`;
