import React, { FC, Suspense, useCallback, useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { useHead } from 'hoofd';
import { MDXProvider } from '@mdx-js/react';
import { Navigation } from './components/Navigation';
import * as headings from './components/HeadingLink';
import navButton from './assets/nav-button.svg';
import { Switch, Route, useLocation } from 'wouter';
import { routes, RouteDef, LiteralRoute } from './routes';
import { scale } from './scale';

const getRoutes = (routeList: RouteDef[]): LiteralRoute[] =>
  routeList.reduce((acc, current) => {
    if ('children' in current && current.children) {
      return [...acc, ...getRoutes(current.children)];
    }

    if ('component' in current) {
      return [...acc, current];
    }

    return acc;
  }, [] as LiteralRoute[]);

const literalRoutes = getRoutes(routes);

export const App = () => {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const handleNavToggle = useCallback(() => setCollapsed((c) => !c), []);

  useEffect(() => {
    setCollapsed(true);
  }, [location]);

  return (
    <>
      <Navigation data-collapsed={collapsed} />
      <Content>
        <MDXProvider components={headings}>
          <Switch>
            {literalRoutes.map((route) => (
              <Route key={route.url} path={route.url}>
                <AppRoute {...route} />
              </Route>
            ))}
          </Switch>
        </MDXProvider>
      </Content>
      <img
        className={'navbutton'}
        src={navButton}
        onClick={handleNavToggle}
        alt={'Toggle nav'}
        role={'button'}
      />
    </>
  );
};

const Content = styled.main`
  box-sizing: border-box;
  width: 100vw;
  padding: 10px 10px;
  flex-grow: 1;

  @media (min-width: 601px) {
    padding: 20px 40px;
    max-width: 800px;
    min-width: calc(100% - 200px);
  }

  h1 {
    font-size: ${scale(3)};
    margin-top: ${scale(3)};
    margin-bottom: ${scale(2)};
  }

  h2 {
    font-size: ${scale(2)};
    margin-top: ${scale(4)};
    margin-bottom: ${scale(1)};
  }

  h3 {
    font-size: ${scale(1)};
    margin-top: ${scale(1)};
    margin-bottom: ${scale(0)};
  }

  p {
    font-size: ${scale(0)};
    margin: ${scale(1)} 0;
    line-height: 2em;
    color: #222;
  }

  li {
    line-height: 2em;

    & + & {
      margin-top: ${scale(0)};
    }
  }

  blockquote {
    border-left: solid 3px;
    margin-left: ${scale(0)};
    padding-left: ${scale(0)};
  }

  *:not(pre) > code {
    color: #e36975;
  }

  pre > code {
    display: block;
    overflow: auto;
    padding: ${scale(0)};
  }

  *:not(h1):not(h2):not(h3):not(h4):not(h5) > a {
    color: #8b61ff;
  }
`;

const AppRoute: FC<LiteralRoute> = ({
  title,
  component: Component,
  metadata,
}) => {
  useHead({
    title,
    metas: metadata,
  });

  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
};
