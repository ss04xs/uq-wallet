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
  "./precache-manifest.9094f733e988cb8ab8742b155d036387.js"
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
    "revision": "32efa9e72d5918870d940c73727207c6"
  },
  {
    "url": "precache-manifest.0110b35df787bf932ecb543274b6f42b.js",
    "revision": "0110b35df787bf932ecb543274b6f42b"
  },
  {
    "url": "precache-manifest.0bcb610967ff8f6256217269d0679f44.js",
    "revision": "0bcb610967ff8f6256217269d0679f44"
  },
  {
    "url": "precache-manifest.0dc2b16ac9dc27409d94b81295749f9b.js",
    "revision": "0dc2b16ac9dc27409d94b81295749f9b"
  },
  {
    "url": "precache-manifest.19096405fb1db666561e6c29cdeb1cbc.js",
    "revision": "19096405fb1db666561e6c29cdeb1cbc"
  },
  {
    "url": "precache-manifest.1a46abe5d163088151522c9d2727a99e.js",
    "revision": "1a46abe5d163088151522c9d2727a99e"
  },
  {
    "url": "precache-manifest.1ac1705db203c655ceefd76845661151.js",
    "revision": "1ac1705db203c655ceefd76845661151"
  },
  {
    "url": "precache-manifest.1dcbe49e58f492f9b424236955ab4e90.js",
    "revision": "1dcbe49e58f492f9b424236955ab4e90"
  },
  {
    "url": "precache-manifest.221ec9bff74c14b078d0e0ff3302b50d.js",
    "revision": "221ec9bff74c14b078d0e0ff3302b50d"
  },
  {
    "url": "precache-manifest.23991ba42f38dbaf0538f65ff144a168.js",
    "revision": "23991ba42f38dbaf0538f65ff144a168"
  },
  {
    "url": "precache-manifest.25708f0d934703bbb913449952dd51ea.js",
    "revision": "25708f0d934703bbb913449952dd51ea"
  },
  {
    "url": "precache-manifest.25e937194ca793737aa2eb9c02212b9e.js",
    "revision": "25e937194ca793737aa2eb9c02212b9e"
  },
  {
    "url": "precache-manifest.27408e65959b13fca5b1f8d6793b34d1.js",
    "revision": "27408e65959b13fca5b1f8d6793b34d1"
  },
  {
    "url": "precache-manifest.28f09cb0bac3610e428589ccbb0c92aa.js",
    "revision": "28f09cb0bac3610e428589ccbb0c92aa"
  },
  {
    "url": "precache-manifest.2903b9dca667734ecf0655efc3d1f293.js",
    "revision": "2903b9dca667734ecf0655efc3d1f293"
  },
  {
    "url": "precache-manifest.2b53431ac4e1bbb9269b8dcdcf4c3d10.js",
    "revision": "2b53431ac4e1bbb9269b8dcdcf4c3d10"
  },
  {
    "url": "precache-manifest.356b4e09697a6b87b318f0ced5209c0d.js",
    "revision": "356b4e09697a6b87b318f0ced5209c0d"
  },
  {
    "url": "precache-manifest.3ff1a593c25fc0ae02ecf138d089dcb8.js",
    "revision": "3ff1a593c25fc0ae02ecf138d089dcb8"
  },
  {
    "url": "precache-manifest.40716cf096b262138b15b79b1cdd4e06.js",
    "revision": "40716cf096b262138b15b79b1cdd4e06"
  },
  {
    "url": "precache-manifest.46ff469d09cf5572c5180bae5737c418.js",
    "revision": "46ff469d09cf5572c5180bae5737c418"
  },
  {
    "url": "precache-manifest.4724e38036d9b274bfe38ee2b47ff537.js",
    "revision": "4724e38036d9b274bfe38ee2b47ff537"
  },
  {
    "url": "precache-manifest.48016f99eaefc261d1171dec4de8a78c.js",
    "revision": "48016f99eaefc261d1171dec4de8a78c"
  },
  {
    "url": "precache-manifest.49bf937a811a7c9a34775c84ed990187.js",
    "revision": "49bf937a811a7c9a34775c84ed990187"
  },
  {
    "url": "precache-manifest.4e9447732aafd24d3e6c8a54105a9555.js",
    "revision": "4e9447732aafd24d3e6c8a54105a9555"
  },
  {
    "url": "precache-manifest.598fbae191a5f542e289d7bd8747b998.js",
    "revision": "598fbae191a5f542e289d7bd8747b998"
  },
  {
    "url": "precache-manifest.5a78710a5b98ed46080fa303b362ff94.js",
    "revision": "5a78710a5b98ed46080fa303b362ff94"
  },
  {
    "url": "precache-manifest.5b668c4dc345188015a8d12f916cfe59.js",
    "revision": "5b668c4dc345188015a8d12f916cfe59"
  },
  {
    "url": "precache-manifest.5deb3b7307c3d81664c0615726c07b5c.js",
    "revision": "5deb3b7307c3d81664c0615726c07b5c"
  },
  {
    "url": "precache-manifest.60eac0a8e7dfd9e3281f04986ba282fa.js",
    "revision": "60eac0a8e7dfd9e3281f04986ba282fa"
  },
  {
    "url": "precache-manifest.64cbc1651d0484ca5d6c61074c68c235.js",
    "revision": "64cbc1651d0484ca5d6c61074c68c235"
  },
  {
    "url": "precache-manifest.6569ce2c9b2b9f35a32b6af68486deee.js",
    "revision": "6569ce2c9b2b9f35a32b6af68486deee"
  },
  {
    "url": "precache-manifest.6c37d4c6e9e1db3e4f7ec0f62bd4eaff.js",
    "revision": "6c37d4c6e9e1db3e4f7ec0f62bd4eaff"
  },
  {
    "url": "precache-manifest.6e53c696a348424d9da5adb01111780e.js",
    "revision": "6e53c696a348424d9da5adb01111780e"
  },
  {
    "url": "precache-manifest.6f62a8b6a533d6340e54811a10d93107.js",
    "revision": "6f62a8b6a533d6340e54811a10d93107"
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
    "url": "precache-manifest.911c2c0fec35c88aa09dcc06927ab29d.js",
    "revision": "911c2c0fec35c88aa09dcc06927ab29d"
  },
  {
    "url": "precache-manifest.9a914bd98dd16e0bd1a3345c67cc9901.js",
    "revision": "9a914bd98dd16e0bd1a3345c67cc9901"
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
    "url": "precache-manifest.bd6070fd5ad07885b6830268230ccac8.js",
    "revision": "bd6070fd5ad07885b6830268230ccac8"
  },
  {
    "url": "precache-manifest.c6b40ab5a15dd7a3ad028988f81be6b8.js",
    "revision": "c6b40ab5a15dd7a3ad028988f81be6b8"
  },
  {
    "url": "precache-manifest.c847761a5be5a1eb17b868851afe799d.js",
    "revision": "c847761a5be5a1eb17b868851afe799d"
  },
  {
    "url": "precache-manifest.c9d398d836e38a7f47954f1343501ba3.js",
    "revision": "c9d398d836e38a7f47954f1343501ba3"
  },
  {
    "url": "precache-manifest.d1b77901cf7e39226cb6aef7e4739528.js",
    "revision": "d1b77901cf7e39226cb6aef7e4739528"
  },
  {
    "url": "precache-manifest.d6e35c3132c7b71c641227f6394e510e.js",
    "revision": "d6e35c3132c7b71c641227f6394e510e"
  },
  {
    "url": "precache-manifest.ddc35c93b4fb08f9d960049ec6680ab3.js",
    "revision": "ddc35c93b4fb08f9d960049ec6680ab3"
  },
  {
    "url": "precache-manifest.e40f45e2ca498e2cbb37072cc72827aa.js",
    "revision": "e40f45e2ca498e2cbb37072cc72827aa"
  },
  {
    "url": "precache-manifest.ea446f190e3d290c6aad0a4186bff397.js",
    "revision": "ea446f190e3d290c6aad0a4186bff397"
  },
  {
    "url": "precache-manifest.ef09cfa380941514465be14c0dfd40dc.js",
    "revision": "ef09cfa380941514465be14c0dfd40dc"
  },
  {
    "url": "precache-manifest.f0d07908e022f8b85280dae246761621.js",
    "revision": "f0d07908e022f8b85280dae246761621"
  },
  {
    "url": "precache-manifest.f4f0f91297f0f25d3f5da09095b115ca.js",
    "revision": "f4f0f91297f0f25d3f5da09095b115ca"
  },
  {
    "url": "precache-manifest.f5e426f266387b4b25f9a7f7a67c0c76.js",
    "revision": "f5e426f266387b4b25f9a7f7a67c0c76"
  },
  {
    "url": "service-worker.js",
    "revision": "74775de3eb73711074a209edff523ef5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
