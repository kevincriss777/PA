// Productos disponibles
const products = [
    { 
        id: 1, 
        name: "Gorra Red Bull", 
        description: "Gorra  Checo perez", 
        price: 45, 
        image: "https://images-na.ssl-images-amazon.com/images/I/71XxZ9XcwfL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
    },
    { 
        id: 2, 
        name: "Camiseta Mercedes", 
        description: "Camiseta ultima edicion", 
        price: 65, 
        image: "https://i.ebayimg.com/thumbs/images/g/ticAAOSweLVn2oGj/s-l1200.jpg"
    },
    { 
        id: 3, 
        name: "Casco F1", 
        description: "Casco miniatura", 
        price: 120, 
        image: "https://e00-xlk-ue-marca.uecdn.es/uploads/2025/02/25/67bdf665d6bca.jpeg"
    },
    { 
        id: 4, 
        name: "Gorra Ferrari", 
        description: "Gorra Lewis ", 
        price: 50, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDA77nLQUzCQRkQgK851c_6l7Z6kfGYuggbw&s"  
    },
    { 
        id: 5, 
        name: "Sudadera McLaren", 
        description: "Sudadera McLaren F1", 
        price: 80, 
        image: "https://images.footballfanatics.com/mclaren-f1-team/mclaren-2024-team-lando-norris-driver-set-up-t-shirt-phantom_ss5_p-201084292+pv-1+u-f14ngdq2u25xw1bbhbf0+v-jptduwp5868hgwdbex2w.jpg?_hv=2&w=900"
    },
    { 
        id: 6, 
        name: "Sudaddera Alpine", 
        description: "franco colapinto", 
        price: 15, 
        image: "https://i.ebayimg.com/images/g/ouoAAOSw8VtnFZZ2/s-l400.jpg"
    }
];

let cart = [];

// Mostrar productos
function showProducts() {
    const container = document.getElementById('products');
    container.innerHTML = '';

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
            <button class="add-btn" onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        container.appendChild(div);
    });
}

// Agregar al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Actualizar carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalElement = document.getElementById('total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Tu carrito está vacío</p></div>';
        totalElement.textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} cada uno</p>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${item.id})">Eliminar</button>
            </div>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total;
}

// Cambiar cantidad
function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            updateCart();
        }
    }
}

// Eliminar item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Ir al carrito
function scrollToCart() {
    document.querySelector('.cart-section').scrollIntoView({ behavior: 'smooth' });
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`¡Gracias por tu compra!\nTotal: $${total}`);

    cart = [];
    updateCart();
}

// Inicialización
showProducts();
updateCart();