self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('fetch', (e) => {
  // Пустой обработчик нужен Chrome для активации кнопки "Установить"
});
