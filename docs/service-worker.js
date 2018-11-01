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
  "./precache-manifest.1dcbe49e58f492f9b424236955ab4e90.js"
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
    "revision": "7ab702d0da23c9aa4a9cc66e8b875418"
  },
  {
    "url": "precache-manifest.1a46abe5d163088151522c9d2727a99e.js",
    "revision": "1a46abe5d163088151522c9d2727a99e"
  },
  {
    "url": "precache-manifest.23991ba42f38dbaf0538f65ff144a168.js",
    "revision": "23991ba42f38dbaf0538f65ff144a168"
  },
  {
    "url": "precache-manifest.40716cf096b262138b15b79b1cdd4e06.js",
    "revision": "40716cf096b262138b15b79b1cdd4e06"
  },
  {
    "url": "precache-manifest.4e9447732aafd24d3e6c8a54105a9555.js",
    "revision": "4e9447732aafd24d3e6c8a54105a9555"
  },
  {
    "url": "precache-manifest.60eac0a8e7dfd9e3281f04986ba282fa.js",
    "revision": "60eac0a8e7dfd9e3281f04986ba282fa"
  },
  {
    "url": "precache-manifest.6e53c696a348424d9da5adb01111780e.js",
    "revision": "6e53c696a348424d9da5adb01111780e"
  },
  {
    "url": "precache-manifest.70f0bcdd0085cf429a272be1c787d1a6.js",
    "revision": "70f0bcdd0085cf429a272be1c787d1a6"
  },
  {
    "url": "precache-manifest.7850f6c16161818f82a49c7c787f1aba.js",
    "revision": "7850f6c16161818f82a49c7c787f1aba"
  },
  {
    "url": "precache-manifest.9e291fe3b3c37a6d0d8a677f55677377.js",
    "revision": "9e291fe3b3c37a6d0d8a677f55677377"
  },
  {
    "url": "precache-manifest.ab19b6043f3e64545b0f173f1395744a.js",
    "revision": "ab19b6043f3e64545b0f173f1395744a"
  },
  {
    "url": "precache-manifest.b381fa205ff6f3b276d471433f3561f7.js",
    "revision": "b381fa205ff6f3b276d471433f3561f7"
  },
  {
    "url": "precache-manifest.c847761a5be5a1eb17b868851afe799d.js",
    "revision": "c847761a5be5a1eb17b868851afe799d"
  },
  {
    "url": "precache-manifest.d6e35c3132c7b71c641227f6394e510e.js",
    "revision": "d6e35c3132c7b71c641227f6394e510e"
  },
  {
    "url": "service-worker.js",
    "revision": "2e2d572c194a6518c9247cebcb2e2d6a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
