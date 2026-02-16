const menu = document.querySelector('.social-menu');
const toggle = document.querySelector('.social-menu .toggle');

toggle.addEventListener('mouseenter', () => {
    menu.classList.add('open');
});

menu.addEventListener('mouseleave', () => {
    menu.classList.remove('open');
});

async function loadTopProducts() {
    try {
        const res = await fetch('http://localhost:3000/produkty'); //Pobieramy dane z backendu

        const products = await res.json(); //Zamieniamy odpowiedź z backendu na JSON

        const container = document.querySelector('.top-products-cards'); //Bierzemy konetner na karty w HTML

        container.innerHTML = ''; // Czyścimy zawartośc konetnera

        //Dla każdego produktu tworzymy karte
        products.forEach(prod => {
            const card = document.createElement('div'); //Tworzymy div na karte
            card.classList.add('product-small-card'); //Dodajemy do diva wcześniej zrobioną classe produkty (wygląd itd)

            //Wypełniamy karte danym z bazy
            card.innerHTML = `
            <div class="product-image">
                <img src="img/${prod.image}">
            </div>
            <h3>${prod.name}</h3>
            <p>${prod.price} zł</p>
            `;

            //Wrzucamy karte do kontenera
            container.appendChild(card);
        });

    } catch (err) {
        console.log("Błąd ładowania produktów", err);
    }
}

loadTopProducts();