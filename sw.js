// Rutina enduro — service worker de baja (2026-10-19). La rutina se mudó a
// https://erickiess.github.io/rutina-enduro/ (ver index.html).
// Cuando el navegador baja esta versión reemplaza al SW viejo, borra SÓLO las cachés
// de la rutina (enduro-gym-*) y se desinstala. Sin handler de fetch: todo va a la red.
// ⛔ No borrar otras cachés: en este origen vive el remito de Powell (remito-v*).
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys()
      .then(function(ks){ return Promise.all(ks.filter(function(k){ return k.indexOf('enduro-gym-') === 0; }).map(function(k){ return caches.delete(k); })); })
      .then(function(){ return self.registration.unregister(); })
      .then(function(){ return self.clients.matchAll({ type: 'window' }); })
      .then(function(cs){ cs.forEach(function(c){ c.navigate(c.url); }); })
  );
});
