// Cache fonts
workbox.routing.registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    /.*\.(woff|woff2|ttf|otf|eot)$/.test(url.pathname),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fonts',
  })
);

// Cache js
workbox.routing.registerRoute(
  ({ request, url }) =>
    request.url.origin === self.location.origin &&
    /(?<!sw)\.js$/.test(url.pathname),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js',
  })
);

// Cache js
workbox.routing.registerRoute(
  ({ request, url }) =>
    request.url.origin === self.location.origin && /.*.css$/.test(url.pathname),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css',
  })
);
