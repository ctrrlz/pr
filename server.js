const express = require('express');
const path = require('path');
const app = express();
const port = 2007;

let products= [
    {
      "id": 1,
      "category": "Электротехника",
      "name": "Электрическая плита",
      "price": 500,
      "description": "Мощная электрическая плита для приготовления вкусных блюд.",
      "color": "black"
    },
    {
      "id": 2,
      "category": "Электротехника",
      "name": "Холодильник",
      "price": 800,
      "description": "Просторный холодильник для сохранения продуктов свежими.",
      "color": "white"
    },
    {
      "id": 3,
      "category": "Электротехника",
      "name": "Микроволновка",
      "price": 300,
      "description": "Удобная микроволновка для быстрого приготовления пищи.",
      "color": "gray"
    },
    {
      "id": 4,
      "category": "Электротехника",
      "name": "Утюг",
      "price": 50,
      "description": "Эффективный утюг для глажки вашей одежды.",
      "color": "white"
    },
    {
      "id": 5,
      "category": "Электротехника",
      "name": "Фен",
      "price": 30,
      "description": "Мощный фен для быстрого сушки волос.",
      "color": "gold"
    },
    {
      "id": 6,
      "category": "Электроника",
      "name": "Ноутбук",
      "price": 1200,
      "description": "Современный ноутбук для работы и развлечений.",
      "color": "dark blue"
    },
    {
      "id": 7,
      "category": "Электроника",
      "name": "Смартфон",
      "price": 600,
      "description": "Стильный смартфон с передовыми технологиями.",
      "color": "light pink"
    },
    {
      "id": 8,
      "category": "Электроника",
      "name": "Телевизор",
      "price": 1000,
      "description": "Широкий телевизор с высоким разрешением для качественного просмотра.",
      "color": "black"
    },
    {
      "id": 9,
      "category": "Электроника",
      "name": "Наушники",
      "price": 100,
      "description": "Качественные наушники для наслаждения музыкой без помех.",
      "color": "white"
    },
    {
      "id": 10,
      "category": "Электроника",
      "name": "Планшет",
      "price": 400,
      "description": "Легкий и удобный планшет для чтения и просмотра контента.",
      "color": "silver"
    },
    {
      "id": 11,
      "category": "Электроника",
      "name": "Мышка",
      "price": 20,
      "description": "Удобная и практичная мышка для вашего компьютера.",
      "color": "red"
    },
    {
      "id": 12,
      "category": "Электротехника",
      "name": "Робот-пылесос",
      "price": 1200,
      "description": "Практичный помощник для уборки вашего дома.",
      "color": "black"
    },
    {
      "id": 13,
      "category": "Электротехника",
      "name": "Кофемашина",
      "price": 900,
      "description": "Прекрасная находка для любителей взбодриться.",
      "color": "gray"
    },
    {
      "id": 14,
      "category": "Электротехника",
      "name": "Фен",
      "price": 400,
      "description": "Качественный и негромкий фен для быстрой сушки волос.",
      "color": "silver"
    },
    {
      "id": 15,
      "category": "Электроника",
      "name": "Игровая приставка",
      "price": 150,
      "description": "Для вашего весёлого времяпрепровождения.",
      "color": "black"
    },
    {
      "id": 16,
      "category": "Электроника",
      "name": "Электросамокат",
      "price": 1300,
      "description": "Удобное и компактное средство для быстрого передвижения по городу.",
      "color": "dark green"
    },
    {
      "id": 17,
      "category": "Электротехника",
      "name": "Мультиварка",
      "price": 500,
      "description": "Практичный помощник на вашей кухне.",
      "color": "black"
    }
    ,
    {
      "id": 18,
      "category": "Электротехника",
      "name": "Отпариватель",
      "price": 80,
      "description": "Отличная замена утюгу, для быстрого разглаживания вашей одежды.",
      "color": "white"
    },
    {
      "id": 19,
      "category": "Электротехника",
      "name": "Швейная машинка",
      "price": 250,
      "description": "Отличный помощник для в создании стильной одежды и шитья.",
      "color": "milk"
    },
    {
      "id": 20,
      "category": "Электроника",
      "name": "Принтер",
      "price": 400,
      "description": "Превосходное средство для качественной печати ваших фото.",
      "color": "yellow"
    }
  ]
  //Еще будут добавлены товары в другом варианте хранения.
let cartItems = [];

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/api/products', (req, res) => {
    if (req.query.categories) {
        const selectedCategories = req.query.categories.split(',').map(category => category.trim().toLowerCase());
        const filteredProducts = products.filter(product => selectedCategories.includes(product.category.toLowerCase()));
        res.json(filteredProducts);
    } else {
        res.json(products);
    }
});

app.get('/api/cart', (req, res) => {
    res.json(cartItems);
});

app.post('/api/cart', (req, res) => {
    const newItem = req.body;

    const existingItem = cartItems.find(item => item.id === newItem.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        newItem.quantity = 1;
        cartItems.push(newItem);
    }

    res.json(cartItems);
});

app.post('/api/cart/remove', (req, res) => {
  const itemIdToRemove = req.body.id;

  const itemIndex = cartItems.findIndex(item => item.id === itemIdToRemove);

  if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      res.json(cartItems);
  } else {
      res.status(404).json({ error: 'Товар не найден в корзине' });
  }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
//Добавить:
//Возможность перехода на страницы корзины и профиля без создания их отдельными файлами(переадресация на express)
//Возможность перехода на отдельную страницу по категоризации
//Авторизация и регистрация
//Сохранение данных пользователя при регистрации(в базе и сохранять при перезагрузке)
//Возможность сохранять всех пользователей посл регистрации, большое число, неограниченно
//Создание профиля при регистрации
//Возможность менять данные в профиле
//Отображение корзины соответсвенно пользователю
//Кнопки сравнения и отложенного(по возможности)+
//Страница сравнения и отложенного(по возможности)+
//Создание и открытие страницы с подробным описание товаров
//Добавить больше товаров и их критерий для фильтрации(особенно добавить описание очень подробное для вывода подробностей и картинки с онлайнера(возможно и все товары с онлайнера брать в качестве апишки))
//Добавить фильтрацию(по цвету, году выпуска, цвету, и другим критериям, которые еще добавятся)
//Сохранение пользьзователя после авторизации на странице без дополнительного запроса на вход при перезагрузке