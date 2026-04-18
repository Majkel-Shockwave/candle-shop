function addToCart(prod) {
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
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}
