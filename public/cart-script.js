document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');

   
    fetch('/api/cart')
        .then(response => response.json())
        .then(cartItems => {
        
            cartItems.forEach(item => {
                const cartItemCard = createCartItemCard(item);
                cartContainer.appendChild(cartItemCard);
            });
        });

    
    function createCartItemCard(item) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const title = document.createElement('h2');
        title.textContent = item.name;

        const price = document.createElement('p');
        price.textContent = `Цена: $${item.price}`;

        const quantity = document.createElement('p');
        quantity.textContent = `Количество: ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить из корзины';
        removeButton.addEventListener('click', () => removeFromCart(item));

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(quantity);
        card.appendChild(removeButton);

        return card;
    }

   
    function removeFromCart(item) {
        fetch('/api/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: item.id }),
        })
        .then(response => response.json())
        .then(updatedCart => {
            console.log('Товар удален из корзины:', item);
            location.reload();
        })
        
    }
});
