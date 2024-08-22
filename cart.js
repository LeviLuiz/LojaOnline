let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalDonation = JSON.parse(localStorage.getItem('totalDonation')) || 0.00;

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalDonation', JSON.stringify(totalDonation));
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    total += totalDonation;
    totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function addDonation(amount) {
    totalDonation += amount;
    saveCart();
    document.getElementById('donation-total').textContent = `Total da Doação: R$ ${totalDonation.toFixed(2)}`;
    updateCart();
}

function addCustomDonation() {
    const donationInput = document.getElementById('custom-donation');
    const donationAmount = parseFloat(donationInput.value);
    if (!isNaN(donationAmount)) {
        addDonation(donationAmount);
    }
    donationInput.value = '';
}

function checkout() {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0) + totalDonation;
    const pixKey = '064.056.691-24'; // Substitua pela chave PIX correta
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Pix%20${pixKey}%20R$${totalAmount.toFixed(2)}`;
    const qrCodeImg = document.getElementById('qr-code');
    qrCodeImg.src = qrCodeUrl;
    qrCodeImg.style.display = 'block';
}

function cancelAll() {
    cart = [];
    totalDonation = 0;
    saveCart();
    updateCart();
    document.getElementById('qr-code').style.display = 'none';
}

// Ao carregar a página, atualize o carrinho com os itens armazenados
document.addEventListener('DOMContentLoaded', updateCart);
