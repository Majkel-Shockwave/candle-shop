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
        document.querySelector(".short-desc").textContent = data.description;

        // Długi opis zostawiamy pusty (dodamy później short_description)
        document.querySelector(".product-description").textContent = "";

        // Dodatkowe pola
        document.querySelector(".scent").textContent = data.scent;
        document.querySelector(".model").textContent = data.model;

        // Na razie wyświetlamy ID kategorii (później dodamy category_name)
        document.querySelector(".category").textContent = data.category_id;

    } catch (err) {
        console.error("Błąd podczas pobierania produktu:", err);
    }
}

loadProduct();
