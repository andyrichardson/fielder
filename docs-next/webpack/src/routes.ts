import { lazy } from 'react';

/** Route containing component */
export type LiteralRoute = {
  title: string;
  url: string;
  component: ReturnType<typeof lazy>;
  metadata?: Array<JSX.IntrinsicElements['meta']>;
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
    metadata: [
      {
        name: 'description',
        content:
          'The official docs site for Fielder - the dynamic form library',
      },
    ],
  },
  {
    title: 'Guides',
    url: '/guides/getting-started',
    children: [
      {
        title: 'Getting started',
        url: '/guides/getting-started',
        component: lazy(() => import('./pages/guides/getting-started.mdx')),
        metadata: [
          { name: 'description', content: 'How to get started using Fielder' },
        ],
      },
      {
        title: 'Validation',
        url: '/guides/validation',
        component: lazy(() => import('./pages/guides/validation.mdx')),
        metadata: [
          {
            name: 'description',
            content: 'How to use form validation in React with Fielder',
          },
        ],
      },
      {
        title: 'Submission',
        url: '/guides/submission',
        component: lazy(() => import('./pages/guides/submission.mdx')),
        metadata: [
          {
            name: 'description',
            content: 'How to handle submission in Fielder',
          },
        ],
      },
      {
        title: 'Type safety',
        url: '/guides/type-safety',
        component: lazy(() => import('./pages/guides/type-safety.mdx')),
        metadata: [
          {
            name: 'description',
            content: 'How to configure types in Fielder',
          },
        ],
      },
      {
        title: 'React Native',
        url: '/guides/react-native',
        component: lazy(() => import('./pages/guides/react-native.mdx')),
        metadata: [
          {
            name: 'description',
            content: 'How to get started using Fielder in React Native',
          },
        ],
      },
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
        metadata: [
          {
            name: 'description',
            content: 'API reference documentation for the useField hook',
          },
        ],
      },
      {
        title: 'useForm',
        url: '/api/useForm',
        component: lazy(() => import('./pages/api/useForm.mdx')),
        metadata: [
          {
            name: 'description',
            content: 'API reference documentation for the useForm hook',
          },
        ],
      },
      {
        title: 'useFormContext',
        url: '/api/useFormContext',
        component: lazy(() => import('./pages/api/useFormContext.mdx')),
        metadata: [
          {
            name: 'description',
            content: 'API reference documentation for the useFormContext hook',
          },
        ],
      },
      {
        title: 'useSubmit',
        url: '/api/useSubmit',
        component: lazy(() => import('./pages/api/useSubmit.mdx')),
        metadata: [
          {
            name: 'description',
            content: 'API reference documentation for the useSubmit hook',
          },
        ],
      },
      {
        title: 'FielderProvider',
        url: '/api/FielderProvider',
        component: lazy(() => import('./pages/api/FielderProvider.mdx')),
        metadata: [
          {
            name: 'description',
            content:
              'API reference documentation for the FielderProvider component',
          },
        ],
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
        component: lazy(() => import('./pages/examples/static-forms.mdx')),
        metadata: [
          {
            name: 'description',
            content:
              'A live sandbox demonstrating how to create static forms in Fielder',
          },
        ],
      },
      {
        title: 'Dynamic forms',
        url: '/examples/dynamic-forms',
        component: lazy(() => import('./pages/examples/dynamic-forms.mdx')),
        metadata: [
          {
            name: 'description',
            content:
              'A live sandbox demonstrating how to create dynamic forms in Fielder',
          },
        ],
      },
    ],
  },
  {
    title: 'GitHub',
    url: 'https://github.com/andyrichardson/fielder',
    external: true,
  },
];