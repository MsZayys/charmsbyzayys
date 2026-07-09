const wishlistContainer = document.getElementById("wishlist-container");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

function displayWishlist() {

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `
            <h2 style="text-align:center;color:#777;width:100%;">
                Your wishlist is empty 💔
            </h2>
        `;

        return;
    }

    wishlist.forEach(product => {

        wishlistContainer.innerHTML += `

        <div class="wishlist-card">

    <button class="wishlist-btn active">
        <i class="fa-solid fa-heart"></i>
    </button>

    <img src="${product.image}" alt="${product.name}">

    <h3>${product.name}</h3>

    <p class="price">${product.price}</p>

    <div class="wishlist-buttons">

        <button class="cart-btn" data-name="${product.name}">
            🛒 Add to Cart
        </button>

        <button class="buy-btn" data-name="${product.name}">
            ⚡ Buy Now
        </button>

        <button class="remove-btn" data-name="${product.name}">
            🗑️ Remove
        </button>

    </div>

</div>

        `;

    });

    // ================= REMOVE =================

    document.querySelectorAll(".remove-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            wishlist = wishlist.filter(item => item.name !== btn.dataset.name);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            displayWishlist();

        });

    });

    // ================= ADD TO CART =================

    document.querySelectorAll(".cart-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const product = wishlist.find(item => item.name === btn.dataset.name);

            const existing = cart.find(item => item.name === product.name);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            btn.innerHTML = "✔ Added";

            setTimeout(() => {
                btn.innerHTML = "🛒 Add to Cart";
            }, 1000);

        });

    });

    // ================= BUY NOW =================

    document.querySelectorAll(".buy-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const product = wishlist.find(item => item.name === btn.dataset.name);

            localStorage.setItem("cart", JSON.stringify([{
                ...product,
                quantity: 1
            }]));

            window.location.href = "checkout.html";

        });

    });

}

updateCartCount();
displayWishlist();
