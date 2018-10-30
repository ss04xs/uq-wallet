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
  "./precache-manifest.1a46abe5d163088151522c9d2727a99e.js"
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
    "revision": "6a5af6f0f6a9626d49966b6d10ef1119"
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
    "url": "precache-manifest.b381fa205ff6f3b276d471433f3561f7.js",
    "revision": "b381fa205ff6f3b276d471433f3561f7"
  },
  {
    "url": "service-worker.js",
    "revision": "275644a896e8d0ac92c6d62dd75d65f2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
