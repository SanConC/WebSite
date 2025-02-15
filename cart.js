let cart = []; 
let total = 0;

function updateCart() {
  let listacart = document.getElementById('cart-items');
  let totalcart = document.getElementById('total');
  let contadorcart = document.getElementById('cart-count');

  listacart.innerHTML = '';

  cart.forEach(item => {
    let div = document.createElement("div");
    div.classList.add('cart-item');
    div.innerHTML = `<span>${item.nombre}</span><strong>${item.precio}</strong>`;
    listacart.appendChild(div);
  });

  totalcart.textContent = total;
  contadorcart.textContent = cart.length;

  console.log(cart);
}

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const nombre = event.target.dataset.productName;
      const precio = parseFloat(event.target.dataset.productPrice);
      addToCartLogic(nombre, precio);
    });
  });
});