import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { Navigation } from './components/Navigation';
import * as headings from './components/HeadingLink';
import navButton from './assets/nav-button.svg';
import { Switch, Route, useLocation } from 'wouter';
import { routes, RouteDef, LiteralRoute } from './routes';

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
      <main className={'content'}>
        <MDXProvider components={headings}>
          <Switch>
            {literalRoutes.map(
              ({ url, title, component: Component, metadata }) => (
                <Route key={url} path={url}>
                  <Helmet>
                    <title>{title} | Fielder</title>
                    {metadata &&
                      metadata.map((props, index) => (
                        <meta key={index} {...props} />
                      ))}
                  </Helmet>
                  <Suspense fallback={null}>
                    <Component />
                  </Suspense>
                </Route>
              )
            )}
          </Switch>
        </MDXProvider>
      </main>
      <img className={'navbutton'} src={navButton} onClick={handleNavToggle} alt={'Toggle nav'} role={'button'} />
    </>
  );
}
