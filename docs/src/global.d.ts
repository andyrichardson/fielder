declare module '*.mdx' {
  const Component: import('react').FC;
  export default Component;
}

declare module '*.png' {
  const url: string;
  export default string;
}

declare module '*.svg' {
  const url: string;
  export default string;
}
