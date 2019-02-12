// Define what should be cached

let CACHE_NAME = 'site-cache';
let urlsToCache = ['index.html',
'restaurant.html',
'css/styles.css',
'js/dbhelper.js',
'js/main.js',
'js/restaurant_info.js',
'data/restaurants.json',
'img/1.jpg',
'img/2.jpg',
'img/3.jpg',
'img/4.jpg',
'img/5.jpg',
'img/6.jpg',
'img/7.jpg',
'img/8.jpg',
'img/9.jpg',
'img/10.jpg',
'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];

// Service Worker installation

self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests

self.addEventListener('fetch', function(evt) {
  evt.respondWith(
    caches.match(evt.request)
    .then(function(response) {
      if(response) {
        return response;
      }
      return fetch(evt.request).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          let responseToCache = response.clone();
          caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(evt.request, responseToCache);
          });
          return response;
        }
      );
    })
  );
});
