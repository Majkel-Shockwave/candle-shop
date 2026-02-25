async function pobierzProdukty() {
    const res = await fetch("http://localhost:3000/wszystkie/produkty");
    const data = await res.json();

    const container = document.querySelector(".products");

    data.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("product-small-card");

        card.innerHTML = `
            <div class="product-image">
                <img src="img/${prod.image}"
                alt="${prod.name}"
                loading="lazy">
            </div>
            <h3>${prod.name}</h3>
            <p>${prod.price} zł</p>
            <button class="mini-add-to-cart">Dodaj do koszyka</button>
            `;

            card.addEventListener("click", () => {
                window.location.href = `product.html?id=${prod.id}`;
            });

            //Wrzucamy karte do kontenera
            container.appendChild(card);
    })

    console.log(data);
};

pobierzProdukty();