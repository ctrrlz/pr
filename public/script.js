document.addEventListener('DOMContentLoaded', () => {
    // При клике на категорию "Электротехника"
    document.getElementById('category-electro').addEventListener('click', function () {
        loadProducts(['Электротехника']);
    });

    // При клике на категорию "Электроника"
    document.getElementById('category-electronic').addEventListener('click', function () {
        loadProducts(['Электроника']);
    });

    // При клике на "Все товары"
    document.getElementById('all-products').addEventListener('click', function () {
        loadProducts([]);
    });

    // При клике на кнопку "Корзина"
    document.getElementById('cart').addEventListener('click', function () {
        window.location.href = '/cart';
    });

    // Инициализация загрузки всех товаров при загрузке страницы
    loadProducts();

    // Функция для загрузки товаров с сервера по категории
    function loadProducts(categories = []) {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой новых товаров

        // Если есть выбранные категории, формируем URL запроса с учетом всех выбранных
        const url = categories.length > 0
            ? `/api/products?categories=${encodeURIComponent(categories.join(','))}`
            : '/api/products';

        // Загрузка товаров с сервера
        fetch(url)
            .then(response => response.json())
            .then(products => {
                // Отображение товаров на странице
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    productsContainer.appendChild(productCard);
                });
            });
    }

    // Функция для создания карточки товара
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const title = document.createElement('h2');
        title.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = `Цена: $${product.price}`;

        const description = document.createElement('p');
        description.textContent = product.description;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Добавить в корзину';
        addToCartButton.addEventListener('click', () => addToCart(product));

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(addToCartButton);

        return card;
    }

    // Функция для добавления товара в корзину
    function addToCart(product) {
        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(updatedCart => {
            console.log('Товар добавлен в корзину:', product);
        })
        .catch(error => {
            console.error('Ошибка при добавлении товара в корзину:', error);
        });
    }
});
