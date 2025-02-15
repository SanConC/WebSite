document.addEventListener('DOMContentLoaded', () => {
    console.log('Sales page application initialized.');

    setupEventListeners();
});

function setupEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const button = event.target;
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const productPrice = parseFloat(button.dataset.productPrice);

    console.log(`Adding product ${productName} (ID: ${productId}, Price: ${productPrice}) to cart.`);
 
    addToCartLogic(productName, productPrice);
}

function addToCartLogic(nombre, precio) {
    cart.push({ nombre, precio });
    total += precio;
    updateCart();
}