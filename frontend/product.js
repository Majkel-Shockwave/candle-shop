const params = new URLSearchParams(window.location.search); //Pobieramy parametry z URL

const id = params.get("id"); //Wyciągamy z tego URL id

console.log("ID produktu z url to:", id);

// Pobieramy dane poroduktu z backendu

async function loadProduct() {
    try {
        const res = await fetch(`http://localhost:3000/produkty/${id}`);
        const data = await res.json();

        console.log("Dane produktu z backendu:", data);

        // Wstawiamy dane do HTML
        document.querySelector(".product-image").src = `img/${data.image}`;
        document.querySelector(".product-name").textContent = data.name;
        document.querySelector(".price").textContent = data.price + " zł";

        // Na razie description = krótki opis
        document.querySelector(".short-desc").textContent = data.short_description;

        // Długi opis zostawiamy pusty (dodamy później short_description)
        document.querySelector(".product-description").textContent = data.description;

        // Dodatkowe pola
        document.querySelector(".scent").textContent = data.scent;
        document.querySelector(".model").textContent = data.model;

        // Na razie wyświetlamy ID kategorii (później dodamy category_name)
        document.querySelector(".category").textContent = data.category_id;

        loadRelatedProducts(data.category_id, data.id);

    } catch (err) {
        console.error("Błąd podczas pobierania produktu:", err);
    }
}

loadProduct();

async function loadRelatedProducts(categoryId, currentId) {
    try {
        const res = await fetch(`http://localhost:3000/produkty/podobne/${currentId}`);
        const related = await res.json();

        console.log("Podobne produkty");
        console.log("related:", related);

        renderRelated(related);

    } catch (err) {
        console.error("Błąd podczas pobierania podobnych produktów", err);
    }
};

function renderRelated(products) {
    const container = document.querySelector(".related-grid");
    container.innerHTML = "";

    products.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("product-small-card");

        card.innerHTML = `
            <div class="product-image">
                <img src="img/${prod.image}" alt="${prod.name}">
            </div>
            <h3>${prod.name}</h3>
            <p>${prod.price} zł</p>
            <button class="mini-add-to-cart">Dodaj do koszyka</button>
            `;

        card.addEventListener("click", () => {
            window.location.href = `product.html?id=${prod.id}`;
        });

        container.appendChild(card);
    });
}
