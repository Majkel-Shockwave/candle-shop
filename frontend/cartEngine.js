async function addToCartById(id) {
    const res = await fetch(`http://localhost:3000/produkty/${id}`);
    const prod = await res.json();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === prod.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            image: prod.image,
            quantity: 1,
            short_description: prod.short_description
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};
