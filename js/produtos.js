/* Java script */
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalDonation = JSON.parse(localStorage.getItem('totalDonation')) || 0.00;

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    saveCart();
    updateCart();
    console.log(`${productName} adicionado com sucesso`)
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalDonation', JSON.stringify(totalDonation));
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        total += item.price;
    });

    total += totalDonation;
}

function zoom() {
    const img2 = document.getElementById('grande2');
    if (img2) {
        img2.id = 'foto2';  // Troca o ID de img2, se encontrado
    }

    const img1 = document.getElementById('foto1');
    if (img1) {
        img1.id = 'grande';  // Troca o ID de img1, se encontrado
    }
}

function zoom2() {
    const img1 = document.getElementById('grande');
    if (img1) {
        img1.id = 'foto1';  // Troca o ID de img1, se encontrado
    }

    const img2 = document.getElementById('foto2');
    if (img2) {
        img2.id = 'grande2';  // Troca o ID de img2, se encontrado
    }
}


function saiu() {
    const img1 = document.getElementById('grande');
    if (img1) {
        img1.id = 'foto1';  // Troca o ID de img1, se encontrado
    }
}

function saiu2() {
    const img2 = document.getElementById('grande2');
    if (img2) {
        img2.id = 'foto2';  // Troca o ID de img2, se encontrado
    }
}

