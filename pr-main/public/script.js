document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('category-electro').addEventListener('click', function () {
        loadProducts(['Электротехника']);
    });

  
    document.getElementById('category-electronic').addEventListener('click', function () {
        loadProducts(['Электроника']);
    });
document.getElementById('all-products').addEventListener('click', function () {
        loadProducts([]);
    });

   
    document.getElementById('cart').addEventListener('click', function () {
        window.location.href = '/cart';
    });

   
    loadProducts();

  
    function loadProducts(categories = []) {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = ''; 

        
        const url = categories.length > 0
            ? `/api/products?categories=${encodeURIComponent(categories.join(','))}`
            : '/api/products';

       
        fetch(url)
            .then(response => response.json())
            .then(products => {
                
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    productsContainer.appendChild(productCard);
                });
            });
    }

  
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
    }
});
