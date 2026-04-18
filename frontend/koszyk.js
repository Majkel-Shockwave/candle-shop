
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.querySelector(".cart-items");

cart.forEach(prod => {
    const item = document.createElement("div");
    item.classList.add("order-details");
    item.setAttribute("data-id", prod.id);


    item.innerHTML = `
        <div class="details">
            <a class="product-img" href="product.html?id=${prod.id}">
                <img src="img/${prod.image}">
            </a>
            <div class="name-description">
                <h2>${prod.name}</h2>
                <p>${prod.short_description}</p>
            </div>
            <div class="price-item">
                <p class="single-price">${prod.price} zł</p>
            </div>
        </div>

        <hr class="separator">

        <div class="quantity">
            <button class="quantity-btn-remove"></button>
            <button class="quantity-btn-subtract">-</button>
            <span class="quantity-view">${prod.quantity}</span>
            <button class="quantity-btn-add">+</button>
            <p class="price-item-all">Łącznie: ${(prod.price * prod.quantity).toFixed(2)} zł</p>
        </div>
    `;

    container.appendChild(item);
});


document.querySelectorAll(".order-details").forEach(item => {

    const btnRemove = item.querySelector(".quantity-btn-remove");
    const btnSub = item.querySelector(".quantity-btn-subtract");
    const btnAdd = item.querySelector(".quantity-btn-add");

    const quantityView = item.querySelector(".quantity-view");
    const singlePrice = parseFloat(item.querySelector(".single-price").textContent);

    const totalPriceItem = item.querySelector(".price-item-all");

    let quantity = parseInt(quantityView.textContent);

    function updateTotal() {
        const sum = (quantity * singlePrice).toFixed(2);
        totalPriceItem.textContent = `Łącznie: ${sum} zł`;
    };

    btnRemove.addEventListener("click", () => {
    const id = Number(item.getAttribute("data-id"));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = cart.filter(p => p.id !== id);

    localStorage.setItem("cart", JSON.stringify(updated));

    item.remove();
});


    btnSub.addEventListener("click", () => {
        if (quantity > 1) {
        quantity --;
        quantityView.textContent = quantity;
        updateTotal();
        }
    });

    btnAdd.addEventListener("click", () => {
        quantity++;
        quantityView.textContent = quantity;
        updateTotal();
    })
})