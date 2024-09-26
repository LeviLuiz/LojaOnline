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
    body = document.querySelector('body')
}