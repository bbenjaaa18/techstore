// src/data.js
const STORAGE_KEY = 'myshop_data_v1';

// estructura inicial de ejemplo
const initial = {
  products: [
    { id: 1, name: 'Manzana', price: 500, category: 'Frutas', offer: false },
    { id: 2, name: 'Lechuga', price: 300, category: 'Verduras', offer: true }
  ],
  orders: []
};

function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return JSON.parse(JSON.stringify(initial));
  }
  return JSON.parse(raw);
}

function writeStore(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export function getProducts() {
  const s = readStore();
  return s.products;
}

export function getProductById(id) {
  return getProducts().find(p => p.id === Number(id));
}

export function createProduct(prod) {
  const s = readStore();
  const nextId = s.products.length ? Math.max(...s.products.map(p=>p.id)) + 1 : 1;
  const newP = { ...prod, id: nextId };
  s.products.push(newP);
  writeStore(s);
  return newP;
}

export function updateProduct(id, changes) {
  const s = readStore();
  const idx = s.products.findIndex(p=>p.id===Number(id));
  if (idx === -1) throw new Error('No encontrado');
  s.products[idx] = { ...s.products[idx], ...changes };
  writeStore(s);
  return s.products[idx];
}

export function deleteProduct(id) {
  const s = readStore();
  s.products = s.products.filter(p=>p.id !== Number(id));
  writeStore(s);
  return true;
}

export function addOrder(order) {
  const s = readStore();
  order.id = s.orders.length ? Math.max(...s.orders.map(o=>o.id)) + 1 : 1;
  s.orders.push(order);
  writeStore(s);
  return order;
}
