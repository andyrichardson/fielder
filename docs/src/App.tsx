import React, { FC, Suspense, useCallback, useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { useHead } from 'hoofd';
import { MDXProvider } from '@mdx-js/react';
import { Navigation } from './components/Navigation';
import * as headings from './components/HeadingLink';
import navButton from './assets/nav-button.svg';
import ogImage from './assets/open-graph-square.png';
import { Switch, Route, useLocation, Router, Redirect } from 'wouter';
import { LiteralRoute, literalRoutes } from './routes';
import { scale } from './scale';

export const App = () => {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const handleNavToggle = useCallback(() => setCollapsed((c) => !c), []);

  useEffect(() => {
    setCollapsed(true);
  }, [location]);

  return (
    <>
      <Router>
        <Navigation data-collapsed={collapsed} />
        <Content>
          <MDXProvider components={headings}>
            <Switch>
              {[
                ...literalRoutes.map((route) => (
                  <Route key={route.url} path={route.url}>
                    <AppRoute {...route} />
                  </Route>
                )),
                <Route key={'fallback'}>
                  <Redirect to={'/'} />
                </Route>,
              ]}
            </Switch>
          </MDXProvider>
        </Content>
        <NavButton
          src={navButton}
          onClick={handleNavToggle}
          alt={'Toggle nav'}
          role={'button'}
        />
      </Router>
    </>
  );
};

const Content = styled.main`
  overflow: auto;
  flex: 1 1 auto;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 ${scale(0)};
  padding-bottom: ${scale(6)} !important;

  @media (min-width: 400px) {
    padding: 0 ${scale(1)};
  }

  @media (min-width: 600px) {
    padding: 0 ${scale(2)};
  }

  h1 {
    font-size: ${scale(3)};
    margin-top: ${scale(5)};
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

  pre[class*='language-'] {
    padding: 0;
  }

  pre > code {
    display: block;
    overflow: auto;
    padding: ${scale(1)};

    @media (min-width: 600px) {
      padding: ${scale(2)};
    }
  }

  *:not(h1):not(h2):not(h3):not(h4):not(h5) > a {
    color: #8b61ff;
  }
`;

const NavButton = styled.img`
  height: ${scale(5)};
  position: fixed;
  bottom: 30px;
  right: 30px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  background: #000;
  cursor: pointer;
  z-index: 5;

  @media (min-width: 1000px) {
    display: none;
  }
`;

const AppRoute: FC<LiteralRoute> = ({
  title,
  component: Component,
  metadata,
}) => {
  useHead({
    title: `${title} | Fielder Docs`,
    metas: [
      ...(metadata || []),
      { name: 'og:type', content: 'website' },
      {
        name: 'og:image',
        content: `https://fielder.andyrichardson.dev/${ogImage}`,
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:site',
        content: '@andyrichardsonn',
      },
      {
        name: 'twitter:creator',
        content: '@andyrichardsonn',
      },
    ],
  });

  // Use SSR for meta tags only (no hydration)
  if (navigator.userAgent === 'ReactSnap') {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
};
