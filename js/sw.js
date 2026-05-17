const BASE = new URL('./', self.location.href).pathname;
const FILES = [
    BASE,
    BASE + 'index.html',
    BASE + 'sadrzaj.html',
    BASE + 'kontakt.html',
    BASE + 'css/tptpstil.css',
    BASE + 'js/tptpskripte.js',
    BASE + 'fonts/Inter.ttf',
    BASE + 'fonts/Montserrat.ttf',
    BASE + 'images/building.jpg',
    BASE + 'images/decoration.webp',
    BASE + 'images/elbox.jpg',
    BASE + 'images/fantasy.jpg',
    BASE + 'images/gears.png',
    BASE + 'images/keychain.webp',
    BASE + 'images/logo-dark.png',
    BASE + 'images/logo-light.png',
    BASE + 'images/logo-small.ico',
    BASE + 'images/luigi.png',
    BASE + 'images/maketa.jpg',
    BASE + 'images/nylon.jpg',
    BASE + 'images/printerAnatomy.png',
    BASE + 'images/printerAnatomy.webp',
    BASE + 'images/prototype.jpeg',
    BASE + 'images/resin.jpg',
    BASE + 'images/zvjerici.jpg',
];

const CACHE_NAME = '3dfabrika-v1';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});