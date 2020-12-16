import { clientsClaim, skipWaiting } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(({ request, url }) => {
  if (request.mode !== 'navigate') {
    return false;
  }
  if (url.pathname.startsWith('/_')) {
    return false;
  }
  // Has file extension
  if (url.pathname.match(new RegExp('/[^/?]+\\.[^/]+$'))) {
    return false;
  }
  return true;
}, createHandlerBoundToURL(`/index.html`));

registerRoute(
  /.*\/manifest\/.*/,
  new StaleWhileRevalidate({
    cacheName: 'manifest',
  })
);
