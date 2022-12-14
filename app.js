const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

let db;

const dbRequest = indexedDB.open('StorageDummy', 1);


dbRequest.onsuccess = function (event) {
  db = event.target.result;

};


dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;

  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  objStore.transaction.oncomplete = function (event) {
    const productsStore = db.transaction('products', 'readwrite').objectStore('products');
    productsStore.add({
      id: 'p1',
      title: 'A first product',
      price: 12.99,
      tags: ['Expensive', 'Luxary']
    });

  }
};

dbRequest.onerror = function (event) {
  console.log('Error!');
};

storeBtn.addEventListener('click', () => {
  if (!db) {
    return;
  }
  const productsStore = db.transaction('products', 'readwrite').objectStore('products');
  productsStore.add({
    id: 'p2',
    title: 'A second product',
    price: 122.99,
    tags: ['Expensive', 'Luxary']
  });
});

retrBtn.addEventListener('click', () => {
  const productsStore = db.transaction('products', 'readwrite').objectStore('products');
  const request = productsStore.get('p2');

  request.onsuccess = function () {
    console.log(request.result);
  }
});