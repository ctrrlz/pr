const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Примитивное хранилище данных в памяти
//let products = require('./products.json');
let products= [
    {
      "id": 1,
      "category": "Электротехника",
      "name": "Электрическая плита",
      "price": 500,
      "description": "Мощная электрическая плита для приготовления вкусных блюд."
    },
    {
      "id": 2,
      "category": "Электротехника",
      "name": "Холодильник",
      "price": 800,
      "description": "Просторный холодильник для сохранения продуктов свежими."
    },
    {
      "id": 3,
      "category": "Электротехника",
      "name": "Микроволновка",
      "price": 300,
      "description": "Удобная микроволновка для быстрого приготовления пищи."
    },
    {
      "id": 4,
      "category": "Электротехника",
      "name": "Утюг",
      "price": 50,
      "description": "Эффективный утюг для глажки вашей одежды."
    },
    {
      "id": 5,
      "category": "Электротехника",
      "name": "Фен",
      "price": 30,
      "description": "Мощный фен для быстрого сушки волос."
    },
    {
      "id": 6,
      "category": "Электроника",
      "name": "Ноутбук",
      "price": 1200,
      "description": "Современный ноутбук для работы и развлечений."
    },
    {
      "id": 7,
      "category": "Электроника",
      "name": "Смартфон",
      "price": 600,
      "description": "Стильный смартфон с передовыми технологиями."
    },
    {
      "id": 8,
      "category": "Электроника",
      "name": "Телевизор",
      "price": 1000,
      "description": "Широкий телевизор с высоким разрешением для качественного просмотра."
    },
    {
      "id": 9,
      "category": "Электроника",
      "name": "Наушники",
      "price": 100,
      "description": "Качественные наушники для наслаждения музыкой без помех."
    },
    {
      "id": 10,
      "category": "Электроника",
      "name": "Планшет",
      "price": 400,
      "description": "Легкий и удобный планшет для чтения и просмотра контента."
    }
  ]
  
let cartItems = [];

app.use(express.static('public'));
app.use(express.json());

// Маршрут для отображения главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для отображения страницы корзины
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// Маршрут для отображения страницы профиля
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Маршрут для получения списка товаров
app.get('/api/products', (req, res) => {
    if (req.query.categories) {
        const selectedCategories = req.query.categories.split(',').map(category => category.trim().toLowerCase());
        const filteredProducts = products.filter(product => selectedCategories.includes(product.category.toLowerCase()));
        res.json(filteredProducts);
    } else {
        res.json(products);
    }
});

// Маршрут для получения товаров в корзине
app.get('/api/cart', (req, res) => {
    res.json(cartItems);
});

// Маршрут для добавления товара в корзину
app.post('/api/cart', (req, res) => {
    const newItem = req.body;

    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cartItems.find(item => item.id === newItem.id);

    if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        existingItem.quantity += 1;
    } else {
        // Если товара нет в корзине, добавляем его
        newItem.quantity = 1;
        cartItems.push(newItem);
    }

    res.json(cartItems);
});

// Маршрут для удаления товара из корзины
app.post('/api/cart/remove', (req, res) => {
  const itemIdToRemove = req.body.id;

  // Находим индекс товара в корзине
  const itemIndex = cartItems.findIndex(item => item.id === itemIdToRemove);

  if (itemIndex !== -1) {
      // Удаляем товар из корзины
      cartItems.splice(itemIndex, 1);
      res.json(cartItems);
  } else {
      res.status(404).json({ error: 'Товар не найден в корзине' });
  }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
