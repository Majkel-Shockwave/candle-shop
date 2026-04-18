const params = new URLSearchParams(window.location.search);
const categoryIdFromUrl = params.get("category");
const categoryNameFromUrl = params.get("name");

async function start() {
    if (categoryIdFromUrl) {
        await pobierzProduktyKategori();

        const filtrowane = wszystkieProdukty.filter(p =>
            p.category_id === Number(categoryIdFromUrl)
        );

        document.querySelector('.allproduct-categories h2').textContent = categoryNameFromUrl;

        const container = document.querySelector(".products");
        container.innerHTML = "";

        filtrowane.forEach(prod => {
            const card = document.createElement('div');
            card.classList.add("product-small-card");

            card.innerHTML = `
                <div class="product-image">
                    <img src="img/${prod.image}" alt="${prod.name}">
                </div>
                <h3>${prod.name}</h3>
                <p>${prod.price} zł</p>
                <button class="mini-add-to-cart">Dodaj do koszyka</button>
            `;

            const btnAddToCard = card.querySelector(".mini-add-to-cart");

            btnAddToCard.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCartById(prod.id);
            });



            card.addEventListener('click', () =>{
                window.location.href = `product.html?id=${prod.id}`;
            });

            container.appendChild(card);
        });

        document.querySelector(".products").scrollIntoView({
            behavior: "smooth"
        });
    };
};

start();

async function pobierzProdukty() {
    const res = await fetch("http://localhost:3000/wszystkie/produkty");
    const data = await res.json();

    const container = document.querySelector(".products");

    data.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("product-small-card");

        card.innerHTML = `
            <div class="product-image">
                <img src="img/${prod.image}" alt="${prod.name}" loading="lazy">
            </div>
            <h3>${prod.name}</h3>
            <p>${prod.price} zł</p>
            <button class="mini-add-to-cart">Dodaj do koszyka</button>
            `;

            const btnAddToCard = card.querySelector(".mini-add-to-cart");

            btnAddToCard.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCartById(prod.id);
            });

            card.addEventListener("click", () => {
                window.location.href = `product.html?id=${prod.id}`;
            });

            //Wrzucamy karte do kontenera
            container.appendChild(card);
    })

    console.log(data);
};

if (!categoryIdFromUrl) {
    pobierzProdukty();
}

let wszystkieProdukty = [];

async function pobierzProduktyKategori() {
    const res = await fetch("http://localhost:3000/wszystkie/produkty");
    wszystkieProdukty = await res.json();
};

document.querySelectorAll('.container-category > div').forEach(box => {
    box.addEventListener('click', async () => {
        await pobierzProduktyKategori();
        const categoryName = box.dataset.category;
        const categoryId = Number(box.dataset.id);
        document.querySelector(".products").scrollIntoView({
            behavior: "smooth" 
        });

        document.querySelector('.allproduct-categories h2').textContent = categoryName;
        const filtrowane = wszystkieProdukty.filter(p => p.category_id === categoryId);

        const container = document.querySelector(".products");
        container.innerHTML = "";

        filtrowane.forEach(prod => {
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

            const btnAddToCard = card.querySelector(".mini-add-to-cart");

            btnAddToCard.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCartById(prod.id);
            });

            card.addEventListener("click", () => {
                window.location.href = `product.html?id=${prod.id}`;
            });

            //Wrzucamy karte do kontenera
            container.appendChild(card); 
        });
    });
});