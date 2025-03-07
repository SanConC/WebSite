let cart = [];
let total = 0;

function updateCart() {
    const listacart = document.getElementById('cart-items');
    const totalcart = document.getElementById('total');

    listacart.innerHTML = '';

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add('cart-item');
        div.innerHTML = `<span>${item.nombre}</span><strong>${item.precio.toFixed(2)}</strong>`;
        listacart.appendChild(div);
    });

    totalcart.textContent = total.toFixed(2);
}

function addToCartLogic(nombre, precio) {
    if (!nombre || isNaN(precio)) {
        console.error('Datos inválidos para agregar al carrito');
        return;
    }

    const existe = cart.find(item => item.nombre === nombre);
    if (existe) return;

    cart.push({ nombre, precio });
    total += precio;
    updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        const button = event.target.closest('.add-to-cart');
        if (!button) return;

        const nombre = button.dataset.productName;
        const precio = parseFloat(button.dataset.productPrice);
        addToCartLogic(nombre, precio);
    });

    // Lazy Loading de imagenes pesadas///
    const images = document.querySelectorAll("img.lazy");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                img.style.opacity = 1;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
});
