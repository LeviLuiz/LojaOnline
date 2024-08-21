let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Substitua pela sua chave Pix
const pixKey = 'SUA_CHAVE_PIX_AQUI';

function addToCart(productName, price) {
    const product = {
        name: productName,
        price: price
    };
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} foi adicionado ao carrinho!`);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - R$ ${item.price.toFixed(2)}
            <button class="btn remove-btn" onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItems.appendChild(listItem);
        total += item.price;
    });

    totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    if (cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        generateQRCode(total);
    } else {
        alert('O carrinho está vazio!');
    }
}

function cancelAll() {
    if (cart.length > 0) {
        const confirmation = confirm('Você tem certeza que deseja cancelar toda a compra?');
        if (confirmation) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            alert('A compra foi cancelada.');
        }
    } else {
        alert('O carrinho está vazio!');
    }
}

function generateQRCode(total) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const qrCodeImage = document.getElementById('qr-code');

    // Exemplo de geração do código Pix (troque os valores conforme necessário)
    const pixCode = `00020126580014BR.GOV.BCB.PIX0114${pixKey}5204000053039865404${total.toFixed(2)}5802BR5925Nome Do Recebedor6009Cidade00062070503***6304`;

    const qrCodeAPI = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pixCode)}`;

    qrCodeImage.src = qrCodeAPI;
    qrCodeImage.style.display = 'block';
    alert('Compra finalizada! Escaneie o QR code para efetuar o pagamento.');
    cart = []; // Limpa o carrinho após a compra
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Atualiza o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', updateCartDisplay);
