/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

importScripts(
  "./precache-manifest.4e9447732aafd24d3e6c8a54105a9555.js"
);

workbox.core.setCacheNameDetails({prefix: "uq-wallet"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "8dc7313d1e2ed73cd7c3128cd044dec6"
  },
  {
    "url": "precache-manifest.23991ba42f38dbaf0538f65ff144a168.js",
    "revision": "23991ba42f38dbaf0538f65ff144a168"
  },
  {
    "url": "precache-manifest.60eac0a8e7dfd9e3281f04986ba282fa.js",
    "revision": "60eac0a8e7dfd9e3281f04986ba282fa"
  },
  {
    "url": "precache-manifest.70f0bcdd0085cf429a272be1c787d1a6.js",
    "revision": "70f0bcdd0085cf429a272be1c787d1a6"
  },
  {
    "url": "service-worker.js",
    "revision": "78408f541acc001182066aae3931f059"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
