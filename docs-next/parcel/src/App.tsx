import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { Navigation } from './components/Navigation';
import * as headings from './components/HeadingLink';
import navButton from './assets/nav-button.svg';
import { Route } from 'wouter';
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

export const App = () => (
  <>
    <Navigation />
    <main className={'content'}>
      <MDXProvider components={headings}>
        <Suspense fallback={null}>
          {literalRoutes.map(({ url, title, component: Component }) => (
            <Route key={url} path={url}>
              <Helmet>
                <title>{title} | Fielder</title>
              </Helmet>
              <Component />
            </Route>
          ))}
        </Suspense>
      </MDXProvider>
    </main>
    <img className={'navbutton'} src={navButton} />
  </>
);
