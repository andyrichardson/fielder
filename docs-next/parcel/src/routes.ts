import { lazy } from 'react';

/** Route containing component */
export type LiteralRoute = {
  title: string;
  url: string;
  component: ReturnType<typeof lazy>;
};

/** Route not containing component (group or external link) */
export type AbstractRoute = {
  title: string;
  url: string;
  children?: Array<AbstractRoute | LiteralRoute>;
  external?: boolean;
};

export type RouteDef = LiteralRoute | AbstractRoute;

export const routes: RouteDef[] = [
  {
    title: 'About',
    url: '/',
    component: lazy(() => import('./pages/About.mdx')),
  },
  {
    title: 'Guides',
    url: '/guides/getting-started',
    children: [
      { title: 'Getting started', url: '/guides/getting-started' },
      { title: 'Validation', url: '/guides/validation' },
      { title: 'Submission', url: '/guides/submission' },
      { title: 'Type safety', url: '/guides/type-safety' },
      { title: 'React Native', url: '/guides/react-native' },
    ],
  },
  {
    title: 'Api',
    url: '/api/useField',
    children: [
      {
        title: 'useField',
        url: '/api/useField',
        component: lazy(() => import('./pages/api/useField.mdx')),
      },
      {
        title: 'useForm',
        url: '/api/useForm',
        component: lazy(() => import('./pages/api/useForm.mdx')),
      },
      {
        title: 'useFormContext',
        url: '/api/useFormContext',
        component: lazy(() => import('./pages/api/useFormContext.mdx')),
      },
      {
        title: 'useSubmit',
        url: '/api/useSubmit',
        component: lazy(() => import('./pages/api/useSubmit.mdx')),
      },
      {
        title: 'FielderProvider',
        url: '/api/FielderProvider',
        component: lazy(() => import('./pages/api/FielderProvider.mdx')),
      },
    ],
  },
  {
    title: 'Examples',
    url: '/examples/static-forms',
    children: [
      {
        title: 'Static forms',
        url: '/examples/static-forms',
        // component: lazy(() => import('./pages/examples/static-forms.mdx')),
      },
      {
        title: 'Dynamic forms',
        url: '/examples/dynamic-forms',
        // component: lazy(() => import('./pages/examples/dynamic-forms.mdx')),
      },
    ],
  },
  {
    title: 'GitHub',
    url: 'https://github.com/andyrichardson/fielder',
    external: true,
  },
];
