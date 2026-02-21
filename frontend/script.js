//Socia media menu
const menu = document.querySelector('.social-menu');
const toggle = document.querySelector('.social-menu .toggle');

toggle.addEventListener('mouseenter', () => {
    menu.classList.add('open');
});

menu.addEventListener('mouseleave', () => {
    menu.classList.remove('open');
});

//Dynamiczne tworzenie kart top wybierane produkty
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
                <img src="img/${prod.image}"
                alt="${prod.name}"
                loading="lazy">
            </div>
            <h3>${prod.name}</h3>
            <p>${prod.price} zł</p>
            `;

            card.addEventListener("click", () => {
                window.location.href = `product.html?id=${prod.id}`;
            });

            //Wrzucamy karte do kontenera
            container.appendChild(card);
        });

    } catch (err) {
        console.log("Błąd ładowania produktów", err);
    }
}

loadTopProducts();

//Slider
// TABLICA OBRAZKÓW
const sliderImages = [
    "img/slider1.webp",
    "img/slider2.webp"
];

// KONTEJNER NA SLAJDY
const slides = document.querySelector(".slides");

// GENEROWANIE SLAJDÓW
sliderImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    slides.appendChild(img);
});

// INDEX POCZĄTKOWEGO SLAJDU
let index = 0;

// FUNKCJA PRZESUWANIA
function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// NEXT BTN
document.querySelector('.next').addEventListener("click", () => {
    index++;
    if (index >= sliderImages.length) index = 0;
    updateSlider();
});

// PREV BTN
document.querySelector('.prev').addEventListener("click", () => {
    index--;
    if (index < 0) index = sliderImages.length - 1;
    updateSlider();
});

//Automatyczne zmienianie sliderów
setInterval(() => {
    index++;
    if (index >= sliderImages.length) index = 0;
    updateSlider();
}, 4000);
